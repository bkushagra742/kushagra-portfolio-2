import { useEffect, useState } from "react";
import Nav, { NAV_LINKS } from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Socials from "./components/Socials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import Kanuu from "./components/Kanuu";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [kanuuOpen, setKanuuOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActiveSection(en.target.id);
        });
      },
      { threshold: 0.4 }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("keydown", handleKey);
      obs.disconnect();
    };
  }, []);

  return (
    <div style={{ background: "var(--ink-950)", minHeight: "100vh" }}>
      <Nav active={activeSection} setActive={setActiveSection} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Socials />
      <Contact />
      <Footer />

      <Kanuu open={kanuuOpen} onOpen={() => setKanuuOpen(true)} onClose={() => setKanuuOpen(false)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onOpenKanuu={() => setKanuuOpen(true)} />
    </div>
  );
}
