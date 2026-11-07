"use client";

import { useEffect, useRef, useState } from "react";

type Step = { title: string; body: string };

/** The one real sequence on the page. The line draws and the markers fill in once, when it scrolls into view. */
export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className={`relative grid gap-10 lg:grid-cols-4 lg:gap-8 ${on ? "tl-on" : ""}`}>
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-[11px] hidden h-px bg-rule lg:block"
      />
      <span
        aria-hidden="true"
        className="tl-line absolute left-0 right-0 top-[11px] hidden h-px bg-ink lg:block"
      />
      {steps.map((s, i) => (
        <li key={s.title} className="relative lg:pt-10">
          <span
            aria-hidden="true"
            style={{ "--i": i } as React.CSSProperties}
            className="tl-dot absolute left-0 top-0 hidden h-[23px] w-[23px] rounded-full border-2 border-ink lg:block"
          />
          <p className="ui text-sm font-medium text-muted">Step {i + 1}</p>
          <h3 className="mt-1 text-xl text-ink">{s.title}</h3>
          <p className="mt-3 text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
