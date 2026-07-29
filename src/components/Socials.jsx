import { socials } from "../data/socials";

export default function Socials() {
  const linkable = socials.filter((s) => s.url);

  return (
    <section
      className="py-20"
      style={{ background: "var(--ink-900)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <div className="section-label inline-block">Connect</div>
          <h2 className="font-display font-bold text-[34px] text-cream-full">
            Find me <span style={{ opacity: 0.7 }}>everywhere</span>
          </h2>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))" }}>
          {linkable.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="no-underline">
              <div className="card p-5 text-center">
                <div className="font-display font-bold text-sm text-cream-full mb-1">{s.label}</div>
                <div className="text-[11px] font-mono text-cream-dim opacity-50">{s.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
