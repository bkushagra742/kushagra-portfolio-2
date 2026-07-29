# Legacy: Hidden Serverless Mode

This folder holds the **hidden/secure integration** built earlier —
serverless functions (`api/kanuu-chat.js`, `api/weather.js`, `api/contact.js`)
that keep your API keys server-side, plus the matching `knowledgeBase.js`
that hand-built the system prompt from `src/data/*.js`.

The site currently uses the **direct client-side integration** instead
(`src/services/geminiClient.js`, `src/services/weatherClient.js`, and the
`src/data/knowledge/*.md` files) per your request — simpler to run, but the
API keys and knowledge base are visible in the browser bundle.

**To switch back to hidden/secure mode later:**
1. Move `api/` back to the project root.
2. Update `Kanuu.jsx` to call `/api/kanuu-chat` again (see git history or
   ask Claude to restore it).
3. Move your keys from `.env` (`VITE_GEMINI_API_KEY`) to your Vercel/Netlify
   dashboard as `GEMINI_API_KEY` (no `VITE_` prefix, so it stays
   server-only).
4. Deploy to Vercel or Netlify so the `api/` functions actually run.

Not deleted — kept here in case you want the extra security later, e.g.
once the portfolio is public and you're worried about API quota abuse.
