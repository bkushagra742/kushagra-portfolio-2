// Auto-discovers whatever files you drop into a project's media folders —
// no need to import or name them individually. Just add files under:
//   src/assets/projects/<slug>/video/*
//   src/assets/projects/<slug>/bts/*
//   src/assets/projects/<slug>/code/*
// and they will appear on the site automatically after a rebuild.
//
// Labeling: since raw filenames aren't always clean, each file gets a
// generic technical label based on its folder and order — e.g.
// "Demo Reel 01", "Build Process 02", "Source Snippet 01" — rather than
// showing the literal filename.

const videoModules = import.meta.glob("/src/assets/projects/*/video/*", { eager: true, import: "default" });
const btsModules = import.meta.glob("/src/assets/projects/*/bts/*", { eager: true, import: "default" });
const codeModules = import.meta.glob("/src/assets/projects/*/code/*", { eager: true, import: "default" });

function extractSlugAndFile(path) {
  // path like /src/assets/projects/<slug>/video/<filename>
  const parts = path.split("/");
  const slugIdx = parts.indexOf("projects") + 1;
  return { slug: parts[slugIdx], filename: parts[parts.length - 1] };
}

function groupByProject(modules, folderLabel) {
  const grouped = {};
  Object.entries(modules)
    .filter(([path]) => !path.endsWith(".gitkeep"))
    .forEach(([path, url]) => {
      const { slug, filename } = extractSlugAndFile(path);
      if (!grouped[slug]) grouped[slug] = [];
      grouped[slug].push({ url, filename, path });
    });

  // Sort each project's files for stable, predictable numbering
  Object.values(grouped).forEach((list) => list.sort((a, b) => a.filename.localeCompare(b.filename)));

  // Attach a clean technical label
  Object.entries(grouped).forEach(([slug, list]) => {
    grouped[slug] = list.map((item, i) => ({
      ...item,
      label: `${folderLabel} ${String(i + 1).padStart(2, "0")}`,
    }));
  });

  return grouped;
}

const videosByProject = groupByProject(videoModules, "Demo Reel");
const btsByProject = groupByProject(btsModules, "Build Process");
const codeByProject = groupByProject(codeModules, "Source Snippet");

/**
 * Returns { videos, bts, code } arrays of { url, label, filename } for a
 * given project slug. Arrays are empty if nothing has been uploaded yet.
 */
export function useProjectMedia(slug) {
  return {
    videos: videosByProject[slug] || [],
    bts: btsByProject[slug] || [],
    code: codeByProject[slug] || [],
  };
}

export function projectHasMedia(slug) {
  const { videos, bts, code } = {
    videos: videosByProject[slug] || [],
    bts: btsByProject[slug] || [],
    code: codeByProject[slug] || [],
  };
  return videos.length + bts.length + code.length > 0;
}
