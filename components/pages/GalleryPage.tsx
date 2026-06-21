// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import PageHero from "../shared/Pagehero";
// import Footer from "../Footer";

// type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

// interface GalleryPageProps {
//   navigate: (p: Page) => void;
// }

// const IMG = {
//   bridal1: "https://i.pinimg.com/1200x/04/8c/87/048c879d37a97c05da8e38a8d9a9a633.jpg",
//   bridal2: "/bridal2.jpeg",
//   bridal3: "/bridal3.jpeg",
//   bridal4: "/bridal4.jpeg",
//   hair1: "https://i.pinimg.com/736x/e9/89/2b/e9892bf1ca5ee8cb5ba32cfc6ab6b92d.jpg",
//   hair2: "https://i.pinimg.com/736x/ec/85/7a/ec857a2fd80c2c9cd8e5d1a8e0fb1564.jpg",
//   nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
//   skin: "https://i.pinimg.com/736x/11/5d/11/115d11881fbc906b32ed5ff7470c67be.jpg",
//   makeup1: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80",
//   gallery1: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80",
//   gallery2: "https://i.pinimg.com/1200x/a1/d3/4e/a1d34eb84163aa11ff5e357a6c42ee04.jpg",
//   gallery3: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
//   gallery4: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
//   gallery5: "https://i.pinimg.com/736x/40/fa/1a/40fa1ac804eb419b44a0e8c08d39d6c1.jpg",
//   gallery6: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
// };

// const tabs = ["All", "Bridal", "Hair", "Nails", "Skin", "Makeup"];

// const images = [
//   { src: IMG.bridal1, cat: "Bridal", label: "Bridal HD Makeup" },
//   { src: IMG.bridal2, cat: "Bridal", label: "Bridal HD Makeup" },
//   { src: IMG.bridal3, cat: "Bridal", label: "Bridal HD Makeup" },
//   { src: IMG.bridal4, cat: "Bridal", label: "Bridal HD Makeup" },
//   { src: IMG.hair1, cat: "Hair", label: "Hair Styling" },
//   { src: IMG.nails, cat: "Nails", label: "Nail Art" },
//   { src: IMG.skin, cat: "Skin", label: "Skin Glow" },
//   { src: IMG.gallery1, cat: "Makeup", label: "Party Makeup" },
//   { src: IMG.gallery2, cat: "Bridal", label: "Reception Look" },
//   { src: IMG.gallery3, cat: "Skin", label: "Facial Treatment" },
//   { src: IMG.gallery4, cat: "Makeup", label: "Bridal Glam" },
//   { src: IMG.gallery5, cat: "Hair", label: "Color Treatment" },
//   { src: IMG.gallery6, cat: "Nails", label: "Gel Extension" },
//   { src: IMG.hair2, cat: "Hair", label: "Blow Dry Styling" },
//   { src: IMG.makeup1, cat: "Makeup", label: "Eye Makeup" },
// ];

// export default function GalleryPage({ navigate }: GalleryPageProps) {
//   const [filter, setFilter] = useState("All");
//   const filtered = filter === "All" ? images : images.filter((i) => i.cat === filter);

//   return (
//     <div>
//       <PageHero
//         title={<>Our <em className="italic text-gold">Gallery</em></>}
//         sub="A glimpse into the transformations we've created. Every look tells a story."
//         page="Gallery"
//       />
//       <section className="py-[60px] px-[5%]">
//         <div className="flex gap-2 flex-wrap mb-10 justify-center">
//           {tabs.map((t) => (
//             <button
//               key={t}
//               onClick={() => setFilter(t)}
//               className={`text-[13px] px-5 py-2 rounded-full border-[1.5px] transition-all ${
//                 filter === t
//                   ? "border-gold text-gold bg-cream"
//                   : "border-transparent bg-cream text-richbrown-mid hover:border-gold/50"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//         <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <AnimatePresence>
//             {filtered.map((img, i) => (
//               <motion.div
//                 key={img.src}
//                 layout
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ delay: i * 0.04 }}
//                 className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
//               >
//                 <img
//                   src={img.src}
//                   alt={img.label}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-richbrown/0 group-hover:bg-richbrown/40 transition-all duration-300 flex items-end p-4">
//                   <span className="text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
//                     {img.label}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </section>
//       <Footer mini navigate={navigate} />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import PageHero from "../shared/Pagehero";
import Footer from "../Footer";
import AddPhotoModal from "../shared/AddPhotoModal";

type Page = "home" | "services" | "bridal" | "gallery" | "reviews" | "contact";

interface GalleryPageProps {
  navigate: (p: Page) => void;
}

const IMG = {
  bridal1: "https://i.pinimg.com/1200x/04/8c/87/048c879d37a97c05da8e38a8d9a9a633.jpg",
  bridal2: "/bridal2.jpeg",
  bridal3: "/bridal3.jpeg",
  bridal4: "/bridal4.jpeg",
  hair1: "https://i.pinimg.com/736x/e9/89/2b/e9892bf1ca5ee8cb5ba32cfc6ab6b92d.jpg",
  hair2: "https://i.pinimg.com/736x/ec/85/7a/ec857a2fd80c2c9cd8e5d1a8e0fb1564.jpg",
  nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  skin: "https://i.pinimg.com/736x/11/5d/11/115d11881fbc906b32ed5ff7470c67be.jpg",
  makeup1: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80",
  gallery1: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80",
  gallery2: "https://i.pinimg.com/1200x/a1/d3/4e/a1d34eb84163aa11ff5e357a6c42ee04.jpg",
  gallery3: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
  gallery4: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
  gallery5: "https://i.pinimg.com/736x/40/fa/1a/40fa1ac804eb419b44a0e8c08d39d6c1.jpg",
  gallery6: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
};

const tabs = ["All", "Bridal", "Hair", "Nails", "Skin", "Makeup"];

const images = [
  { src: IMG.bridal1, cat: "Bridal", label: "Bridal HD Makeup" },
  { src: IMG.bridal2, cat: "Bridal", label: "Bridal HD Makeup" },
  { src: IMG.bridal3, cat: "Bridal", label: "Bridal HD Makeup" },
  { src: IMG.bridal4, cat: "Bridal", label: "Bridal HD Makeup" },
  { src: IMG.hair1, cat: "Hair", label: "Hair Styling" },
  { src: IMG.nails, cat: "Nails", label: "Nail Art" },
  { src: IMG.skin, cat: "Skin", label: "Skin Glow" },
  { src: IMG.gallery1, cat: "Makeup", label: "Party Makeup" },
  { src: IMG.gallery2, cat: "Bridal", label: "Reception Look" },
  { src: IMG.gallery3, cat: "Skin", label: "Facial Treatment" },
  { src: IMG.gallery4, cat: "Makeup", label: "Bridal Glam" },
  { src: IMG.gallery5, cat: "Hair", label: "Color Treatment" },
  { src: IMG.gallery6, cat: "Nails", label: "Gel Extension" },
  { src: IMG.hair2, cat: "Hair", label: "Blow Dry Styling" },
  { src: IMG.makeup1, cat: "Makeup", label: "Eye Makeup" },
];

export default function GalleryPage({ navigate }: GalleryPageProps) {
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [extraImages, setExtraImages] = useState<typeof images>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data.photos)) {
          setExtraImages(
            data.photos.map((p: { src: string; cat: string; label: string }) => ({
              src: p.src,
              cat: p.cat,
              label: p.label,
            }))
          );
        }
      })
      .catch(() => {
        // Silently fall back to the default photos if the request fails.
      });
    return () => {
      active = false;
    };
  }, []);

  // Community-added photos appear first, newest on top.
  const allImages = [...extraImages, ...images];
  const filtered = filter === "All" ? allImages : allImages.filter((i) => i.cat === filter);

  return (
    <div>
      <PageHero
        title={<>Our <em className="italic text-gold">Gallery</em></>}
        sub="A glimpse into the transformations we've created. Every look tells a story."
        page="Gallery"
      />
      <section className="py-[60px] px-[5%]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-[13px] px-5 py-2 rounded-full border-[1.5px] transition-all ${
                  filter === t
                    ? "border-gold text-gold bg-cream"
                    : "border-transparent bg-cream text-richbrown-mid hover:border-gold/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 text-[13px] px-5 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white transition-colors flex-shrink-0"
          >
            <Plus size={16} /> Add a Photo
          </button>
        </div>
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-richbrown/0 group-hover:bg-richbrown/40 transition-all duration-300 flex items-end p-4">
                  <span className="text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      <Footer mini navigate={navigate} />
      <AddPhotoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={(photo) => setExtraImages((prev) => [photo, ...prev])}
      />
    </div>
  );
}