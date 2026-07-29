import { useInView } from "../hooks/useInView";
import { profile } from "../data/profile";

const TIMELINE = [
  { year: "2029", event: `Expected graduation — ${profile.education.degree}, ${profile.education.field}`, icon: "🎓" },
  { year: "2026", event: "Began freelance software development — client web & Android work", icon: "💼" },
  { year: "—", event: "Enrolled at Mahakal Institute of Technology and Management, Ujjain", icon: "📘" },
  { year: "—", event: "Building across full stack web, Android, and AI-powered tools", icon: "🚀" },
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              transition: "all 0.7s ease",
            }}
          >
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              Turning curiosity into <span className="text-cream-full" style={{ opacity: 0.9 }}>craft</span>
            </h2>
            {profile.bio.map((p, i) => (
              <p key={i} className="text-cream-dim leading-[1.8] mb-5 opacity-75">
                {p}
              </p>
            ))}

            <div className="mt-6">
              <div className="font-display font-semibold text-sm text-cream-full mb-3 opacity-80">
                Current Focus
              </div>
              <div className="flex flex-wrap gap-2.5">
                {profile.education.currentFocus.map((f, i) => (
                  <span key={i} className="tag">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            <div className="font-display font-semibold text-lg mb-7 text-cream-full">Education & Journey</div>

            <div className="card p-6 mb-8">
              <div className="font-display font-bold text-base text-cream-full mb-1">
                {profile.education.degree}
              </div>
              <div className="text-sm text-cream-dim opacity-75 mb-1">{profile.education.field}</div>
              <div className="text-sm text-cream-dim opacity-60 mb-1">{profile.education.institution}</div>
              <div className="text-xs font-mono text-cream-dim opacity-50">
                {profile.education.location} · Expected {profile.education.expectedGraduation}
              </div>
            </div>

            <div className="relative pl-8">
              <div
                className="absolute left-[10px] top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, rgba(237,232,222,0.3), transparent)" }}
              />
              {TIMELINE.map((t, i) => (
                <div
                  key={i}
                  className="relative mb-7"
                  style={{ transition: `all 0.5s ease ${0.3 + i * 0.1}s`, opacity: inView ? 1 : 0 }}
                >
                  <div
                    className="absolute -left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                    style={{ background: "var(--ink-800)", border: "2px solid rgba(237,232,222,0.4)" }}
                  >
                    {t.icon}
                  </div>
                  <div className="font-mono text-[11px] text-cream-dim opacity-60 mb-1">{t.year}</div>
                  <div className="text-sm text-cream-dim opacity-80 leading-[1.5]">{t.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
