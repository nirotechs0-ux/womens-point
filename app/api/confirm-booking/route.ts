// import { NextRequest, NextResponse } from "next/server";
// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID!,
//   process.env.TWILIO_AUTH_TOKEN!
// );

// function formatDate(d: string) {
//   if (!d) return "";
//   return new Date(d).toLocaleDateString("en-IN", {
//     weekday: "long", year: "numeric", month: "long", day: "numeric",
//   });
// }

// function formatTime(t: string) {
//   if (!t) return "";
//   const [h, m] = t.split(":");
//   const hour = parseInt(h);
//   return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { token, otp, form } = await req.json();

//     // Verify OTP
//     const decoded = Buffer.from(token, "base64").toString("utf-8");
//     const [storedOtp, timestamp] = decoded.split(":");

//     // Check expiry (10 minutes)
//     if (Date.now() - parseInt(timestamp) > 10 * 60 * 1000) {
//       return NextResponse.json({ error: "OTP expired. Please request a new one." }, { status: 400 });
//     }

//     if (otp !== storedOtp) {
//       return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
//     }

//     const userPhone = `+91${form.phone.replace(/\D/g, "").slice(-10)}`;
//     const ownerPhone = process.env.OWNER_PHONE!;
//     const waFrom = process.env.TWILIO_WHATSAPP_FROM!;

//     // Message to owner via WhatsApp (free-form body is fine — owner will initiate chat)
//     await client.messages.create({
//       from: waFrom,
//       to: `whatsapp:${ownerPhone}`,
//       body:
// `🌸 *NEW BOOKING — Womens Point*

// 👤 *Client:* ${form.name}
// 📱 *Phone:* ${form.phone}
// 💄 *Service:* ${form.service}
// 📅 *Date:* ${formatDate(form.date)}
// ⏰ *Time:* ${formatTime(form.time)}
// 📝 *Notes:* ${form.message || "None"}

// ✅ _Verified via OTP_`,
//     });

//     // Confirmation message to user via WhatsApp using approved template
//     await client.messages.create({
//       from: waFrom,
//       to: `whatsapp:${userPhone}`,
//       contentSid: "HXc796d3078f478407aa18cd592905da33",
//       contentVariables: JSON.stringify({
//         "1": `${form.service} on ${formatDate(form.date)} at ${formatTime(form.time)}`,
//       }),
//     });

//     return NextResponse.json({ success: true });

//   } catch (err: any) {
//     console.error("Booking confirm error:", err);
//     return NextResponse.json({ error: err.message || "Failed to confirm booking" }, { status: 500 });
//   }
// }



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

    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [storedOtp, timestamp] = decoded.split(":");

    if (Date.now() - parseInt(timestamp) > 10 * 60 * 1000) {
      return NextResponse.json({ error: "OTP expired. Please request a new one." }, { status: 400 });
    }

    if (otp !== storedOtp) {
      return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
    }

    const userPhone = `+91${form.phone.replace(/\D/g, "").slice(-10)}`;
    const ownerPhone = process.env.OWNER_PHONE!;
    const smsFrom = process.env.TWILIO_PHONE_NUMBER!;

    // SMS to owner
    await client.messages.create({
      from: smsFrom,
      to: ownerPhone,
      body: `NEW BOOKING - Womens Point\n\nClient: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nDate: ${formatDate(form.date)}\nTime: ${formatTime(form.time)}\nNotes: ${form.message || "None"}\n\nVerified via OTP`,
    });

    // SMS confirmation to user
    await client.messages.create({
      from: smsFrom,
      to: userPhone,
      body: `Booking Confirmed - Womens Point Beauty Parlour\n\nDear ${form.name}, your appointment is confirmed!\n\nService: ${form.service}\nDate: ${formatDate(form.date)}\nTime: ${formatTime(form.time)}\n\nWe will confirm your slot shortly.\nWomens Point, Khalilabad`,
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Booking confirm error:", err);
    return NextResponse.json({ error: err.message || "Failed to confirm booking" }, { status: 500 });
  }
}