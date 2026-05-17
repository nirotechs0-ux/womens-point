import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
}

export async function POST(req: NextRequest) {
  try {
    const { token, otp, form } = await req.json();

    // Verify OTP
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [storedOtp, timestamp] = decoded.split(":");

    // Check expiry (10 minutes)
    if (Date.now() - parseInt(timestamp) > 10 * 60 * 1000) {
      return NextResponse.json({ error: "OTP expired. Please request a new one." }, { status: 400 });
    }

    if (otp !== storedOtp) {
      return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
    }

    const userPhone = `+91${form.phone.replace(/\D/g, "").slice(-10)}`;
    const ownerPhone = process.env.OWNER_PHONE!;
    const waFrom = process.env.TWILIO_WHATSAPP_FROM!;

    // Message to owner via WhatsApp
    await client.messages.create({
      from: waFrom,
      to: `whatsapp:${ownerPhone}`,
      body:
`🌸 *NEW BOOKING — Womens Point*

👤 *Client:* ${form.name}
📱 *Phone:* ${form.phone}
💄 *Service:* ${form.service}
📅 *Date:* ${formatDate(form.date)}
⏰ *Time:* ${formatTime(form.time)}
📝 *Notes:* ${form.message || "None"}

✅ _Verified via OTP_`,
    });

    // Confirmation message to user via WhatsApp
    await client.messages.create({
      from: waFrom,
      to: `whatsapp:${userPhone}`,
      body:
`✨ *Booking Confirmed — Womens Point Beauty Parlour*

Dear ${form.name},

Your appointment has been received! 🎉

💄 *Service:* ${form.service}
📅 *Date:* ${formatDate(form.date)}
⏰ *Time:* ${formatTime(form.time)}

We'll confirm your slot shortly.

📍 Womens Point Beauty Parlour, Khalilabad
🌸 Thank you for choosing us!`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Booking confirm error:", err);
    return NextResponse.json({ error: err.message || "Failed to confirm booking" }, { status: 500 });
  }
}