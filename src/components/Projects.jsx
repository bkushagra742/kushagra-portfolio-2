import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { projects, projectCategories } from "../data/projects";
import { projectHasMedia } from "../hooks/useProjectMedia";
import ProjectModal from "./ProjectModal";

const STATUS_STYLE = {
  "In Progress": { text: "#C9C2B4", bg: "rgba(201,194,180,0.08)", border: "rgba(201,194,180,0.25)" },
  Completed: { text: "#B8B2A6", bg: "rgba(184,178,166,0.08)", border: "rgba(184,178,166,0.25)" },
  Active: { text: "#A8A296", bg: "rgba(168,162,150,0.08)", border: "rgba(168,162,150,0.25)" },
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const [ref, inView] = useInView();

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section" ref={ref} style={{ background: "linear-gradient(to bottom, var(--ink-950), var(--ink-900))" }}>
      <div className="container">
        <div className="text-center mb-14" style={{ opacity: inView ? 1 : 0, transition: "all 0.7s" }}>
          <div className="section-label inline-block">Projects</div>
          <h2 className="section-title">
            Things I've <span className="text-cream-full" style={{ opacity: 0.9 }}>built</span>
          </h2>
          <p className="section-sub mx-auto">
            Real repositories, real builds — across web, Android, and open source. Click any card for media and details.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-11">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="px-4 py-1.5 rounded-full text-[13px] font-medium transition-all"
              style={{
                background: filter === c ? "rgba(237,232,222,0.1)" : "transparent",
                border: filter === c ? "1px solid rgba(237,232,222,0.35)" : "1px solid rgba(255,255,255,0.08)",
                color: filter === c ? "var(--cream)" : "rgba(237,232,222,0.5)",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
          {filtered.map((p, i) => {
            const st = STATUS_STYLE[p.status] || STATUS_STYLE.Active;
            return (
              <div
                key={p.slug}
                className="card p-7 cursor-pointer"
                style={{ opacity: inView ? 1 : 0, transition: `all 0.5s ease ${i * 0.08}s` }}
                onClick={() => setActive(p)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="font-mono text-[11px] text-cream-dim opacity-40">{p.subtitle}</div>
                  <span
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full"
                    style={{ color: st.text, background: st.bg, border: `1px solid ${st.border}` }}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-cream-full mb-2.5">{p.name}</h3>
                <p className="text-[13px] text-cream-dim opacity-65 leading-[1.65] mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] font-mono text-cream-dim opacity-60 px-2.5 py-1 rounded-md" style={{ background: "var(--ink-700)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2.5 items-center">
                  <span className="btn-primary text-[12px] py-2 px-4 flex-1 text-center">Details</span>
                  {projectHasMedia(p.slug) && (
                    <span className="text-[11px] font-mono text-cream-dim opacity-50">📎 media</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
