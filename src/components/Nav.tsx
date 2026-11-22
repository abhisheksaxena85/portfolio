"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { Avatar } from "./Avatar";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
];

// Expanded profile panel height (px). The spacer below the fixed header uses
// NAV_H + PANEL_H so the page starts below the fully expanded header.
const NAV_H = 64;
const PANEL_H = 128;
// Scroll distance after a manual open before the panel tucks away again.
const REOPEN_SCROLL_TOLERANCE = 80;

export function Nav() {
  // Expanded at the top of the page; merges into the nav once you scroll.
  const [expanded, setExpanded] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  // scrollY at the moment the user opened the panel by clicking the avatar.
  const openedAt = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y <= 24) {
        openedAt.current = null;
        setExpanded(true);
      } else if (openedAt.current === null) {
        setExpanded(false);
      } else if (Math.abs(y - openedAt.current) > REOPEN_SCROLL_TOLERANCE) {
        openedAt.current = null;
        setExpanded(false);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.scrollY > 24) {
        openedAt.current = null;
        setExpanded(false);
      }
    };
    onScroll(); // sync with the restored scroll position on load
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function toggle() {
    const next = !expanded;
    openedAt.current = next ? window.scrollY : null;
    setExpanded(next);
  }

  const overlay = expanded && scrolled; // opened over page content

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 ${
          expanded ? "border-transparent bg-bg" : "border-line/70 bg-bg/85"
        } ${overlay ? "shadow-[0_24px_40px_-28px_rgba(0,0,0,0.35)]" : ""}`}
      >
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between px-5 sm:px-8"
          style={{ height: NAV_H }}
        >
          {/* Compact identity — visible once the panel has merged into the nav. */}
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="profile-panel"
            aria-label={`${profile.name} — show profile`}
            tabIndex={expanded ? -1 : 0}
            className={`flex items-center gap-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
              expanded ? "pointer-events-none -translate-y-1 opacity-0" : "opacity-100"
            }`}
          >
            <Avatar name={profile.name} photo={profile.photo} size={32} />
            <span className="hidden text-sm font-medium sm:inline">{profile.name}</span>
          </button>

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

        {/* Expanded profile panel. Animates height via grid rows (0fr ↔ 1fr). */}
        <div
          id="profile-panel"
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className="mx-auto flex max-w-5xl items-center gap-4 px-5 sm:gap-5 sm:px-8"
              style={{ height: PANEL_H }}
            >
              <button
                type="button"
                onClick={toggle}
                aria-expanded={expanded}
                aria-label={`${profile.name} — collapse profile`}
                tabIndex={expanded ? 0 : -1}
                className={`shrink-0 rounded-full ring-4 ring-accent-soft transition-all duration-300 motion-reduce:transition-none ${
                  expanded ? "scale-100 opacity-100" : "scale-50 opacity-0"
                } origin-top-left`}
              >
                <Avatar
                  name={profile.name}
                  photo={profile.photo}
                  size={80}
                  priority
                  className="size-16! sm:size-20!"
                />
              </button>
              <div
                className={`min-w-0 transition-all duration-300 motion-reduce:transition-none ${
                  expanded ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                <p className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                  {profile.name}
                </p>
                <p className="mt-1 text-sm text-muted sm:text-base">{profile.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Reserves room for the fixed header in its expanded state. */}
      <div aria-hidden style={{ height: NAV_H + PANEL_H }} />
    </>
  );
}
