import { useTypingEffect } from "../hooks/useTypingEffect";
import { useClock } from "../hooks/useClock";
import { profile } from "../data/profile";
import profileImg from "../assets/images/profile.png";

const FLOATING_ICONS = [
  { icon: "⚛️", x: "10%", y: "20%", size: 34, delay: 0 },
  { icon: "🐍", x: "88%", y: "16%", size: 30, delay: 0.8 },
  { icon: "⚡", x: "5%", y: "62%", size: 26, delay: 1.4 },
  { icon: "🎨", x: "92%", y: "58%", size: 28, delay: 0.4 },
  { icon: "☁️", x: "78%", y: "82%", size: 24, delay: 1.0 },
  { icon: "🤖", x: "18%", y: "82%", size: 24, delay: 0.6 },
];

export default function Hero() {
  const typed = useTypingEffect(profile.roles);
  const clock = useClock();
  const timeStr = clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = clock.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(237,232,222,0.06), transparent)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {FLOATING_ICONS.map((fi, i) => (
        <div
          key={i}
          className="absolute select-none float"
          style={{
            left: fi.x,
            top: fi.y,
            fontSize: fi.size,
            animationDelay: `${fi.delay}s`,
            animationDuration: `${3.5 + i * 0.4}s`,
            opacity: 0.35,
            filter: "grayscale(1)",
          }}
        >
          {fi.icon}
        </div>
      ))}

      <div className="container relative z-10 pt-20">
        <div className="grid md:grid-cols-[1fr_auto] gap-14 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-8"
              style={{ background: "rgba(237,232,222,0.06)", border: "1px solid rgba(237,232,222,0.15)" }}
            >
              <div className="w-[7px] h-[7px] rounded-full bg-cream animate-pulse2" />
              <span className="font-mono text-xs text-cream-dim">
                {dateStr} · {timeStr}
              </span>
            </div>

            <div className="font-mono text-[13px] text-cream-dim mb-3 tracking-widest">
              Hello, World! 👋
            </div>

            <h1
              className="font-display font-extrabold leading-[1.0] mb-4"
              style={{ fontSize: "clamp(42px, 7vw, 82px)", letterSpacing: "-1px" }}
            >
              I'm <span style={{ color: "var(--cream)" }}>{profile.displayName}</span>
            </h1>

            <div className="h-11 mb-6 flex items-center">
              <span
                className="font-display font-semibold text-cream-dim"
                style={{ fontSize: "clamp(18px,3vw,26px)" }}
              >
                {typed}
                <span className="animate-blink text-cream-full">|</span>
              </span>
            </div>

            <p className="text-[15px] text-cream-dim max-w-[520px] leading-[1.75] mb-10 opacity-80">
              {profile.bio[0]}
            </p>

            <div className="flex gap-3.5 flex-wrap mb-14">
              <button
                className="btn-primary"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects →
              </button>
              <a href="/resume.png" download className="btn-outline inline-block text-center">
                Download Resume
              </a>
              <button
                className="btn-outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me
              </button>
            </div>

            <div className="flex gap-10 flex-wrap">
              {[
                { n: "7", l: "Projects Shipped" },
                { n: "Android", l: "+ Web Dev" },
                { n: "Open", l: "For Freelance" },
                { n: "2029", l: "Grad Year" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display font-extrabold text-2xl text-cream-full">{s.n}</div>
                  <div className="text-xs text-cream-dim tracking-wide opacity-70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div
              className="w-[260px] h-[260px] rounded-[28px] overflow-hidden mx-auto animate-glowPulse"
              style={{ border: "1px solid rgba(237,232,222,0.2)" }}
            >
              <img src={profileImg} alt={profile.fullName} className="w-full h-full object-cover grayscale" />
            </div>

            <div
              className="mt-5 rounded-xl p-4 text-left max-w-[260px] mx-auto"
              style={{ background: "var(--ink-800)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="font-mono text-[11px] leading-[1.7]">
                <span style={{ color: "#9CA3AF" }}>const</span>{" "}
                <span className="text-cream-full">dev</span>{" "}
                <span className="text-cream-dim">= {"{"}</span>
                <br />
                <span className="text-cream-dim opacity-60">&nbsp;&nbsp;name: </span>
                <span style={{ color: "#B8B2A6" }}>"Kushagra"</span>
                <span className="text-cream-dim opacity-60">,</span>
                <br />
                <span className="text-cream-dim opacity-60">&nbsp;&nbsp;role: </span>
                <span style={{ color: "#B8B2A6" }}>"Builder"</span>
                <span className="text-cream-dim opacity-60">,</span>
                <br />
                <span className="text-cream-dim opacity-60">&nbsp;&nbsp;available: </span>
                <span className="text-cream-full">true</span>
                <br />
                <span className="text-cream-dim opacity-60">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
