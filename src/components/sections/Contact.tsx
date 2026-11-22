import { profile } from "@/data/profile";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "../icons";
import { Serif } from "../Section";

export function Contact() {
  return (
    <>
      <section id="contact" className="mx-auto max-w-5xl px-5 pt-12 pb-24 sm:px-8 sm:pb-32">
        <div className="rounded-[2rem] bg-fg px-6 py-14 text-bg sm:px-12 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] opacity-60">05 — Contact</p>
          <h2 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
            Have an app that needs to <Serif>ship</Serif>? Let&apos;s talk.
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 border-b border-bg/30 pb-1 text-lg transition-colors hover:border-bg sm:text-2xl"
          >
            <Mail className="size-5 sm:size-6" />
            {profile.email}
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bg/20 px-4 py-2 text-sm transition-colors hover:bg-bg/10"
            >
              <LinkedIn /> LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bg/20 px-4 py-2 text-sm transition-colors hover:bg-bg/10"
            >
              <GitHub /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {profile.name}
          </p>
          <p>{profile.location}</p>
        </div>
      </footer>
    </>
  );
}
