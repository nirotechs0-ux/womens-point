import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      reviews: reviews.map((r) => ({
        id: r._id.toString(),
        name: r.name,
        service: r.service,
        stars: r.stars,
        message: r.message,
      })),
    });
  } catch (err) {
    console.error("GET /api/reviews failed:", err);
    return NextResponse.json(
      { error: "Could not load reviews." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").trim();
    const service = (body?.service ?? "").trim();
    const message = (body?.message ?? "").trim();
    const stars = Number(body?.stars);

    if (!name || name.length > 60) {
      return NextResponse.json(
        { error: "Please enter your name (under 60 characters)." },
        { status: 400 }
      );
    }
    if (!service || service.length > 60) {
      return NextResponse.json({ error: "Please choose a service." }, { status: 400 });
    }
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return NextResponse.json({ error: "Please choose a star rating." }, { status: 400 });
    }
    if (!message || message.length > 600) {
      return NextResponse.json(
        { error: "Please share a few words about your experience (under 600 characters)." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const doc = {
      name,
      service,
      stars,
      message,
      createdAt: new Date(),
    };
    const result = await db.collection("reviews").insertOne(doc);

    return NextResponse.json(
      { review: { id: result.insertedId.toString(), ...doc } },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/reviews failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}