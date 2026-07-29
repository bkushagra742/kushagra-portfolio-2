import { useInView } from "../hooks/useInView";
import { experience } from "../data/experience";

export default function Experience() {
  const [ref, inView] = useInView();

  return (
    <section
      id="experience"
      className="section"
      ref={ref}
      style={{ background: "linear-gradient(to bottom, var(--ink-900), var(--ink-950))" }}
    >
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-label inline-block">Experience</div>
          <h2 className="section-title">
            Where I've <span className="text-cream-full" style={{ opacity: 0.9 }}>worked & grown</span>
          </h2>
        </div>

        <div className="max-w-[720px] mx-auto relative">
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(237,232,222,0.3), transparent)" }}
          />
          {experience.map((e, i) => (
            <div
              key={i}
              className="pl-14 mb-9"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateX(-20px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div
                className="absolute left-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                style={{ background: "var(--cream-dim)", color: "#0A0A0A" }}
              >
                {i + 1}
              </div>
              <div className="card p-6">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-display font-bold text-[17px] text-cream-full">{e.role}</h3>
                    <div className="text-[13px] text-cream-dim opacity-70 font-medium mt-0.5">{e.org}</div>
                  </div>
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-[11px] font-mono text-cream-dim opacity-50">{e.period}</span>
                    <span
                      className="text-[11px] px-2.5 py-0.5 rounded-full"
                      style={{ background: "rgba(237,232,222,0.06)", color: "var(--cream-dim)", border: "1px solid rgba(237,232,222,0.2)" }}
                    >
                      {e.type}
                    </span>
                  </div>
                </div>
                <ul className="text-sm text-cream-dim opacity-70 leading-[1.7] list-disc pl-4 mt-3 space-y-1">
                  {e.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
