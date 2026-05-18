"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import FadeUp from "../shared/FadeUp";
import SectionLabel from "../shared/SectionLabel";
import Footer from "../Footer";

type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface HomePageProps {
  navigate: (p: Page) => void;
}

const IMG = {
  hero: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1187&auto=format&fit=crop",
  bridal1: "https://i.pinimg.com/736x/5a/23/ca/5a23ca5b0bbc27ab70962c1d851136e1.jpg",
  hair1: "https://i.pinimg.com/736x/a5/eb/50/a5eb50c869f71003cc3198972615e007.jpg",
  nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  skin: "https://i.pinimg.com/1200x/8c/9f/a7/8c9fa7dbc6e87d9a2d83c5bf0acf7874.jpg",
  gallery1: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80",
  gallery5: "https://i.pinimg.com/736x/8b/4f/d7/8b4fd7f93224aecf1ad3d23880b80a20.jpg",
};

// ── Animated counter card ──────────────────────────────────────────────
function CountCard({
  icon, target, suffix, label, delay = 0,
}: {
  icon: string; target: number; suffix: string; label: string; delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration: 2,
      delay,
      ease: "easeOut",
    });
    const unsub = rounded.on("change", (v) => {
      if (displayRef.current) displayRef.current.textContent = String(v);
    });
    return () => { controls.stop(); unsub(); };
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-cream rounded-xl px-5 py-4 text-center flex flex-col items-center gap-1 transition-all duration-300 flex-1 min-w-[100px] max-w-[160px]"
    >
      <div className="text-base mb-0.5">{icon}</div>
      <div className="font-playfair text-[clamp(18px,3vw,26px)] font-bold text-gold leading-none">
        <span ref={displayRef}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="text-[10px] text-richbrown-mid leading-snug max-w-[80px]">{label}</div>
    </motion.div>
  );
}

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://assets.mixkit.co/videos/preview/mixkit-woman-getting-beauty-treatment-in-salon-42614-large.mp4"
          poster={IMG.hero}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-woman-getting-beauty-treatment-in-salon-42614-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-richbrown/85 via-richbrown/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-richbrown/50 via-transparent to-transparent" />
        <span className="absolute right-0 bottom-0 font-playfair text-[180px] font-bold text-white/5 leading-none select-none pointer-events-none translate-y-8">
          Beauty
        </span>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-7">
              <span className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-[11px]">✦</span>
              <span className="text-[11px] tracking-[1.5px] uppercase text-white/80 font-medium">
                Premium Beauty Experience
              </span>
            </div>
            <h1 className="font-playfair text-[clamp(44px,7vw,84px)] font-bold text-white leading-[1.08] mb-5">
              Where Beauty<br />Meets <em className="italic text-gold">Elegance</em>
            </h1>
            <p className="text-[15px] text-white/75 leading-relaxed max-w-[420px] mb-9">
              Indulge in luxury beauty treatments crafted with care. From bridal transformations to
              everyday glamour — your beauty is our passion.
            </p>
            <div className="flex gap-3.5 flex-wrap mb-12">
              <button
                onClick={() => navigate("services")}
                className="bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.4)]"
              >
                Explore Services
              </button>
              <button
                onClick={() => navigate("bridal")}
                className="bg-transparent border-[1.5px] border-white/40 text-white px-8 py-3.5 rounded-full text-[13px] font-medium transition-all hover:border-gold hover:text-gold"
              >
                Bridal Packages
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="absolute right-[5%] bottom-[12%] hidden lg:flex items-center gap-3 bg-white rounded-2xl p-4 shadow-xl"
        >
          <div className="w-11 h-11 bg-cream rounded-xl flex items-center justify-center text-xl">⭐</div>
          <div>
            <div className="font-semibold text-[14px] text-richbrown">500+ Bridal Looks</div>
            <div className="text-[11px] text-richbrown-light">Delivered with love</div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-richbrown py-10 px-[5%]">
        <FadeUp>
          <h2 className="font-playfair text-[clamp(20px,2.5vw,30px)] font-bold text-white text-center mb-6">
            Achievements <em className="italic text-gold">so far</em>
          </h2>
        </FadeUp>
        <div className="flex flex-wrap justify-center gap-3 max-w-[700px] mx-auto">
          <CountCard icon="🏆" target={8}    suffix="+"  label="Years of Expertise"  delay={0}    />
          <CountCard icon="💍" target={500}  suffix="+"  label="Bridal Makeups"       delay={0.15} />
          <CountCard icon="⭐" target={4}    suffix=".9" label="Average Rating"       delay={0.3}  />
          <CountCard icon="📋" target={1000} suffix="+"  label="Bookings Done"        delay={0.45} />
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <section className="py-[40px] px-[5%]">
        <FadeUp><SectionLabel text="What We Offer" /></FadeUp>
        <FadeUp>
          <h2 className="font-playfair text-[clamp(32px,4vw,48px)] font-bold text-richbrown leading-[1.15] mb-3">
            Our <em className="italic text-gold">Services</em>
          </h2>
        </FadeUp>
        <FadeUp>
          <p className="text-[15px] text-richbrown-mid leading-relaxed max-w-lg mb-12">
            A complete beauty destination — from bridal transformations to everyday glow.
          </p>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: "💍", title: "Bridal Makeup", desc: "Complete bridal transformation. HD, Airbrush, Traditional — all styles perfected.", page: "bridal" as Page, img: "/brideImage.png" },
            { icon: "✨", title: "Makeup & Glam", desc: "Party, reception, engagement — every occasion deserves a stunning look.", page: "services" as Page, img: "/makeups.jpg" },
            { icon: "💇", title: "Hair Services", desc: "Expert styling, treatment, and care for every hair type and occasion.", page: "services" as Page, img: "/hair.jpg" },
            { icon: "🌸", title: "Skin Care", desc: "Rejuvenating facials and treatments for healthy, radiant skin.", page: "services" as Page, img: "/skincare.jpg" },
            { icon: "💅", title: "Nails & Body", desc: "Nail art, body care, and grooming services by expert hands.", page: "services" as Page, img: "/nail.jpg" },
            { icon: "🪒", title: "Grooming", desc: "Professional threading, waxing, and complete grooming services.", page: "services" as Page, img: "/grooming.jpg" },
          ].map((srv, i) => (
            <FadeUp key={srv.title} delay={i * 0.08}>
              <div
                className="group relative rounded-3xl overflow-hidden cursor-pointer h-[280px] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(196,156,120,0.25)] transition-all duration-300"
                onClick={() => navigate(srv.page)}
              >
                <img
                  src={srv.img} alt={srv.title}
                  className="absolute inset-0 blur-[0.7px] w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-richbrown/80 via-richbrown/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-playfair text-[20px] font-semibold text-white mb-1">{srv.title}</h3>
                  <p className="text-[12px] text-white/75 leading-relaxed mb-3">{srv.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gold font-medium">
                    View details
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12" className="group-hover:translate-x-1 transition-transform">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-8 px-[5%] bg-cream">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <FadeUp><SectionLabel text="Our Work" /></FadeUp>
            <FadeUp>
              <h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold text-richbrown">
                Our <em className="italic text-gold">Gallery</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp>
            <button
              onClick={() => navigate("gallery")}
              className="border-[1.5px] border-richbrown/20 hover:border-gold text-richbrown hover:text-gold text-[13px] font-medium px-6 py-2.5 rounded-full transition-all"
            >
              View All →
            </button>
          </FadeUp>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[IMG.gallery1, IMG.bridal1, IMG.hair1, IMG.nails, IMG.skin, IMG.gallery5].map((src, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div
                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => navigate("gallery")}
              >
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* MILESTONES */}
      {/* MILESTONES */}
      <section className="py-[50px] px-[5%]">
        <div className="max-w-[700px] mx-auto text-center">

          {/* Text - sabse upar */}
          <FadeUp><SectionLabel text="Our Journey" /></FadeUp>
          <FadeUp>
            <h2 className="font-playfair text-[clamp(30px,4vw,46px)] font-bold text-richbrown leading-[1.15] mb-4">
              Milestones That<br /><em className="italic text-gold">Define Us</em>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="text-[15px] text-richbrown-mid leading-relaxed mb-7">
              From a humble beginning to becoming the city's most trusted beauty destination —
              every achievement is a reflection of our clients' love and trust.
            </p>
          </FadeUp>

          {/* Row 1: 2 photos side by side */}
          <FadeUp>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="rounded-2xl overflow-hidden h-[200px]">
                <img
                  src="/maam1.jpeg"
                  alt="Milestone 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-[200px]">
                <img
                  src="/maam2.jpeg"
                  alt="Milestone 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </FadeUp>

          {/* Row 2: maam3 full width with text overlay at very bottom */}
          <FadeUp>
            <div className="relative rounded-2xl overflow-hidden h-[340px]">
              <img
                src="/maam3.png"
                alt="Milestone 3"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient only at very bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Text pinned to very bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 text-center">
                <p className="text-[12px] text-white/80 leading-relaxed">
                  Every achievement is a reflection of our clients' love and trust.
                </p>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* REVIEWS STRIP */}
      <section className="py-[90px] px-[5%] bg-cream">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
          <div>
            <FadeUp><SectionLabel text="Client Stories" /></FadeUp>
            <FadeUp>
              <h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold text-richbrown">
                What They <em className="italic text-gold">Say</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp>
            <button
              onClick={() => navigate("reviews")}
              className="border-[1.5px] border-richbrown/20 hover:border-gold text-richbrown hover:text-gold text-[13px] font-medium px-6 py-2.5 rounded-full transition-all h-fit"
            >
              All Reviews →
            </button>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { stars: "★★★★★", text: "Best bridal makeup I've ever seen. My look stayed flawless the entire day. Everyone was asking who did my makeup!", name: "Priya Sharma", type: "Bridal Makeup · HD Package" },
            { stars: "★★★★★", text: "Absolutely stunning results for my reception. The team understands exactly what you want and delivers beyond expectations.", name: "Neha Gupta", type: "Reception Makeup · Eleganza" },
            { stars: "★★★★★", text: "Coming here for 3 years now. Best skincare and hair services. They genuinely care about you and it shows in the results.", name: "Anjali Mehta", type: "Regular Client · Hair & Skin" },
          ].map((r, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-white hover:border-gold/30 border-[1.5px] border-transparent rounded-3xl p-7 transition-all hover:shadow-[0_8px_32px_rgba(196,156,120,0.12)] h-full">
                <div className="text-gold text-[13px] tracking-[2px] mb-3">{r.stars}</div>
                <p className="font-playfair text-[16px] italic text-richbrown leading-[1.7] mb-5">"{r.text}"</p>
                <div className="text-[13px] font-semibold text-richbrown">{r.name}</div>
                <div className="text-[11px] text-richbrown-light mt-0.5">{r.type}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-richbrown py-16 px-[5%] text-center">
        <FadeUp>
          <h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold text-white mb-3">
            Ready for Your <em className="italic text-gold">Transformation?</em>
          </h2>
        </FadeUp>
        <FadeUp>
          <p className="text-white/60 text-[15px] mb-8 max-w-md mx-auto">
            Book your appointment today and experience the beauty treatment you deserve.
          </p>
        </FadeUp>
        <FadeUp>
          <button
            onClick={() => navigate("contact")}
            className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(196,156,120,0.4)]"
          >
            Book Now →
          </button>
        </FadeUp>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}