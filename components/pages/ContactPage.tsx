"use client";

import FadeUp from "../shared/FadeUp";
import PageHero from "../shared/Pagehero";
import Footer from "../Footer";
import BookingForm from "../BookingForm";

type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface ContactPageProps {
  navigate: (p: Page) => void;
  prefilledService?: string; // ← new
}

export default function ContactPage({ navigate, prefilledService = "" }: ContactPageProps) {
  return (
    <div>
      <PageHero
        title={<>Book Your <em className="italic text-gold">Appointment</em></>}
        sub="Ready for a transformation? Fill the form below and we'll confirm your booking within 24 hours."
        page="Contact"
      />
      <section className="py-[60px] px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[70px] items-start max-w-[1200px] mx-auto">
          {/* Info card */}
          <div className="sticky top-[90px]">
            <FadeUp>
              <div className="bg-cream rounded-3xl p-9">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                      <path d="M12 2C8 2 5 5 5 8c0 4 3 7 7 10 4-3 7-6 7-10 0-3-2-6-7-6z" />
                      <circle cx="12" cy="8" r="2" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-playfair text-[18px] font-semibold text-richbrown">Womens Point</div>
                    <div className="text-[11px] tracking-[2px] uppercase text-gold">Beauty Parlour</div>
                  </div>
                </div>
                {[
                  { label: "Address", value: "Yadav Building, Vivekand Medical Store\nBidhiyani Road, Khalilabad\nKhalilabad-272175, Uttar Pradesh", icon: "📍" },
                  { label: "Phone", value: "+91 XXXXX XXXXX", icon: "📞" },
                  { label: "Working Hours", value: "Mon – Sat: 10:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM", icon: "🕙" },
                ].map((item) => (
                  <div key={item.label} className="mb-5">
                    <label className="text-[10px] tracking-[2px] uppercase text-gold font-semibold block mb-1.5">
                      {item.label}
                    </label>
                    <p className="text-[14px] text-richbrown leading-relaxed whitespace-pre-line">{item.value}</p>
                  </div>
                ))}
                <div className="border-t border-gold/15 pt-5 mt-5">
                  <p className="text-[11px] text-richbrown-light tracking-widest uppercase mb-3">Follow Us</p>
                  <div className="flex gap-2.5">
                    {["ig", "fb", "wa", "yt"].map((s) => (
                      <a key={s} href="#"
                        className="w-10 h-10 rounded-full border-[1.5px] border-gold/30 flex items-center justify-center text-[12px] font-semibold text-richbrown-mid hover:border-gold hover:text-gold transition-all">
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-5">
              <div className="rounded-3xl overflow-hidden shadow-md">
                <iframe
                  src="https://maps.google.com/maps?q=Women's+Point+Beauty+Parlour+Khalilabad&z=17&output=embed"
                  width="100%" height="260"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Womens Point Location"
                />
              </div>
            </FadeUp>
          </div>

          {/* Booking form — prefilled service passed in */}
          <FadeUp delay={0.1}>
            <div className="bg-white">
              <BookingForm prefilledService={prefilledService} />
            </div>
          </FadeUp>
        </div>
      </section>
      <Footer mini navigate={navigate} />
    </div>
  );
}