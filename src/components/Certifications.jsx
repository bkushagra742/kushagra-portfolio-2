import { useInView } from "../hooks/useInView";
import { certifications } from "../data/certifications";

export default function Certifications() {
  const [ref, inView] = useInView();

  return (
    <section id="certifications" className="section" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-label inline-block">Certifications</div>
          <h2 className="section-title">
            Credentials <span className="text-cream-full" style={{ opacity: 0.9 }}>in progress</span>
          </h2>
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {certifications.map((c, i) => (
            <div
              key={i}
              className="card p-6 flex gap-5 items-start"
              style={{ opacity: inView ? 1 : 0, transition: `all 0.5s ease ${i * 0.1}s` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-lg font-mono font-bold"
                style={{ background: "rgba(237,232,222,0.06)", border: "1px solid rgba(237,232,222,0.2)", color: "var(--cream-dim)" }}
              >
                {c.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-display font-bold text-[15px] text-cream-full mb-1">{c.name}</h3>
                <div className="text-xs text-cream-dim opacity-60 mb-2.5">{c.org}</div>
                <span
                  className="text-[11px] px-2.5 py-0.5 rounded-full"
                  style={{
                    background: c.status === "Completed" ? "rgba(237,232,222,0.1)" : "rgba(255,255,255,0.04)",
                    color: c.status === "Completed" ? "var(--cream)" : "var(--cream-dim)",
                    border: `1px solid ${c.status === "Completed" ? "rgba(237,232,222,0.3)" : "rgba(255,255,255,0.1)"}`,
                    opacity: c.status === "Completed" ? 1 : 0.7,
                  }}
                >
                  {c.status === "Completed" ? "✓ Completed" : "◐ In Progress"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
