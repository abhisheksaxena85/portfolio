import Image from "next/image";
import type { ReactNode } from "react";
import { featuredProjects, otherProjects, profile, type Project } from "@/data/profile";
import { Apple, ArrowUpRight, GitHub, Globe, GooglePlay } from "../icons";
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
      <div className="flex flex-col gap-6">
        {featuredProjects.map((p, i) => (
          <FeaturedProject key={p.name} project={p} reverse={i % 2 === 1} />
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

function FeaturedProject({ project: p, reverse }: { project: Project; reverse: boolean }) {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-line bg-surface md:grid-cols-2">
      <div className={`flex flex-col p-6 sm:p-8 ${reverse ? "md:order-2" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {p.icon && (
              <Image
                src={p.icon}
                alt={`${p.name} app icon`}
                width={56}
                height={56}
                className="size-14 rounded-2xl border border-line"
              />
            )}
            <div>
              <h3 className="font-serif text-4xl leading-none tracking-tight sm:text-[2.75rem]">
                {p.name}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-muted">{p.kind}</p>
            </div>
          </div>
          {p.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
              <span className="pulse size-1.5 rounded-full bg-accent" aria-hidden />
              {p.status}
            </span>
          )}
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-muted">{p.description}</p>

        {p.highlights && (
          <>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              What I built
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-muted">
                  <span className="text-accent" aria-hidden>
                    →
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {p.links && (
          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {p.links.appStore && (
              <StoreLink href={p.links.appStore} icon={<Apple />} label="App Store" />
            )}
            {p.links.playStore && (
              <StoreLink href={p.links.playStore} icon={<GooglePlay />} label="Google Play" />
            )}
            {p.links.website && (
              <StoreLink href={p.links.website} icon={<Globe />} label="Website" subtle />
            )}
          </div>
        )}
        {p.credit && <p className="mt-4 text-xs text-subtle">{p.credit}</p>}
      </div>

      {p.screenshots && p.screenshots.length > 0 && (
        <div
          className={`relative flex items-center justify-center gap-3 overflow-hidden bg-accent-soft px-5 py-10 sm:gap-4 sm:px-8 ${
            reverse ? "md:order-1" : ""
          }`}
        >
          <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
          {p.screenshots.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`${p.name} screenshot ${idx + 1}`}
              width={460}
              height={998}
              sizes="(min-width: 768px) 180px, 31vw"
              className={`relative w-[31%] max-w-[180px] rounded-2xl border border-line shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)] ${
                idx === 1 ? "-translate-y-4" : "translate-y-4"
              }`}
            />
          ))}
        </div>
      )}
    </article>
  );
}

function StoreLink({
  href,
  icon,
  label,
  subtle = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  subtle?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        subtle
          ? "border border-line text-muted hover:border-fg/30 hover:text-fg"
          : "bg-fg text-bg hover:opacity-85"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
