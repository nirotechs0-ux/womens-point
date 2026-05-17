type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface FooterProps {
  mini?: boolean;
  navigate: (p: Page) => void;
}

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
              {["ig", "fb", "wa", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[12px] font-semibold text-white/40 hover:border-gold hover:text-gold transition-all"
                >
                  {s}
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
                { l: "+91 XXXXX XXXXX", p: "" },
                { l: "info@womenspoint.com", p: "" },
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