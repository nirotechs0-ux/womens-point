interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[11px] tracking-[2.5px] uppercase text-gold font-medium mb-3.5">
      <span className="h-[1.5px] bg-gold inline-block" />
      {text}
    </div>
  );
}