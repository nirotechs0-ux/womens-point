"use client";
import React from "react";
type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";
interface FooterProps {
  mini?: boolean;
  navigate: (p: Page) => void;
}

const socials = [
  {
    key: "ig",
    href: "https://www.instagram.com/womenspointbeauty_khalilabad?igsh=MWYzZ3Rkcnp0d2x1cQ==",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.613.074-3.067.48-4.204 1.617C1.712 2.826 1.306 4.28 1.232 5.893 1.174 7.173 1.16 7.581 1.16 12c0 4.419.014 4.827.072 6.107.074 1.613.48 3.067 1.617 4.204 1.137 1.137 2.591 1.543 4.204 1.617 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.613-.074 3.067-.48 4.204-1.617 1.137-1.137 1.543-2.591 1.617-4.204.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.074-1.613-.48-3.067-1.617-4.204C19.014.646 17.56.24 15.947.166 14.667.108 14.259.094 12 .094h.001zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    key: "wa",
    href: "https://wa.me/919918651694",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    key: "yt",
    href: "https://youtube.com/@neelamchaudhary7605?si=sloimNkwlwSxKOdb",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer({ mini = false, navigate }: FooterProps) {
  return (
    <footer className="bg-richbrown">
      {!mini && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-[5%] pt-16 pb-10 border-b border-white/8">
          <div>
            <div className="font-playfair text-[20px] font-semibold text-white mb-3">
              Womens Point
            </div>
            <p className="text-[13px] text-white/40 leading-relaxed mb-6">
              A premium beauty destination offering exceptional services for the modern woman.
              Your beauty, our passion — since 2016.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {[
            {
              title: "Services",
              links: [
                { l: "Bridal Makeup", p: "bridal" },
                { l: "Hair Services", p: "services" },
                { l: "Skin Care", p: "services" },
                { l: "Nails & Body", p: "services" },
              ],
            },
            {
              title: "Quick Links",
              links: [
                { l: "Home", p: "home" },
                { l: "Gallery", p: "gallery" },
                { l: "Reviews", p: "reviews" },
                { l: "Book Now", p: "contact" },
              ],
            },
            {
              title: "Contact",
              links: [
                { l: "+91 99186 51694", p: "" },
                { l: "neelamchaudhry9918@gmail.com", p: "" },
                { l: "Mon–Sat: 10am–8pm", p: "" },
                { l: "Book Appointment", p: "contact" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[2.5px] uppercase text-gold mb-5">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.l}>
                    <button
                      onClick={() => link.p && navigate(link.p as Page)}
                      className="text-[13px] text-white/40 hover:text-gold transition-colors text-left"
                    >
                      {link.l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between px-[5%] py-5 flex-wrap gap-3">
        <p className="text-[12px] text-white/25">
          © 2026 Womens Point Beauty Parlour. All rights reserved.
        </p>
        <p className="text-[12px] text-white/20">Crafted with ♡</p>
      </div>
    </footer>
  );
}