interface PageHeroProps {
  title: React.ReactNode;
  sub: string;
  page: string;
}

export default function PageHero({ title, sub, page }: PageHeroProps) {
  return (
    <div className="bg-cream py-[80px] px-[5%] text-center relative overflow-hidden">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair text-[160px] font-bold text-gold/5 whitespace-nowrap pointer-events-none">
        {page}
      </span>
      <div className="flex items-center gap-2 justify-center mb-4 relative">
        <span className="text-[12px] text-richbrown-light">Home</span>
        <span className="text-[10px] text-richbrown-light">›</span>
        <span className="text-[12px] text-gold">{page}</span>
      </div>
      <h1 className="font-playfair text-[clamp(38px,5.5vw,64px)] font-bold text-richbrown relative">
        {title}
      </h1>
      <p className="text-[15px] text-richbrown-mid max-w-md mx-auto mt-4 leading-relaxed relative">
        {sub}
      </p>
    </div>
  );
}