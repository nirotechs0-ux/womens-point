"use client";

import FadeUp from "../shared/FadeUp";
import PageHero from "../shared/Pagehero";
import Footer from "../Footer";

type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface ReviewsPageProps {
  navigate: (p: Page) => void;
}

const reviews = [
  { init: "P", name: "Priya Sharma", tag: "Bridal Makeup · HD Package", stars: "★★★★★", text: "Best bridal makeup experience. My look stayed flawless throughout the entire wedding day. Everyone kept asking who did my makeup!", color: "bg-gold" },
  { init: "N", name: "Neha Gupta", tag: "Reception Makeup · Eleganza", stars: "★★★★★", text: "Absolutely stunning results. The team is so professional and talented. From hair to makeup, everything was done beautifully.", color: "bg-gold-dark" },
  { init: "A", name: "Anjali Mehta", tag: "Regular Client · Hair & Skin", stars: "★★★★★", text: "I've been coming here for 3 years now. Best skincare and hair services in the area. They really understand what you need.", color: "bg-gold-deeper" },
  { init: "S", name: "Simran Kaur", tag: "Engagement Makeup", stars: "★★★★★", text: "I got my engagement makeup done here and I looked absolutely gorgeous. The artist was so patient and understood my vision perfectly.", color: "bg-gold" },
  { init: "R", name: "Ritu Verma", tag: "Party Makeup", stars: "★★★★★", text: "Got party makeup done for a family function. The results were incredible — so many compliments! Will definitely come back.", color: "bg-gold-dark" },
  { init: "M", name: "Meera Joshi", tag: "Skin Care Treatment", stars: "★★★★☆", text: "The skin care treatment was very relaxing and my skin felt amazing after. Booked another session already. Great value.", color: "bg-gold-deeper" },
];

export default function ReviewsPage({ navigate }: ReviewsPageProps) {
  return (
    <div>
      <PageHero
        title={<>Client <em className="italic text-gold">Reviews</em></>}
        sub="Real stories from our beloved clients. Their satisfaction is our greatest achievement."
        page="Reviews"
      />
      <section className="py-[60px] px-[5%]">
        {/* Overall rating */}
        <FadeUp>
          <div className="bg-cream rounded-3xl p-10 flex items-center gap-16 mb-12 flex-wrap">
            <div className="text-center">
              <div className="font-playfair text-[72px] font-bold text-gold leading-none">4.9</div>
              <div className="text-gold text-[22px] tracking-[4px] mt-1">★★★★★</div>
              <div className="text-[13px] text-richbrown-light mt-1">Based on 200+ reviews</div>
            </div>
            <div className="flex-1 min-w-[200px] space-y-2">
              {[[5, 86], [4, 10], [3, 3], [2, 1], [1, 0]].map(([star, pct]) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-[12px] text-richbrown-mid w-3">{star}</span>
                  <div className="flex-1 h-2 bg-gold/15 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] text-richbrown-light w-6 text-right">{pct}%</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[12px] text-gold tracking-widest uppercase mb-1">Public Opinion</div>
              <div className="font-playfair text-[22px] font-bold text-richbrown italic">
                "The City's Favourite<br />Beauty Parlour"
              </div>
              <div className="text-[12px] text-richbrown-light mt-1">— Local Beauty Rankings 2024</div>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="bg-cream hover:bg-white border-[1.5px] border-transparent hover:border-gold/20 rounded-2xl p-7 transition-all">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-11 h-11 rounded-full ${r.color} flex items-center justify-center font-playfair text-[18px] font-bold text-white flex-shrink-0`}>
                    {r.init}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-richbrown">{r.name}</div>
                    <div className="text-[11px] text-richbrown-light">{r.tag}</div>
                  </div>
                </div>
                <div className="text-gold text-[12px] tracking-[2px] mb-3">{r.stars}</div>
                <p className="font-playfair text-[15px] italic text-richbrown leading-[1.7]">"{r.text}"</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
      <Footer mini navigate={navigate} />
    </div>
  );
}