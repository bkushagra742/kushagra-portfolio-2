import { useEffect, useState } from "react";
import { profile } from "../data/profile";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="font-display font-bold text-xl text-cream-full"
        >
          <span className="text-cream-dim">K</span>ushagra
          <span className="text-cream-dim">.</span>
        </button>

        <div className="hidden md:flex gap-1 items-center">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              style={{ color: active === l.id ? "var(--cream)" : "rgba(237,232,222,0.5)" }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button className="btn-primary text-[13px] py-2 px-5" onClick={() => scrollTo("contact")}>
          Hire Me
        </button>
      </div>
    </nav>
  );
}
