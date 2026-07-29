# Kushagra Nexus

Personal developer portfolio for **Kushagra Singh Bisht** — React + Vite, monochrome/cream theme, with **Kanuu**, an AI assistant powered directly by Google AI Studio's Gemini API, answering from a real markdown knowledge base.

---

## 1. Project structure

```
kushagra-nexus/
├── public/
│   ├── favicon.png
│   └── resume.png                  # Uploaded resume image
├── src/
│   ├── assets/
│   │   ├── images/                 # profile.png, kanuu-avatar.png
│   │   └── projects/<slug>/        # Per-project media — see section 3
│   ├── components/                 # One component per section + Kanuu
│   ├── services/
│   │   ├── geminiClient.js         # Direct client-side Gemini calls
│   │   └── weatherClient.js        # Direct client-side OpenWeather calls
│   ├── data/
│   │   ├── knowledge/*.md          # Kanuu's real knowledge base — see section 5
│   │   ├── knowledgeLoader.js      # Auto-loads every file in knowledge/
│   │   └── profile.js, projects.js, skills.js, etc. — site content
│   ├── hooks/
│   ├── styles/global.css
│   ├── App.jsx
│   └── main.jsx
├── _legacy_server_mode/            # Hidden/secure integration, kept for later — see its README
├── .env                            # Your real keys (gitignored, not committed)
├── .env.example
└── package.json
```

## 2. Local setup

```bash
npm install
npm run dev
```

That's it — no serverless runtime needed. `.env` already has your keys
filled in for local testing (it's gitignored, so it never gets committed).

## 3. Adding project media (no code edits needed)

Each project has a folder at:
```
src/assets/projects/<slug>/
├── video/   ← demo clips or screen recordings (.mp4, .webm, .mov)
├── bts/     ← behind-the-scenes photos/clips
└── code/    ← code files linked as downloadable snippets
```

Slugs: `kushagra-website-v2`, `reconx-kushagra`, `art-of-coffee`,
`portfolio-website`, `python-toolkit`, `developer-handbook`, `github-profile`.

Drop files in — no imports, no renaming. Vite's `import.meta.glob`
(`src/hooks/useProjectMedia.js`) auto-discovers everything and labels it
automatically ("Demo Reel 01", "Build Process 01", etc.).

## 4. Updating your real content

Site content (not Kanuu's knowledge) lives in `src/data/*.js`:
`profile.js`, `projects.js`, `skills.js`, `experience.js`,
`certifications.js`, `socials.js`. Edit these to update what's shown on
the page itself.

## 5. Kanuu's knowledge base (`src/data/knowledge/`)

```
knowledge/
├── identity.md        # Who Kanuu is, personality, how it introduces itself
├── system_rules.md     # Non-negotiable behavior rules (security, accuracy, refusals)
├── about.md
├── contact.md
├── skills.md
├── projects.md
├── experience.md
├── services.md
├── achievements.md
├── timeline.md
├── faq.md
└── hobbies.md          # placeholder — replace with real content
```

Every `.md` file in this folder is automatically loaded (via
`knowledgeLoader.js`) and concatenated into Kanuu's system prompt —
**add a new file and it's included automatically, no code changes needed.**
`identity.md` and `system_rules.md` are always placed first so they anchor
Kanuu's behavior.

Two files still need real content from you:
- **`faq.md`** — currently populated with your real FAQ ✓
- **`hobbies.md`** — still a placeholder; `about.md` covers some of this
  already, replace if you want more detail

## 6. Direct vs. Hidden Integration (read this before going public)

This build uses **direct client-side integration** — `Kanuu.jsx` calls
Gemini and OpenWeather straight from the browser via
`src/services/geminiClient.js` / `weatherClient.js`, using
`VITE_GEMINI_API_KEY` / `VITE_OPENWEATHER_API_KEY` from `.env`.

**What this means in practice:**
- ✅ No backend/serverless deployment needed — just `npm run dev` or a
  static host.
- ⚠️ Your API keys are visible in the browser (dev tools → Network or
  Sources tab). Anyone could copy them and use your quota.
- ⚠️ The entire knowledge base — including `system_rules.md`'s "never
  reveal X" instructions — ships in the JS bundle. A determined visitor
  could read it directly rather than needing to extract it from Kanuu.

**Minimum mitigation before deploying publicly:**
1. In Google AI Studio, restrict your API key to the Generative Language
   API only, and add an HTTP referrer restriction for your real domain
   once you have one.
2. Same for the OpenWeather key if it supports referrer/IP restrictions.
3. Keep an eye on usage — free tiers have quotas; a leaked key could burn
   through them.

**For real hiding of the keys later:** the original serverless-proxy
version (keys never reach the browser) is preserved in
`_legacy_server_mode/` — see that folder's README to restore it. That's
the version to switch to once this portfolio is live and public.

## 7. Contact form

`_legacy_server_mode/api/contact.js` has a placeholder contact-form handler
(logs submissions, not yet wired to a real email service). The current
`Contact.jsx` still calls `/api/contact`, which won't work without
restoring that serverless setup — either restore it, or swap the form to a
service like Formspree for a quick fix.

## 8. Security notes

- `.env` is gitignored — never commit it.
- The keys currently in `.env` were shared directly in chat during setup.
  Since they're also embedded in the browser bundle by design (see section
  6), that exposure is already priced in — but if you ever suspect wider
  leakage (e.g. this repo goes public with `.env` accidentally committed),
  regenerate both keys immediately from their respective dashboards.
