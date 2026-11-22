import { stack } from "@/data/profile";
import { Section, Serif, Tag } from "../Section";

export function Stack() {
  return (
    <Section
      id="stack"
      index="03"
      eyebrow="Technologies"
      title={
        <>
          Flutter at the core, <Serif>full stack</Serif> around it.
        </>
      }
    >
      <div className="divide-y divide-line border-y border-line">
        {stack.map((s) => (
          <div key={s.group} className="grid gap-4 py-8 sm:grid-cols-[180px_1fr] sm:gap-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle sm:pt-1.5">
              {s.group}
            </h3>
            <div className="flex flex-wrap gap-2">
              {s.core.map((t) => (
                <Tag key={t} strong>
                  {t}
                </Tag>
              ))}
              {s.items.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
