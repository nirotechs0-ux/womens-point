import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export async function GET() {
  try {
    // Read your original logo from public folder
    const filePath = path.join(process.cwd(), "public", "parlourLogo.png");
    const imageBuffer = await fs.readFile(filePath);

    // Get original image dimensions
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 512;
    const height = metadata.height || 512;
    const radius = Math.min(width, height) / 2;

    // Create a circular SVG mask
    const circleMask = Buffer.from(
      `<svg width="${width}" height="${height}">
        <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="#fff" />
      </svg>`
    );

    // Crop the image using the mask
    const circularImageBuffer = await sharp(imageBuffer)
      .composite([{ input: circleMask, blend: "dest-in" }])
      .png()
      .toBuffer();

    return new NextResponse(circularImageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error cropping favicon:", error);
    return new NextResponse("Error generating icon", { status: 500 });
  }
}