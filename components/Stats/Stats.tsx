import Reveal from "@/components/Reveal/Reveal";

type StatItem = {
  value: string;
  label: string;
};

type StatsProps = {
  items: StatItem[];
};

export default function Stats({ items }: StatsProps) {
  return (
    <ul className="divide-y divide-black/10">
      {items.map((item, index) => (
        <Reveal key={item.label} delay={index * 0.08} as="li">
          <div className="grid grid-cols-[40%_60%] items-center gap-4 py-6 md:py-8">
            <span className="text-[clamp(3.125rem,5vw,6.65rem)] font-medium leading-none text-[var(--color-secondary)]">
              {item.value}
            </span>
            <span className="pl-6 text-[clamp(1.5rem,2.4vw,1.995rem)] font-medium leading-snug text-[var(--color-secondary)] md:pl-10">
              {item.label}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
