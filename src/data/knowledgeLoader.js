// Auto-loads every .md file in src/data/knowledge/ as raw text and
// concatenates them into Kanuu's system prompt. Drop a new .md file in that
// folder and it's automatically included — no code changes needed.
//
// Files are ordered deliberately (identity + system_rules first, since they
// define Kanuu's behavior and should anchor the prompt) rather than
// alphabetically.

const modules = import.meta.glob("/src/data/knowledge/*.md", { eager: true, query: "?raw", import: "default" });

const PRIORITY_ORDER = [
  "identity.md",
  "system_rules.md",
  "about.md",
  "contact.md",
  "skills.md",
  "projects.md",
  "experience.md",
  "services.md",
  "achievements.md",
  "timeline.md",
  "faq.md",
  "hobbies.md",
];

function filenameFromPath(path) {
  return path.split("/").pop();
}

export function loadKnowledgeFiles() {
  const files = Object.entries(modules).map(([path, content]) => ({
    filename: filenameFromPath(path),
    content,
  }));

  files.sort((a, b) => {
    const ai = PRIORITY_ORDER.indexOf(a.filename);
    const bi = PRIORITY_ORDER.indexOf(b.filename);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return files;
}

/**
 * Builds the full text sent to Gemini as the system instruction: every
 * knowledge file, clearly labeled, concatenated in priority order.
 */
export function buildKnowledgeBaseText() {
  const files = loadKnowledgeFiles();
  return files
    .map((f) => `\n\n===== ${f.filename} =====\n${f.content}`)
    .join("\n");
}
