// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import BookingForm from "../components/BookingForm";

// // ── Framer-motion helpers ──────────────────────────────────────────────
// const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
//       {children}
//     </motion.div>
//   );
// };

// // ── Section label ──────────────────────────────────────────────────────
// const SectionLabel = ({ text }: { text: string }) => (
//   <div className="inline-flex items-center gap-2.5 text-[11px] tracking-[2.5px] uppercase text-gold font-medium mb-3.5">
//     <span className="w-7 h-[1.5px] bg-gold inline-block" />
//     {text}
//   </div>
// );

// // ── Nav pages enum ─────────────────────────────────────────────────────
// type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

// // ── Unsplash image helper (beauty parlour themed) ──────────────────────
// const IMG = {
//   hero: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1187&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   bridal1: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
//   bridal2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
//   hair1: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
//   hair2: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
//   nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
//   skin: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80",
//   makeup1: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80",
//   gallery1: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80",
//   gallery2: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500&q=80",
//   gallery3: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
//   gallery4: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
//   gallery5: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=500&q=80",
//   gallery6: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
// };

// export default function WomensPoint() {
//   const [activePage, setActivePage] = useState<Page>("home");
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   const navigate = (p: Page) => {
//     setActivePage(p);
//     setMobileOpen(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const navLinks: { id: Page; label: string }[] = [
//     { id: "home", label: "Home" },
//     { id: "services", label: "Services" },
//     { id: "bridal", label: "Bridal" },
//     { id: "gallery", label: "Gallery" },
//     { id: "reviews", label: "Reviews" },
//   ];

//   // ══════════════════════════════════════════
//   // NAVBAR
//   // ══════════════════════════════════════════
//   const Navbar = () => (
//     <>
//       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/97 shadow-sm" : "bg-white/97"} border-b border-gold/10 backdrop-blur-xl`}>
//         <div className="flex items-center justify-between px-[5%] h-[70px]">
//           {/* Brand */}
//           <button onClick={() => navigate("home")} className="flex items-center gap-3.5 text-left">
//             <div className="w-11 h-11 rounded-full border-2 border-gold bg-cream flex items-center justify-center flex-shrink-0">
//               <svg viewBox="0 0 24 24" fill="none" stroke="#C49C78" strokeWidth="1.5" width="20" height="20">
//                 <path d="M12 2C8 2 5 5 5 8c0 4 3 7 7 10 4-3 7-6 7-10 0-3-2-6-7-6z" /><circle cx="12" cy="8" r="2" fill="#C49C78" stroke="none" />
//               </svg>
//             </div>
//             <div>
//               <div className="font-playfair text-[17px] font-semibold text-richbrown leading-tight">Womens Point</div>
//               <div className="text-[10px] tracking-[2.5px] uppercase text-gold font-medium">Beauty Parlour</div>
//             </div>
//           </button>
//           {/* Desktop nav */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navLinks.map(n => (
//               <button key={n.id} onClick={() => navigate(n.id)}
//                 className={`text-[13px] font-medium px-3.5 py-2 rounded-full transition-all duration-200 ${activePage === n.id ? "bg-cream text-gold-dark" : "text-richbrown-mid hover:bg-cream hover:text-gold-dark"}`}>
//                 {n.label}
//               </button>
//             ))}
//             <button onClick={() => navigate("contact")}
//               className="ml-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(196,156,120,0.3)]">
//               Book Now
//             </button>
//           </nav>
//           {/* Mobile hamburger */}
//           <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setMobileOpen(!mobileOpen)}>
//             <span className={`block w-6 h-[2px] bg-richbrown rounded transition-all ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
//             <span className={`block w-6 h-[2px] bg-richbrown rounded transition-all ${mobileOpen ? "opacity-0" : ""}`} />
//             <span className={`block w-6 h-[2px] bg-richbrown rounded transition-all ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
//           </button>
//         </div>
//       </header>
//       {/* Mobile menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
//             className="fixed top-[70px] left-0 right-0 z-40 bg-white border-b border-gold/10 shadow-lg px-[5%] py-4 flex flex-col gap-1 md:hidden">
//             {navLinks.map(n => (
//               <button key={n.id} onClick={() => navigate(n.id)}
//                 className="text-left text-[15px] font-medium text-richbrown px-4 py-3 rounded-2xl hover:bg-cream hover:text-gold-dark transition-colors">
//                 {n.label}
//               </button>
//             ))}
//             <button onClick={() => navigate("contact")} className="text-left text-[15px] font-medium text-gold px-4 py-3 rounded-2xl hover:bg-cream transition-colors">
//               📅 Book Now
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );

//   // ══════════════════════════════════════════
//   // HOME PAGE
//   // ══════════════════════════════════════════
//   const HomePage = () => (
//     <div>
//       {/* HERO — Background Video */}
//       <section className="relative min-h-screen flex items-center overflow-hidden">
//         <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
//           src="https://assets.mixkit.co/videos/preview/mixkit-woman-getting-beauty-treatment-in-salon-42614-large.mp4"
//           poster={IMG.hero}>
//           <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-getting-beauty-treatment-in-salon-42614-large.mp4" type="video/mp4" />
//         </video>
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-richbrown/85 via-richbrown/60 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-richbrown/50 via-transparent to-transparent" />
//         {/* Watermark */}
//         <span className="absolute right-0 bottom-0 font-playfair text-[180px] font-bold text-white/5 leading-none select-none pointer-events-none translate-y-8">Beauty</span>

//         <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] pt-20 pb-16">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//             <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-7">
//               <span className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-[11px]">✦</span>
//               <span className="text-[11px] tracking-[1.5px] uppercase text-white/80 font-medium">Premium Beauty Experience</span>
//             </div>
//             <h1 className="font-playfair text-[clamp(44px,7vw,84px)] font-bold text-white leading-[1.08] mb-5">
//               Where Beauty<br />Meets <em className="italic text-gold">Elegance</em>
//             </h1>
//             <p className="text-[15px] text-white/75 leading-relaxed max-w-[420px] mb-9">
//               Indulge in luxury beauty treatments crafted with care. From bridal transformations to everyday glamour — your beauty is our passion.
//             </p>
//             <div className="flex gap-3.5 flex-wrap mb-12">
//               <button onClick={() => navigate("services")}
//                 className="bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.4)]">
//                 Explore Services
//               </button>
//               <button onClick={() => navigate("bridal")}
//                 className="bg-transparent border-[1.5px] border-white/40 text-white px-8 py-3.5 rounded-full text-[13px] font-medium transition-all hover:border-gold hover:text-gold">
//                 Bridal Packages
//               </button>
//             </div>
//             <div className="flex gap-6 flex-wrap">
//               {[["4.8★","Top Rated"],["1000+","Happy Clients"],["8+","Years of Excellence"]].map(([num,label],i) => (
//                 <div key={i} className="flex items-center gap-3">
//                   {i>0&&<div className="w-px h-8 bg-white/15"/>}
//                   <div>
//                     <div className="font-playfair text-2xl font-bold text-gold">{num}</div>
//                     <div className="text-[11px] text-white/50">{label}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Floating card */}
//         <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
//           className="absolute right-[5%] bottom-[12%] hidden lg:flex items-center gap-3 bg-white rounded-2xl p-4 shadow-xl">
//           <div className="w-11 h-11 bg-cream rounded-xl flex items-center justify-center text-xl">⭐</div>
//           <div><div className="font-semibold text-[14px] text-richbrown">500+ Bridal Looks</div><div className="text-[11px] text-richbrown-light">Delivered with love</div></div>
//         </motion.div>
//       </section>

//       {/* STATS BAR */}
//       <div className="bg-richbrown py-10 px-[5%] flex justify-around flex-wrap gap-5">
//         {[["4.8★","Top App Rating"],["1000+","Bookings Done"],["500+","Bridal Makeups"],["8+","Years in Business"]].map(([num,label]) => (
//           <FadeUp key={label} className="text-center">
//             <span className="font-playfair text-[42px] font-bold text-gold block leading-none mb-1.5">{num}</span>
//             <span className="text-[11px] tracking-[2px] uppercase text-white/40">{label}</span>
//           </FadeUp>
//         ))}
//       </div>

//       {/* SERVICES PREVIEW */}
//       <section className="py-[90px] px-[5%]">
//         <FadeUp><SectionLabel text="What We Offer"/></FadeUp>
//         <FadeUp><h2 className="font-playfair text-[clamp(32px,4vw,48px)] font-bold text-richbrown leading-[1.15] mb-3">Our <em className="italic text-gold">Services</em></h2></FadeUp>
//         <FadeUp><p className="text-[15px] text-richbrown-mid leading-relaxed max-w-lg mb-12">A complete beauty destination — from bridal transformations to everyday glow.</p></FadeUp>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {[
//             { icon:"💍", title:"Bridal Makeup", desc:"Complete bridal transformation. HD, Airbrush, Traditional — all styles perfected.", page:"bridal" as Page },
//             { icon:"✨", title:"Makeup & Glam", desc:"Party, reception, engagement — every occasion deserves a stunning look.", page:"services" as Page },
//             { icon:"💇", title:"Hair Services", desc:"Expert styling, treatment, and care for every hair type and occasion.", page:"services" as Page },
//             { icon:"🌸", title:"Skin Care", desc:"Rejuvenating facials and treatments for healthy, radiant skin.", page:"services" as Page },
//             { icon:"💅", title:"Nails & Body", desc:"Nail art, body care, and grooming services by expert hands.", page:"services" as Page },
//             { icon:"🪒", title:"Grooming", desc:"Professional threading, waxing, and complete grooming services.", page:"services" as Page },
//           ].map((srv, i) => (
//             <FadeUp key={srv.title} delay={i*0.08}>
//               <div className="group bg-cream hover:bg-white border-[1.5px] border-transparent hover:border-gold/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(196,156,120,0.15)] cursor-pointer relative overflow-hidden"
//                 onClick={() => navigate(srv.page)}>
//                 <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl"/>
//                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[22px] mb-4 shadow-sm">{srv.icon}</div>
//                 <h3 className="font-playfair text-[20px] font-semibold text-richbrown mb-2">{srv.title}</h3>
//                 <p className="text-[13px] text-richbrown-mid leading-relaxed mb-4">{srv.desc}</p>
//                 <span className="inline-flex items-center gap-1.5 text-[12px] text-gold font-medium">
//                   View details
//                   <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12" className="group-hover:translate-x-1 transition-transform"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
//                 </span>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </section>

//       {/* GALLERY PREVIEW with images */}
//       <section className="py-16 px-[5%] bg-cream">
//         <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
//           <div>
//             <FadeUp><SectionLabel text="Our Work"/></FadeUp>
//             <FadeUp><h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold text-richbrown">Our <em className="italic text-gold">Gallery</em></h2></FadeUp>
//           </div>
//           <FadeUp><button onClick={() => navigate("gallery")} className="border-[1.5px] border-richbrown/20 hover:border-gold text-richbrown hover:text-gold text-[13px] font-medium px-6 py-2.5 rounded-full transition-all">View All →</button></FadeUp>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {[IMG.gallery1,IMG.bridal1,IMG.hair1,IMG.nails,IMG.skin,IMG.gallery5].map((src,i) => (
//             <FadeUp key={i} delay={i*0.07}>
//               <div className="aspect-square rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate("gallery")}>
//                 <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </section>

//       {/* MILESTONES */}
//       <section className="py-[90px] px-[5%]">
//         <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           <FadeUp>
//             <div className="bg-white rounded-3xl p-10 shadow-[0_8px_40px_rgba(196,156,120,0.1)] grid grid-cols-2 gap-6">
//               {[["🏆","8+","Years of Expertise"],["💍","500+","Bridal Makeups"],["⭐","4.8","Average Rating"],["📋","1000+","Bookings Done"]].map(([icon,num,label]) => (
//                 <div key={label} className="bg-cream rounded-2xl p-6 text-center">
//                   <div className="text-2xl mb-2">{icon}</div>
//                   <div className="font-playfair text-[38px] font-bold text-gold leading-none mb-1">{num}</div>
//                   <div className="text-[12px] text-richbrown-mid">{label}</div>
//                 </div>
//               ))}
//             </div>
//           </FadeUp>
//           <FadeUp delay={0.15}>
//             <SectionLabel text="Our Journey"/>
//             <h2 className="font-playfair text-[clamp(30px,4vw,46px)] font-bold text-richbrown leading-[1.15] mb-4">Milestones That<br/><em className="italic text-gold">Define Us</em></h2>
//             <p className="text-[15px] text-richbrown-mid leading-relaxed mb-7">From a humble beginning to becoming the city's most trusted beauty destination — every achievement is a reflection of our clients' love and trust.</p>
//             <button onClick={() => navigate("contact")} className="bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.35)]">
//               Book Your Session
//             </button>
//           </FadeUp>
//         </div>
//       </section>

//       {/* REVIEWS STRIP */}
//       <section className="py-[90px] px-[5%] bg-cream">
//         <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
//           <div>
//             <FadeUp><SectionLabel text="Client Stories"/></FadeUp>
//             <FadeUp><h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold text-richbrown">What They <em className="italic text-gold">Say</em></h2></FadeUp>
//           </div>
//           <FadeUp><button onClick={() => navigate("reviews")} className="border-[1.5px] border-richbrown/20 hover:border-gold text-richbrown hover:text-gold text-[13px] font-medium px-6 py-2.5 rounded-full transition-all h-fit">All Reviews →</button></FadeUp>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {[
//             {stars:"★★★★★",text:"Best bridal makeup I've ever seen. My look stayed flawless the entire day. Everyone was asking who did my makeup!",name:"Priya Sharma",type:"Bridal Makeup · HD Package"},
//             {stars:"★★★★★",text:"Absolutely stunning results for my reception. The team understands exactly what you want and delivers beyond expectations.",name:"Neha Gupta",type:"Reception Makeup · Eleganza"},
//             {stars:"★★★★★",text:"Coming here for 3 years now. Best skincare and hair services. They genuinely care about you and it shows in the results.",name:"Anjali Mehta",type:"Regular Client · Hair & Skin"},
//           ].map((r,i) => (
//             <FadeUp key={i} delay={i*0.1}>
//               <div className="bg-white hover:border-gold/30 border-[1.5px] border-transparent rounded-3xl p-7 transition-all hover:shadow-[0_8px_32px_rgba(196,156,120,0.12)] h-full">
//                 <div className="text-gold text-[13px] tracking-[2px] mb-3">{r.stars}</div>
//                 <p className="font-playfair text-[16px] italic text-richbrown leading-[1.7] mb-5">"{r.text}"</p>
//                 <div className="text-[13px] font-semibold text-richbrown">{r.name}</div>
//                 <div className="text-[11px] text-richbrown-light mt-0.5">{r.type}</div>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </section>

//       {/* CTA STRIP */}
//       <section className="bg-richbrown py-16 px-[5%] text-center">
//         <FadeUp><h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold text-white mb-3">Ready for Your <em className="italic text-gold">Transformation?</em></h2></FadeUp>
//         <FadeUp><p className="text-white/60 text-[15px] mb-8 max-w-md mx-auto">Book your appointment today and experience the beauty treatment you deserve.</p></FadeUp>
//         <FadeUp>
//           <button onClick={() => navigate("contact")} className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-full text-[14px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(196,156,120,0.4)]">
//             Book Now →
//           </button>
//         </FadeUp>
//       </section>

//       <Footer />
//     </div>
//   );

//   // ══════════════════════════════════════════
//   // PAGE HERO BANNER (reusable)
//   // ══════════════════════════════════════════
//   const PageHero = ({ title, sub, page }: { title: React.ReactNode; sub: string; page: string }) => (
//     <div className="bg-cream py-[80px] px-[5%] text-center relative overflow-hidden">
//       <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair text-[160px] font-bold text-gold/5 whitespace-nowrap pointer-events-none">{page}</span>
//       <div className="flex items-center gap-2 justify-center mb-4 relative">
//         <span className="text-[12px] text-richbrown-light">Home</span>
//         <span className="text-[10px] text-richbrown-light">›</span>
//         <span className="text-[12px] text-gold">{page}</span>
//       </div>
//       <h1 className="font-playfair text-[clamp(38px,5.5vw,64px)] font-bold text-richbrown relative">{title}</h1>
//       <p className="text-[15px] text-richbrown-mid max-w-md mx-auto mt-4 leading-relaxed relative">{sub}</p>
//     </div>
//   );

//   // ══════════════════════════════════════════
//   // SERVICES PAGE
//   // ══════════════════════════════════════════
//   const ServicesPage = () => {
//     const cats = [
//       { icon:"💍", title:"Bridal Services", items:[{e:"👰",n:"Bridal Makeup",s:"Classic & HD"},{e:"💍",n:"Engagement Makeup",s:"Same Day Service"},{e:"🥂",n:"Reception Makeup",s:"Glam Evening Look"},{e:"✨",n:"Pre-Bridal Makeup",s:"Trial Sessions"}] },
//       { icon:"✨", title:"Makeup Services", items:[{e:"💄",n:"Party Makeup",s:"Any Occasion"},{e:"👁️",n:"Eye Makeup",s:"Smokey, Cat-eye"},{e:"🌟",n:"Glam / Fashion Makeup",s:"Editorial Looks"},{e:"🎭",n:"HD Airbrush Makeup",s:"Flawless Finish"},{e:"🌸",n:"Basic Casual Makeup",s:"Natural Look"}] },
//       { icon:"💇", title:"Hair Services", items:[{e:"💆",n:"Hair Care",s:"Treatment & Spa"},{e:"✂️",n:"Hair Styling",s:"All Occasions"},{e:"🪮",n:"Hair Coloring",s:"Global & Highlights"}] },
//       { icon:"🌿", title:"Skin Care", items:[{e:"🧖",n:"Skin Care",s:"Glow & Repair"},{e:"🌺",n:"Basic Clean Up",s:"Refresh & Cleanse"},{e:"💎",n:"Body Care",s:"Head to Toe"}] },
//       { icon:"💅", title:"Nails & More", items:[{e:"💅",n:"Nails",s:"Art & Extension"},{e:"🪒",n:"Grooming",s:"Threading & Shaping"}] },
//     ];
//     return (
//       <div>
//         <PageHero title={<>All <em className="italic text-gold">Services</em></>} sub="A complete range of beauty and wellness services — crafted for every woman, every occasion." page="Services"/>
//         <section className="py-[80px] px-[5%]">
//           {cats.map((cat, ci) => (
//             <div key={cat.title} className="mb-12">
//               <FadeUp>
//                 <div className="flex items-center gap-3 font-playfair text-[28px] font-bold text-richbrown mb-6 after:content-[''] after:flex-1 after:h-px after:bg-gold/15">
//                   <span>{cat.icon}</span> {cat.title}
//                 </div>
//               </FadeUp>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {cat.items.map((item, ii) => (
//                   <FadeUp key={item.n} delay={ii*0.06}>
//                     <div className="group bg-cream hover:bg-white border-[1.5px] border-transparent hover:border-gold/30 rounded-2xl p-5 text-center transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(196,156,120,0.12)] cursor-pointer"
//                       onClick={() => navigate("contact")}>
//                       <div className="text-[28px] mb-2">{item.e}</div>
//                       <div className="font-playfair text-[15px] font-semibold text-richbrown mb-0.5">{item.n}</div>
//                       <div className="text-[11px] text-richbrown-light">{item.s}</div>
//                     </div>
//                   </FadeUp>
//                 ))}
//               </div>
//             </div>
//           ))}
//           <div className="text-center mt-10">
//             <button onClick={() => navigate("contact")} className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-full text-[13px] font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.35)]">
//               Book Any Service →
//             </button>
//           </div>
//         </section>
//         <Footer mini/>
//       </div>
//     );
//   };

//   // ══════════════════════════════════════════
//   // BRIDAL PAGE
//   // ══════════════════════════════════════════
//   const BridalPage = () => (
//     <div>
//       <PageHero title={<>Bridal <em className="italic text-gold">Packages</em></>} sub="Your most important day deserves the most extraordinary look. Discover our curated bridal packages." page="Bridal"/>
//       <section className="py-[80px] px-[5%]">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
//           <FadeUp>
//             <img src={IMG.bridal1} alt="Bridal Makeup" className="w-full rounded-3xl object-cover aspect-[4/5] shadow-xl"/>
//           </FadeUp>
//           <FadeUp delay={0.15}>
//             <SectionLabel text="Bridal Collections"/>
//             <h2 className="font-playfair text-[clamp(28px,4vw,46px)] font-bold text-richbrown leading-tight mb-4">
//               Your Dream Look,<br/><em className="italic text-gold">Perfectly Crafted</em>
//             </h2>
//             <p className="text-[15px] text-richbrown-mid leading-relaxed mb-6">
//               Every bride deserves to feel extraordinary on her special day. Our bridal team combines artistry with the finest products to create looks that last beautifully throughout your celebrations.
//             </p>
//             <div className="space-y-3 mb-7">
//               {["Trial session included with all packages","12+ hours long-lasting makeup guarantee","Premium HD & Airbrush techniques","Hair styling & draping coordination"].map(item => (
//                 <div key={item} className="flex items-center gap-2.5 text-[14px] text-richbrown">
//                   <span className="w-5 h-5 bg-gold rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0">✓</span>
//                   {item}
//                 </div>
//               ))}
//             </div>
//             <button onClick={() => navigate("contact")} className="bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full text-[13px] font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,156,120,0.35)]">
//               Book Bridal Consultation →
//             </button>
//           </FadeUp>
//         </div>

//         {/* Packages */}
//         <FadeUp><h3 className="font-playfair text-[32px] font-bold text-richbrown text-center mb-2">Choose Your <em className="italic text-gold">Package</em></h3></FadeUp>
//         <FadeUp><p className="text-center text-richbrown-mid text-[14px] mb-10">All packages include a complimentary trial session</p></FadeUp>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             { name:"Classic", price:"₹8,000", color:"bg-cream", features:["Full Bridal Makeup","Traditional techniques","Bindi & Accessories","1 Touch-up Kit","Trial session"] },
//             { name:"HD Package", price:"₹14,000", color:"bg-richbrown", featured:true, features:["HD Camera-Ready Makeup","Premium imported products","Hair Styling included","2 Touch-up Kits","Extended trial session","Reception look included"] },
//             { name:"Eleganza", price:"₹20,000", color:"bg-cream", features:["Airbrush Technique","International brands","Full Hair & Draping","Unlimited touch-ups","2 trial sessions","Full day artist"] },
//           ].map((pkg, i) => (
//             <FadeUp key={pkg.name} delay={i*0.1}>
//               <div className={`${pkg.color} rounded-3xl p-8 ${pkg.featured?"shadow-[0_16px_48px_rgba(196,156,120,0.25)] scale-105":""} relative`}>
//                 {pkg.featured&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[11px] font-medium px-4 py-1.5 rounded-full">Most Popular</div>}
//                 <div className={`text-[11px] tracking-[2px] uppercase font-medium mb-2 ${pkg.featured?"text-gold":"text-gold"}`}>{pkg.name}</div>
//                 <div className={`font-playfair text-[38px] font-bold mb-1 ${pkg.featured?"text-white":"text-richbrown"}`}>{pkg.price}</div>
//                 <div className={`text-[12px] mb-6 ${pkg.featured?"text-white/50":"text-richbrown-light"}`}>Starting price</div>
//                 <div className="space-y-2.5 mb-7">
//                   {pkg.features.map(f => (
//                     <div key={f} className={`flex items-center gap-2 text-[13px] ${pkg.featured?"text-white/80":"text-richbrown-mid"}`}>
//                       <span className="text-gold">✓</span> {f}
//                     </div>
//                   ))}
//                 </div>
//                 <button onClick={() => navigate("contact")} className={`w-full py-3 rounded-full text-[13px] font-medium transition-all hover:-translate-y-0.5 ${pkg.featured?"bg-gold hover:bg-gold-dark text-white":"border-[1.5px] border-gold text-gold hover:bg-gold hover:text-white"}`}>
//                   Book This Package
//                 </button>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </section>
//       <Footer mini/>
//     </div>
//   );

//   // ══════════════════════════════════════════
//   // GALLERY PAGE
//   // ══════════════════════════════════════════
//   const GalleryPage = () => {
//     const [filter, setFilter] = useState("All");
//     const tabs = ["All","Bridal","Hair","Nails","Skin","Makeup"];
//     const images = [
//       {src:IMG.bridal1,cat:"Bridal",label:"Bridal HD Makeup"},{src:IMG.hair1,cat:"Hair",label:"Hair Styling"},
//       {src:IMG.nails,cat:"Nails",label:"Nail Art"},{src:IMG.skin,cat:"Skin",label:"Skin Glow"},
//       {src:IMG.gallery1,cat:"Makeup",label:"Party Makeup"},{src:IMG.gallery2,cat:"Bridal",label:"Reception Look"},
//       {src:IMG.gallery3,cat:"Skin",label:"Facial Treatment"},{src:IMG.gallery4,cat:"Makeup",label:"Bridal Glam"},
//       {src:IMG.gallery5,cat:"Hair",label:"Color Treatment"},{src:IMG.gallery6,cat:"Nails",label:"Gel Extension"},
//       {src:IMG.hair2,cat:"Hair",label:"Blow Dry Styling"},{src:IMG.makeup1,cat:"Makeup",label:"Eye Makeup"},
//     ];
//     const filtered = filter==="All" ? images : images.filter(i=>i.cat===filter);
//     return (
//       <div>
//         <PageHero title={<>Our <em className="italic text-gold">Gallery</em></>} sub="A glimpse into the transformations we've created. Every look tells a story." page="Gallery"/>
//         <section className="py-[60px] px-[5%]">
//           <div className="flex gap-2 flex-wrap mb-10 justify-center">
//             {tabs.map(t => (
//               <button key={t} onClick={() => setFilter(t)}
//                 className={`text-[13px] px-5 py-2 rounded-full border-[1.5px] transition-all ${filter===t?"border-gold text-gold bg-cream":"border-transparent bg-cream text-richbrown-mid hover:border-gold/50"}`}>
//                 {t}
//               </button>
//             ))}
//           </div>
//           <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             <AnimatePresence>
//               {filtered.map((img, i) => (
//                 <motion.div key={img.src} layout initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.9}} transition={{delay:i*0.04}} className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer">
//                   <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
//                   <div className="absolute inset-0 bg-richbrown/0 group-hover:bg-richbrown/40 transition-all duration-300 flex items-end p-4">
//                     <span className="text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">{img.label}</span>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </section>
//         <Footer mini/>
//       </div>
//     );
//   };

//   // ══════════════════════════════════════════
//   // REVIEWS PAGE
//   // ══════════════════════════════════════════
//   const ReviewsPage = () => (
//     <div>
//       <PageHero title={<>Client <em className="italic text-gold">Reviews</em></>} sub="Real stories from our beloved clients. Their satisfaction is our greatest achievement." page="Reviews"/>
//       <section className="py-[60px] px-[5%]">
//         {/* Overall rating */}
//         <FadeUp>
//           <div className="bg-cream rounded-3xl p-10 flex items-center gap-16 mb-12 flex-wrap">
//             <div className="text-center">
//               <div className="font-playfair text-[72px] font-bold text-gold leading-none">4.8</div>
//               <div className="text-gold text-[22px] tracking-[4px] mt-1">★★★★★</div>
//               <div className="text-[13px] text-richbrown-light mt-1">Based on 200+ reviews</div>
//             </div>
//             <div className="flex-1 min-w-[200px] space-y-2">
//               {[[5,86],[4,10],[3,3],[2,1],[1,0]].map(([star,pct]) => (
//                 <div key={star} className="flex items-center gap-3">
//                   <span className="text-[12px] text-richbrown-mid w-3">{star}</span>
//                   <div className="flex-1 h-2 bg-gold/15 rounded-full overflow-hidden">
//                     <div className="h-full bg-gold rounded-full transition-all" style={{width:`${pct}%`}}/>
//                   </div>
//                   <span className="text-[11px] text-richbrown-light w-6 text-right">{pct}%</span>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <div className="text-[12px] text-gold tracking-widest uppercase mb-1">Public Opinion</div>
//               <div className="font-playfair text-[22px] font-bold text-richbrown italic">"The City's Favourite<br/>Beauty Parlour"</div>
//               <div className="text-[12px] text-richbrown-light mt-1">— Local Beauty Rankings 2024</div>
//             </div>
//           </div>
//         </FadeUp>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {[
//             {init:"P",name:"Priya Sharma",tag:"Bridal Makeup · HD Package",stars:"★★★★★",text:"Best bridal makeup experience. My look stayed flawless throughout the entire wedding day. Everyone kept asking who did my makeup!",color:"bg-gold"},
//             {init:"N",name:"Neha Gupta",tag:"Reception Makeup · Eleganza",stars:"★★★★★",text:"Absolutely stunning results. The team is so professional and talented. From hair to makeup, everything was done beautifully.",color:"bg-gold-dark"},
//             {init:"A",name:"Anjali Mehta",tag:"Regular Client · Hair & Skin",stars:"★★★★★",text:"I've been coming here for 3 years now. Best skincare and hair services in the area. They really understand what you need.",color:"bg-gold-deeper"},
//             {init:"S",name:"Simran Kaur",tag:"Engagement Makeup",stars:"★★★★★",text:"I got my engagement makeup done here and I looked absolutely gorgeous. The artist was so patient and understood my vision perfectly.",color:"bg-gold"},
//             {init:"R",name:"Ritu Verma",tag:"Party Makeup",stars:"★★★★★",text:"Got party makeup done for a family function. The results were incredible — so many compliments! Will definitely come back.",color:"bg-gold-dark"},
//             {init:"M",name:"Meera Joshi",tag:"Skin Care Treatment",stars:"★★★★☆",text:"The skin care treatment was very relaxing and my skin felt amazing after. Booked another session already. Great value.",color:"bg-gold-deeper"},
//           ].map((r,i) => (
//             <FadeUp key={i} delay={i*0.07}>
//               <div className="bg-cream hover:bg-white border-[1.5px] border-transparent hover:border-gold/20 rounded-2xl p-7 transition-all">
//                 <div className="flex items-center gap-3.5 mb-4">
//                   <div className={`w-11 h-11 rounded-full ${r.color} flex items-center justify-center font-playfair text-[18px] font-bold text-white flex-shrink-0`}>{r.init}</div>
//                   <div>
//                     <div className="text-[14px] font-semibold text-richbrown">{r.name}</div>
//                     <div className="text-[11px] text-richbrown-light">{r.tag}</div>
//                   </div>
//                 </div>
//                 <div className="text-gold text-[12px] tracking-[2px] mb-3">{r.stars}</div>
//                 <p className="font-playfair text-[15px] italic text-richbrown leading-[1.7]">"{r.text}"</p>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </section>
//       <Footer mini/>
//     </div>
//   );

//   // ══════════════════════════════════════════
//   // CONTACT PAGE
//   // ══════════════════════════════════════════
//   const ContactPage = () => (
//     <div>
//       <PageHero title={<>Book Your <em className="italic text-gold">Appointment</em></>} sub="Ready for a transformation? Fill the form below and we'll confirm your booking within 24 hours." page="Contact"/>
//       <section className="py-[60px] px-[5%]">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[70px] items-start max-w-[1200px] mx-auto">
//           {/* Info card */}
//           <div className="sticky top-[90px]">
//             <FadeUp>
//               <div className="bg-cream rounded-3xl p-9">
//                 <div className="flex items-center gap-3 mb-8">
//                   <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
//                     <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M12 2C8 2 5 5 5 8c0 4 3 7 7 10 4-3 7-6 7-10 0-3-2-6-7-6z"/><circle cx="12" cy="8" r="2" fill="white"/></svg>
//                   </div>
//                   <div>
//                     <div className="font-playfair text-[18px] font-semibold text-richbrown">Womens Point</div>
//                     <div className="text-[11px] tracking-[2px] uppercase text-gold">Beauty Parlour</div>
//                   </div>
//                 </div>
//                 {[
//                   {label:"Address",value:"Womens Point Beauty Parlour\nYour Street, Rohtak\nHaryana, India 124001",icon:"📍"},
//                   {label:"Phone",value:"+91 XXXXX XXXXX",icon:"📞"},
//                   {label:"Email",value:"info@womenspoint.com",icon:"✉️"},
//                   {label:"Working Hours",value:"Mon – Sat: 10:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM",icon:"🕙"},
//                 ].map(item => (
//                   <div key={item.label} className="mb-5">
//                     <label className="text-[10px] tracking-[2px] uppercase text-gold font-semibold block mb-1.5">{item.label}</label>
//                     <p className="text-[14px] text-richbrown leading-relaxed whitespace-pre-line">{item.value}</p>
//                   </div>
//                 ))}
//                 <div className="border-t border-gold/15 pt-5 mt-5">
//                   <p className="text-[11px] text-richbrown-light tracking-widest uppercase mb-3">Follow Us</p>
//                   <div className="flex gap-2.5">
//                     {["ig","fb","wa","yt"].map(s => (
//                       <a key={s} href="#" className="w-10 h-10 rounded-full border-[1.5px] border-gold/30 flex items-center justify-center text-[12px] font-semibold text-richbrown-mid hover:border-gold hover:text-gold transition-all">
//                         {s}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </FadeUp>
//             {/* Google Maps Embed */}
//             <FadeUp delay={0.1} className="mt-5">
//               <div className="rounded-3xl overflow-hidden shadow-md">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112073.91193767843!2d76.50649444999999!3d28.895241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85edd2e87c41%3A0x7a1f7a3df1c7df53!2sRohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
//                   width="100%" height="260" style={{border:0,display:"block"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Womens Point Location"/>
//               </div>
//             </FadeUp>
//           </div>

//           {/* Booking form */}
//           <FadeUp delay={0.1}>
//             <div className="bg-white">
//               <BookingForm/>
//             </div>
//           </FadeUp>
//         </div>
//       </section>
//       <Footer mini/>
//     </div>
//   );

//   // ══════════════════════════════════════════
//   // FOOTER
//   // ══════════════════════════════════════════
//   const Footer = ({ mini = false }: { mini?: boolean }) => (
//     <footer className="bg-richbrown">
//       {!mini && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-[5%] pt-16 pb-10 border-b border-white/8">
//           <div>
//             <div className="font-playfair text-[20px] font-semibold text-white mb-3">Womens Point</div>
//             <p className="text-[13px] text-white/40 leading-relaxed mb-6">A premium beauty destination offering exceptional services for the modern woman. Your beauty, our passion — since 2016.</p>
//             <div className="flex gap-2.5">
//               {["ig","fb","wa","yt"].map(s => (
//                 <a key={s} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[12px] font-semibold text-white/40 hover:border-gold hover:text-gold transition-all">{s}</a>
//               ))}
//             </div>
//           </div>
//           {[
//             {title:"Services",links:[{l:"Bridal Makeup",p:"bridal"},{l:"Hair Services",p:"services"},{l:"Skin Care",p:"services"},{l:"Nails & Body",p:"services"}]},
//             {title:"Quick Links",links:[{l:"Home",p:"home"},{l:"Gallery",p:"gallery"},{l:"Reviews",p:"reviews"},{l:"Book Now",p:"contact"}]},
//             {title:"Contact",links:[{l:"+91 XXXXX XXXXX",p:""},{l:"info@womenspoint.com",p:""},{l:"Mon–Sat: 10am–8pm",p:""},{l:"Book Appointment",p:"contact"}]},
//           ].map(col => (
//             <div key={col.title}>
//               <h4 className="text-[11px] tracking-[2.5px] uppercase text-gold mb-5">{col.title}</h4>
//               <ul className="space-y-2.5">
//                 {col.links.map(link => (
//                   <li key={link.l}>
//                     <button onClick={() => link.p && navigate(link.p as Page)} className="text-[13px] text-white/40 hover:text-gold transition-colors text-left">{link.l}</button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="flex items-center justify-between px-[5%] py-5 flex-wrap gap-3">
//         <p className="text-[12px] text-white/25">© 2026 Womens Point Beauty Parlour. All rights reserved.</p>
//         <p className="text-[12px] text-white/20">Crafted with ♡</p>
//       </div>
//     </footer>
//   );

//   // ══════════════════════════════════════════
//   // RENDER
//   // ══════════════════════════════════════════
//   return (
//     <div className="font-dm text-richbrown min-h-screen overflow-x-hidden">
//       <Navbar/>
//       <div className="pt-[70px]">
//         <AnimatePresence mode="wait">
//           <motion.div key={activePage} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}}>
//             {activePage==="home" && <HomePage/>}
//             {activePage==="services" && <ServicesPage/>}
//             {activePage==="bridal" && <BridalPage/>}
//             {activePage==="gallery" && <GalleryPage/>}
//             {activePage==="reviews" && <ReviewsPage/>}
//             {activePage==="contact" && <ContactPage/>}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";
// import HomePage from "../components/pages/HomePage";
// import ServicesPage from "../components/pages/ServicesPage";
// import BridalPage from "../components/pages/BridalPage";
// import GalleryPage from "../components/pages/GalleryPage";
// import ReviewsPage from "../components/pages/ReviewsPage";
// import ContactPage from "../components/pages/ContactPage";

// export type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

// export default function WomensPoint() {
//   const [activePage, setActivePage] = useState<Page>("home");

//   const navigate = (p: Page) => {
//     setActivePage(p);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="font-dm text-richbrown min-h-screen overflow-x-hidden">
//       <Navbar activePage={activePage} navigate={navigate} />
//       <div className="pt-[70px]">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activePage}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.25 }}
//           >
//             {activePage === "home"     && <HomePage     navigate={navigate} />}
//             {activePage === "services" && <ServicesPage navigate={navigate} />}
//             {activePage === "bridal"   && <BridalPage   navigate={navigate} />}
//             {activePage === "gallery"  && <GalleryPage  navigate={navigate} />}
//             {activePage === "reviews"  && <ReviewsPage  navigate={navigate} />}
//             {activePage === "contact"  && <ContactPage  navigate={navigate} />}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import HomePage from "../components/pages/HomePage";
import ServicesPage from "../components/pages/ServicesPage";
import BridalPage from "../components/pages/BridalPage";
import GalleryPage from "../components/pages/GalleryPage";
import ReviewsPage from "../components/pages/ReviewsPage";
import ContactPage from "../components/pages/ContactPage";

export type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

export default function WomensPoint() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [prefilledService, setPrefilledService] = useState("");

  const navigate = (p: Page) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Called from ServicesPage when user clicks Book on a sub-item
  const bookService = (serviceName: string) => {
    setPrefilledService(serviceName);
    setActivePage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-dm text-richbrown min-h-screen overflow-x-hidden">
      <Navbar activePage={activePage} navigate={navigate} />
      <div className="pt-[70px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activePage === "home"     && <HomePage     navigate={navigate} />}
            {activePage === "services" && <ServicesPage navigate={navigate} onBook={bookService} />}
            {activePage === "bridal"   && <BridalPage   navigate={navigate} />}
            {activePage === "gallery"  && <GalleryPage  navigate={navigate} />}
            {activePage === "reviews"  && <ReviewsPage  navigate={navigate} />}
            {activePage === "contact"  && <ContactPage  navigate={navigate} prefilledService={prefilledService} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}