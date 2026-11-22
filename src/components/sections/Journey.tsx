import { journey } from "@/data/profile";
import { Section, Serif } from "../Section";

export function Journey() {
  return (
    <Section
      id="journey"
      index="04"
      eyebrow="History"
      title={
        <>
          The road <Serif>so far</Serif>.
        </>
      }
    >
      <ol className="relative ml-1.5 border-l border-line">
        {journey.map((step) => {
          const highlight = "highlight" in step && step.highlight;
          return (
            <li key={step.when + step.title} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span
                className={`absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-bg ${
                  highlight ? "pulse bg-accent" : "bg-subtle"
                }`}
                aria-hidden
              />
              <p
                className={`font-mono text-xs uppercase tracking-[0.16em] ${
                  highlight ? "text-accent" : "text-subtle"
                }`}
              >
                {step.when}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{step.title}</h3>
              <p className="mt-1 text-[15px] text-muted">{step.note}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
