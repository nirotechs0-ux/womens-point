"use client";

import FadeUp from "../shared/FadeUp";
import SectionLabel from "../shared/SectionLabel";
import Footer from "../Footer";

type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface BridalPageProps {
  navigate: (p: Page) => void;
}

const HERO_BG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGB23P07S5k05vNel0w816K9lkdNxDPz9QQ&s";

const IMG_BRIDAL1 = "https://i.pinimg.com/736x/1a/32/b2/1a32b2a4ef0f01b3ce7f0cbf91f3d1bc.jpg";

const packages = [
  {
    name: "Classic",
    price: "₹8,000",
    color: "bg-cream",
    featured: false,
    features: ["Full Bridal Makeup", "Traditional techniques", "Bindi & Accessories", "1 Touch-up Kit", "Trial session"],
  },
  {
    name: "HD Package",
    price: "₹14,000",
    color: "bg-richbrown",
    featured: true,
    features: ["HD Camera-Ready Makeup", "Premium imported products", "Hair Styling included", "2 Touch-up Kits", "Extended trial session", "Reception look included"],
  },
  {
    name: "Eleganza",
    price: "₹20,000",
    color: "bg-cream",
    featured: false,
    features: ["Airbrush Technique", "International brands", "Full Hair & Draping", "Unlimited touch-ups", "2 trial sessions", "Full day artist"],
  },
];

export default function BridalPage({ navigate }: BridalPageProps) {
  return (
    <div>
      {/* ── Hero with blurred background ── */}
      <div className="relative overflow-hidden py-[80px] px-[5%] text-center">

        {/* Layer 1: blurred background image */}
        <img
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] pointer-events-none"
          style={{ filter: "blur(0.3px)" }}
        />

        {/* Layer 2: soft overlay */}
        <div className="absolute inset-0 z-10 bg-white/55" />

        {/* Layer 3: watermark */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair text-[clamp(60px,20vw,160px)] font-bold text-gold/5 whitespace-nowrap pointer-events-none z-20 select-none">
          Bridal
        </span>

        {/* Layer 4: content */}
        <div className="relative z-30">
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="text-[12px] text-richbrown-light">Home</span>
            <span className="text-[10px] text-richbrown-light">›</span>
            <span className="text-[12px] text-gold">Bridal</span>
          </div>
          <h1 className="font-playfair text-[clamp(32px,5.5vw,64px)] font-bold text-richbrown">
            Bridal <em className="italic text-gold-deeper">Packages</em>
          </h1>
          <p className="text-[clamp(13px,2vw,15px)] text-richbrown-mid max-w-md mx-auto mt-4 leading-relaxed px-4">
            Your most important day deserves the most extraordinary look. Discover our curated bridal packages.
          </p>
        </div>
      </div>

      <section className="py-[80px] px-[5%]">
        {/* ── Intro split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <FadeUp>
            <img
              src={IMG_BRIDAL1}
              alt="Bridal Makeup"
              className="w-full rounded-3xl object-cover aspect-[4/5] shadow-xl"
            />
          </FadeUp>
          <FadeUp delay={0.15}>
            <SectionLabel text="Bridal Collections" />
            <h2 className="font-playfair text-[clamp(28px,4vw,46px)] font-bold text-richbrown leading-tight mb-4">
              Your Dream Look,<br /><em className="italic text-gold">Perfectly Crafted</em>
            </h2>
            <p className="text-[15px] text-richbrown-mid leading-relaxed mb-6">
              Every bride deserves to feel extraordinary on her special day. Our bridal team combines
              artistry with the finest products to create looks that last beautifully throughout your celebrations.
            </p>
            <div className="space-y-3 mb-7">
              {[
                "Trial session included with all packages",
                "12+ hours long-lasting makeup guarantee",
                "Premium HD & Airbrush techniques",
                "Hair styling & draping coordination",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[14px] text-richbrown">
                  <span className="w-5 h-5 bg-gold rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("contact")}
              className="bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full text-[13px] font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.35)]"
            >
              Book Bridal Consultation →
            </button>
          </FadeUp>
        </div>

        {/* ── Packages ── */}
        <FadeUp>
          <h3 className="font-playfair text-[32px] font-bold text-richbrown text-center mb-2">
            Choose Your <em className="italic text-gold">Package</em>
          </h3>
        </FadeUp>
        <FadeUp>
          <p className="text-center text-richbrown-mid text-[14px] mb-10">
            All packages include a complimentary trial session
          </p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <FadeUp key={pkg.name} delay={i * 0.1}>
              <div className={`${pkg.color} rounded-3xl p-8 ${pkg.featured ? "shadow-[0_16px_48px_rgba(196,156,120,0.25)] scale-105" : ""} relative`}>
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[11px] font-medium px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-[11px] tracking-[2px] uppercase font-medium mb-2 text-gold">
                  {pkg.name}
                </div>
                <div className={`font-playfair text-[38px] font-bold mb-1 ${pkg.featured ? "text-white" : "text-richbrown"}`}>
                  {pkg.price}
                </div>
                <div className={`text-[12px] mb-6 ${pkg.featured ? "text-white/50" : "text-richbrown-light"}`}>
                  Starting price
                </div>
                <div className="space-y-2.5 mb-7">
                  {pkg.features.map((f) => (
                    <div key={f} className={`flex items-center gap-2 text-[13px] ${pkg.featured ? "text-white/80" : "text-richbrown-mid"}`}>
                      <span className="text-gold">✓</span> {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("contact")}
                  className={`w-full py-3 rounded-full text-[13px] font-medium transition-all hover:-translate-y-0.5 ${
                    pkg.featured
                      ? "bg-gold hover:bg-gold-dark text-white"
                      : "border-[1.5px] border-gold text-gold hover:bg-gold hover:text-white"
                  }`}
                >
                  Book This Package
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <Footer mini navigate={navigate} />
    </div>
  );
}