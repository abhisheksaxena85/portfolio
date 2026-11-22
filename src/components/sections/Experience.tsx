import Image from "next/image";
import { experience } from "@/data/profile";
import { Avatar } from "../Avatar";
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
                : "border-line bg-surface"
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {role.logo ? (
                      <>
                        <span className="sr-only">{role.company}</span>
                        <Image
                          src={role.logo.src}
                          alt=""
                          width={role.logo.width}
                          height={role.logo.height}
                          className="h-6 w-auto sm:h-7"
                        />
                      </>
                    ) : (
                      role.company
                    )}
                  </h3>
                  {role.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-bg">
                      <span aria-hidden>★</span> {role.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-muted">{role.title}</p>
              </div>
              <p className="shrink-0 font-mono text-xs text-subtle sm:pt-2">
                {role.period} · {role.type}
              </p>
            </div>

            {role.points.length > 1 ? (
              <ul className="mt-6 flex flex-col gap-3">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
                {role.points[0]}
              </p>
            )}

            {role.tags && role.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {role.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}

            {role.founders && role.founders.length > 0 && (
              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:gap-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  Founders
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {role.founders.map((f) => (
                    <li key={f.linkedin}>
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5"
                      >
                        <Avatar name={f.name} photo={f.photo} size={32} decorative />
                        <span className="leading-tight">
                          <span className="block text-sm font-medium transition-colors group-hover:text-accent">
                            {f.name}
                          </span>
                          <span className="block text-xs text-subtle">{f.role}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
