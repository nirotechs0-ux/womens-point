"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface NavbarProps {
  activePage: Page;
  navigate: (p: Page) => void;
}

const navLinks: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "bridal", label: "Bridal" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
];

export default function Navbar({ activePage, navigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavigate = (p: Page) => {
    navigate(p);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/97 shadow-sm" : "bg-white/97"
        } border-b border-gold/10 backdrop-blur-xl`}
      >
        <div className="flex items-center justify-between px-[5%] h-[70px]">
          {/* Brand */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3.5 text-left"
          >
            <div className="w-11 h-11 rounded-full border-2 border-gold bg-cream flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img src="/parlourLogo.png" alt="Womens Point Logo" width={44} height={44} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-playfair text-[17px] font-semibold text-richbrown leading-tight">
                Womens Point
              </div>
              <div className="text-[10px] tracking-[2.5px] uppercase text-gold font-medium">
                Beauty Parlour
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNavigate(n.id)}
                className={`text-[13px] font-medium px-3.5 py-2 rounded-full transition-all duration-200 ${
                  activePage === n.id
                    ? "bg-cream text-gold-dark"
                    : "text-richbrown-mid hover:bg-cream hover:text-gold-dark"
                }`}
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate("contact")}
              className="ml-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(196,156,120,0.3)]"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-6 h-[2px] bg-richbrown rounded transition-all ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-richbrown rounded transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-richbrown rounded transition-all ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] left-0 right-0 z-40 bg-white border-b border-gold/10 shadow-lg px-[5%] py-4 flex flex-col gap-1 md:hidden"
          >
            {navLinks.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNavigate(n.id)}
                className="text-left text-[15px] font-medium text-richbrown px-4 py-3 rounded-2xl hover:bg-cream hover:text-gold-dark transition-colors"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate("contact")}
              className="text-left text-[15px] font-medium text-gold px-4 py-3 rounded-2xl hover:bg-cream transition-colors"
            >
              📅 Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}