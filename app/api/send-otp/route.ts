import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    const cleaned = phone.replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const fullPhone = `+91${cleaned}`;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ── Send OTP via WhatsApp (works with Twilio sandbox internationally) ──
    await client.messages.create({
      body: `🌸 *Womens Point Beauty Parlour*\n\nYour OTP is: *${otp}*\n\nValid for 10 minutes. Do not share with anyone.`,
      from: process.env.TWILIO_WHATSAPP_FROM!, // whatsapp:+14155238886
      to: `whatsapp:${fullPhone}`,
    });

    const encoded = Buffer.from(`${otp}:${Date.now()}`).toString("base64");
    return NextResponse.json({ token: encoded });

  } catch (err: any) {
    console.error("OTP send error:", err);
    return NextResponse.json({ error: err.message || "Failed to send OTP" }, { status: 500 });
  }
}