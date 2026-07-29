import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { profile } from "../data/profile";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [ref, inView] = useInView();

  const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      // Wire this up to your own form backend (e.g. Formspree, a Netlify
      // Function, or EmailJS). Placeholder call shown below.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--ink-700)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "12px 16px",
    color: "var(--cream)",
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="section"
      ref={ref}
      style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(237,232,222,0.04), transparent)" }}
    >
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-label inline-block">Contact</div>
          <h2 className="section-title">
            Let's build something <span className="text-cream-full" style={{ opacity: 0.9 }}>together</span>
          </h2>
          <p className="section-sub mx-auto">{profile.availability}.</p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-14 max-w-[960px] mx-auto">
          <div style={{ opacity: inView ? 1 : 0, transition: "all 0.7s" }}>
            <h3 className="font-display font-bold text-xl text-cream-full mb-5">Get in touch</h3>
            {[
              { label: "Email", value: profile.email },
              { label: "Phone", value: profile.phone },
              { label: "Location", value: profile.location },
              { label: "Status", value: profile.availability },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 mb-6 items-start">
                <div>
                  <div className="text-[11px] text-cream-dim opacity-50 tracking-wider mb-0.5 uppercase">{c.label}</div>
                  <div className="text-sm text-cream-full opacity-85 font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ opacity: inView ? 1 : 0, transition: "all 0.7s 0.2s" }}>
            {status === "sent" ? (
              <div className="text-center py-14 px-5">
                <h3 className="font-display font-bold text-2xl text-cream-full mb-3">Message sent!</h3>
                <p className="text-cream-dim opacity-70">Thanks, {form.name}. I'll get back to you soon.</p>
                <button
                  className="btn-primary mt-6"
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <div className="card p-9">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-cream-dim opacity-60 block mb-1.5">Name *</label>
                    <input style={inputStyle} placeholder="Your name" value={form.name} onChange={handleChange("name")} />
                  </div>
                  <div>
                    <label className="text-xs text-cream-dim opacity-60 block mb-1.5">Email *</label>
                    <input style={inputStyle} placeholder="your@email.com" type="email" value={form.email} onChange={handleChange("email")} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs text-cream-dim opacity-60 block mb-1.5">Subject</label>
                  <input style={inputStyle} placeholder="What's this about?" value={form.subject} onChange={handleChange("subject")} />
                </div>
                <div className="mb-6">
                  <label className="text-xs text-cream-dim opacity-60 block mb-1.5">Message *</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 130, resize: "vertical" }}
                    placeholder="Tell me about your project or idea..."
                    value={form.message}
                    onChange={handleChange("message")}
                  />
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-300 mb-3">
                    Something went wrong sending your message — try emailing {profile.email} directly.
                  </p>
                )}
                <button className="btn-primary w-full" style={{ opacity: status === "sending" ? 0.7 : 1 }} onClick={handleSubmit} disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
