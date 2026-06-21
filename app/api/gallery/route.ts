import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

const ALLOWED_CATEGORIES = ["Bridal", "Hair", "Nails", "Skin", "Makeup"];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  has_secret: !!process.env.CLOUDINARY_API_SECRET,
});
console.log("Secret starts with:", process.env.CLOUDINARY_API_SECRET?.slice(0, 6));
export async function GET() {
  try {
    const db = await getDb();
    const photos = await db
      .collection("gallery")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      photos: photos.map((p) => ({
        id: p._id.toString(),
        src: p.src,
        cat: p.cat,
        label: p.label,
      })),
    });
  } catch (err) {
    console.error("GET /api/gallery failed:", err);
    return NextResponse.json(
      { error: "Could not load gallery photos." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const key = (formData.get("key") as string | null)?.trim() ?? "";
    const category = (formData.get("category") as string | null)?.trim() ?? "";
    const label = (formData.get("label") as string | null)?.trim() ?? "";
    const file = formData.get("file") as File | null;

    // Gate: only people with the correct key can add a photo.
    if (!process.env.GALLERY_KEY) {
      console.error("GALLERY_KEY is not set in the environment.");
      return NextResponse.json(
        { error: "Uploads are not configured yet." },
        { status: 500 }
      );
    }
    if (key !== process.env.GALLERY_KEY) {
      return NextResponse.json({ error: "Incorrect key." }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "Please choose a photo." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image." }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image must be under 4MB." },
        { status: 400 }
      );
    }
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }
    if (!label || label.length > 60) {
      return NextResponse.json(
        { error: "Please add a short label (under 60 characters)." },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "womens-point/gallery",
    });

    // Save the link (not the image itself) in MongoDB
    const db = await getDb();
    const doc = {
      src: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      cat: category,
      label,
      createdAt: new Date(),
    };
    const result = await db.collection("gallery").insertOne(doc);

    return NextResponse.json(
      { photo: { id: result.insertedId.toString(), ...doc } },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/gallery failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}