import type { ReactNode } from "react";
import { experience, featuredProjects, profile, stats } from "@/data/profile";
import { ArrowDown, GitHub, LinkedIn, Mail } from "../icons";
import { Serif } from "../Section";

export function Hero() {
  const current = experience.find((r) => r.featured) ?? experience[0];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto max-w-5xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted">
          <span className="pulse size-2 rounded-full bg-accent" aria-hidden />
          {current.title} at <span className="font-medium text-fg">{current.company}</span>
        </p>

        <h1
          className="rise mt-8 max-w-4xl text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          I build mobile apps that make it <Serif>all the way</Serif> to the store.
        </h1>

        <p
          className="rise mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Hi, I&apos;m <span className="text-fg">{profile.name}</span> — {profile.summary.charAt(0).toLowerCase()}
          {profile.summary.slice(1)}
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            See my work <ArrowDown />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg/30"
          >
            <Mail /> Get in touch
          </a>
          <div className="ml-1 flex items-center gap-1">
            <IconLink href={profile.links.github} label="GitHub">
              <GitHub />
            </IconLink>
            <IconLink href={profile.links.linkedin} label="LinkedIn">
              <LinkedIn />
            </IconLink>
          </div>
        </div>

        {/* Spotlight: the one thing a skimming recruiter should not miss. */}
        <div
          className="rise mt-16 grid gap-6 rounded-3xl border border-line bg-surface p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
          style={{ animationDelay: "320ms" }}
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Currently
            </p>
            <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
              Engineering at {current.company} with a team of{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">ex-Microsoft engineers</span>
                <span
                  className="absolute inset-x-0 bottom-0.5 -z-0 h-2.5 rounded-sm bg-accent/25"
                  aria-hidden
                />
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Leading Flutter development on two enterprise products, both released to the App Store
              and Google Play.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
            {featuredProjects.map((p) => (
              <li key={p.name}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                >
                  {p.name}
                  <span className="text-xs font-normal opacity-70">{p.kind.split(" · ")[0]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl
          className="rise mt-6 grid grid-cols-2 overflow-hidden rounded-3xl border border-line md:grid-cols-4"
          style={{ animationDelay: "400ms" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 bg-surface p-5 sm:p-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="order-2 text-xs text-muted sm:text-sm">{s.label}</dt>
              <dd className="order-1 text-xl font-semibold tracking-tight sm:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {children}
    </a>
  );
}
