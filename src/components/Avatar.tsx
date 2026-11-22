import Image from "next/image";

// Round profile picture with an initials fallback when no photo is configured.
export function Avatar({
  name,
  photo,
  size,
  className = "",
  priority = false,
  decorative = false,
}: {
  name: string;
  photo?: string | null;
  size: number;
  className?: string;
  priority?: boolean;
  // true when the name is already shown next to the avatar.
  decorative?: boolean;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={decorative ? "" : name}
        width={size}
        height={size}
        priority={priority}
        className={`shrink-0 rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <span
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": name })}
      className={`grid shrink-0 place-items-center rounded-full bg-accent-soft font-mono font-semibold text-accent ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.36)) }}
    >
      {initials}
    </span>
  );
}
