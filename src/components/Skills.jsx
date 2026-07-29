import { useInView } from "../hooks/useInView";
import { skills } from "../data/skills";

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-label inline-block">Skills</div>
          <h2 className="section-title">
            My <span className="text-cream-full" style={{ opacity: 0.9 }}>technical</span> toolkit
          </h2>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {skills.map((group, gi) => (
            <div
              key={group.category}
              className="card p-7"
              style={{ opacity: inView ? 1 : 0, transition: `all 0.5s ease ${gi * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="font-display font-bold text-[15px] text-cream-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cream opacity-70" />
                  {group.category}
                </div>
                {group.level && (
                  <span className="text-[10px] font-mono text-cream-dim opacity-50 tracking-wide">{group.level}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg text-cream-dim opacity-75"
                    style={{ background: "var(--ink-700)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
