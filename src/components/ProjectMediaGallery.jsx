import { useProjectMedia } from "../hooks/useProjectMedia";

function isVideoFile(filename) {
  return /\.(mp4|webm|mov)$/i.test(filename);
}

function isImageFile(filename) {
  return /\.(png|jpg|jpeg|gif|webp)$/i.test(filename);
}

/**
 * Renders whatever media has been dropped into a project's folders.
 * Nothing to configure per-file — labels are generated automatically.
 */
export default function ProjectMediaGallery({ slug }) {
  const { videos, bts, code } = useProjectMedia(slug);
  const hasAny = videos.length + bts.length + code.length > 0;

  if (!hasAny) {
  return (
    <div
      className="rounded-xl p-6 text-center text-xs font-mono text-cream-dim opacity-50"
      style={{ border: "1px dashed rgba(255,255,255,0.15)" }}
    >
      No media added yet for this project — check back soon.
    </div>
  );
}

  return (
    <div className="space-y-6">
      {videos.length > 0 && (
        <MediaGroup title="Demo Reel" items={videos} render={(item) => (
          isVideoFile(item.filename)
            ? <video src={item.url} controls className="w-full rounded-lg" />
            : <img src={item.url} alt={item.label} className="w-full rounded-lg grayscale" />
        )} />
      )}
      {bts.length > 0 && (
        <MediaGroup title="Build Process" items={bts} render={(item) => (
          isVideoFile(item.filename)
            ? <video src={item.url} controls className="w-full rounded-lg" />
            : <img src={item.url} alt={item.label} className="w-full rounded-lg grayscale" />
        )} />
      )}
      {code.length > 0 && (
        <MediaGroup title="Source Snippets" items={code} render={(item) => (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block card px-4 py-3 text-xs font-mono text-cream-dim hover:opacity-100 opacity-70"
          >
            {item.label} — {item.filename}
          </a>
        )} />
      )}
    </div>
  );
}

function MediaGroup({ title, items, render }) {
  return (
    <div>
      <div className="font-mono text-[11px] tracking-widest uppercase text-cream-dim opacity-50 mb-3">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i}>{render(item)}</div>
        ))}
      </div>
    </div>
  );
}
