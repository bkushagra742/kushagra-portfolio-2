import ProjectMediaGallery from "./ProjectMediaGallery";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{ background: "var(--ink-900)", border: "1px solid rgba(237,232,222,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="font-display font-bold text-2xl text-cream-full mb-1">{project.name}</h3>
              <div className="text-xs font-mono text-cream-dim opacity-60">{project.subtitle}</div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-cream-dim hover:text-cream-full"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-cream-dim opacity-75 leading-[1.7] mb-5">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div className="flex gap-3 mb-8">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs py-2 px-5">
              View on GitHub
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2 px-5">
                Live Demo
              </a>
            )}
          </div>

          <div className="font-display font-semibold text-sm text-cream-full mb-4 opacity-80">
            Project Media
          </div>
          <ProjectMediaGallery slug={project.slug} />
        </div>
      </div>
    </div>
  );
}
