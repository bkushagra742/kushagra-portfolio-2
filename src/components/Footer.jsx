import { NAV_LINKS } from "./Nav";
import { profile } from "../data/profile";
import { socials } from "../data/socials";

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const featured = socials.filter((s) => s.url).slice(0, 6);

  return (
    <footer style={{ background: "var(--ink-900)", borderTop: "1px solid rgba(255,255,255,0.07)" }} className="pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="font-display font-extrabold text-[22px] mb-3.5">
              <span className="text-cream-dim">K</span>ushagra<span className="text-cream-dim">.</span>
            </div>
            <p className="text-cream-dim opacity-60 text-sm leading-[1.7] max-w-[300px] mb-5">
              "{profile.tagline}"
            </p>
            <div className="flex gap-2 flex-wrap">
              {featured.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono px-3 py-1.5 rounded-lg text-cream-dim opacity-60 hover:opacity-100"
                  style={{ background: "var(--ink-700)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display font-bold text-[13px] text-cream-full mb-4 tracking-wide uppercase opacity-80">
              Quick Links
            </div>
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block bg-transparent border-none text-cream-dim opacity-60 text-sm cursor-pointer py-1 text-left hover:opacity-100"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div>
            <div className="font-display font-bold text-[13px] text-cream-full mb-4 tracking-wide uppercase opacity-80">
              Contact
            </div>
            <div className="text-sm text-cream-dim opacity-60 leading-[2]">
              <div>{profile.email}</div>
              <div>{profile.location}</div>
              <div className="mt-3 text-xs" style={{ color: "var(--cream-dim)" }}>
                🟢 {profile.availability}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-between items-center flex-wrap gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-[13px] text-cream-dim opacity-50">© 2026 Kushagra Nexus. All rights reserved.</span>
          <span className="font-mono text-[11px] text-cream-dim opacity-40">v2.0.0 · React + Vite</span>
        </div>
      </div>
    </footer>
  );
}
