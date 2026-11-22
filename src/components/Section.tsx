import type { ReactNode } from "react";

export function Section({
  id,
  index,
  eyebrow,
  title,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mb-12 flex flex-col gap-3 sm:mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">
          <span className="text-accent">{index}</span> — {eyebrow}
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Tag({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={
        strong
          ? "rounded-full bg-fg px-3 py-1 text-xs font-medium text-bg"
          : "rounded-full border border-line px-3 py-1 text-xs text-muted"
      }
    >
      {children}
    </span>
  );
}

export function Serif({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic tracking-normal">{children}</em>;
}
