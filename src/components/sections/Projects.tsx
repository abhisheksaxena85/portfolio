import { featuredProjects, otherProjects, profile } from "@/data/profile";
import { ArrowUpRight, GitHub } from "../icons";
import { Section, Serif, Tag } from "../Section";

export function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Projects"
      title={
        <>
          Products in people&apos;s hands, and <Serif>experiments</Serif> on the side.
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <article
            key={p.name}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-subtle">0{i + 1}</span>
              {p.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  {p.status}
                </span>
              )}
            </div>

            <h3 className="mt-10 font-serif text-5xl leading-none tracking-tight sm:text-6xl">
              {p.name}
            </h3>
            <p className="mt-3 text-sm font-medium text-fg">{p.kind}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.description}</p>

            {p.highlights && (
              <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-6">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted">
                    <span className="text-accent" aria-hidden>
                      →
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={`Open ${p.name}`}
              />
            )}
          </article>
        ))}
      </div>

      <div className="mt-16 flex items-end justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">More on GitHub</h3>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <GitHub /> All repositories <ArrowUpRight />
        </a>
      </div>

      <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
        {otherProjects.map((p) => (
          <li key={p.name} className="bg-bg">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold tracking-tight">{p.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    {p.kind}
                  </p>
                </div>
                <ArrowUpRight className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </div>
              <p className="text-sm leading-relaxed text-muted">{p.description}</p>
              <p className="mt-auto pt-1 text-xs text-subtle">{p.tags.join(" · ")}</p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
