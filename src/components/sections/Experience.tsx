import { experience } from "@/data/profile";
import { Section, Serif, Tag } from "../Section";

export function Experience() {
  return (
    <Section
      id="experience"
      index="01"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve been <Serif>shipping</Serif>.
        </>
      }
    >
      <ol className="flex flex-col gap-5">
        {experience.map((role) => (
          <li
            key={role.company}
            className={`rounded-3xl border p-6 sm:p-8 ${
              role.featured
                ? "border-accent/40 bg-surface shadow-[0_1px_0_0_var(--line),0_20px_50px_-30px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
                : "border-line"
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{role.company}</h3>
                  {role.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-bg">
                      <span aria-hidden>★</span> {role.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-muted">{role.title}</p>
              </div>
              <p className="shrink-0 font-mono text-xs text-subtle sm:pt-2">
                {role.period} · {role.type}
              </p>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {role.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
