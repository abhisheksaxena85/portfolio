import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#journey", label: "Journey" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid size-8 place-items-center rounded-full bg-fg font-mono text-[11px] font-semibold tracking-tight text-bg">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-medium sm:inline">{profile.name}</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
