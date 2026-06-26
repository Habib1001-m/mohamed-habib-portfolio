import { Project } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolioContent";

interface ProjectCardProps {
  key?: string;
  project: Project;
  lang: "en" | "ar";
  onSelect: (p: Project) => void;
}

export default function ProjectCard({ project, lang, onSelect }: ProjectCardProps) {
  const t = PORTFOLIO_DATA.projects;

  return (
    <div
      id={`project-card-${project.id}`}
      className="project-card flex flex-col h-full rounded-2xl bg-zinc-900/60 border border-white/10 glass overflow-hidden transition-all duration-300 shadow-xl"
    >
      {/* Aspect 16:9 Image container with beautiful custom gradients */}
      <div className="relative overflow-hidden h-52 sm:h-56 bg-black">
        <img
          src={project.image}
          alt={project.title[lang]}
          referrerPolicy="no-referrer"
          className="project-img w-full h-full object-cover opacity-70"
        />
        
        {/* Soft cybernetic grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

        {/* Categories & status overlay tags */}
        <div className={`absolute top-4 ${lang === "ar" ? "left-4" : "right-4"} flex flex-wrap gap-1.5`}>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
            {project.category[lang]}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            {project.status[lang]}
          </span>
        </div>

        {/* Glow light node representing project logic */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-2.5 py-1 bg-black/85 nav-blur rounded-md border border-white/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
          </span>
          <span className="font-mono text-[9px] text-slate-400 tracking-wider">SECURE_NODE</span>
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-white font-bold text-xl tracking-tight hover:text-orange-400 transition-colors">
            {project.title[lang]}
          </h3>
          <p className="text-xs text-orange-400 font-mono tracking-wide leading-relaxed">
            {project.tagline[lang]}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            {project.description[lang]}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((techName) => (
              <span
                key={techName}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/5 text-slate-300"
              >
                {techName}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Action button triggers expandable details view */}
          <div className="flex items-center justify-between gap-4">
            <button
              id={`details-btn-${project.id}`}
              type="button"
              onClick={() => onSelect(project)}
              className="text-xs font-mono font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5 group"
            >
              {lang === "ar" ? "← تفاصيل النظام والعتاد" : "System Specs & Details →"}
            </button>

            <div className="flex items-center gap-2">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 hover:border-orange-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title={t.viewSource[lang]}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 hover:border-orange-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title={t.visitDemo[lang]}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
