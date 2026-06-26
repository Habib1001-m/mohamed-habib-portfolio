import { PORTFOLIO_DATA } from "../../data/portfolioContent";
import { PROJECTS_LIST } from "../../data/projects";
import { Project } from "../../types/portfolio";
import ProjectCard from "../ProjectCard";

interface ProjectsSectionProps {
  lang: "en" | "ar";
  setSelectedProject: (p: Project | null) => void;
}

export default function ProjectsSection({ lang, setSelectedProject }: ProjectsSectionProps) {
  const proj = PORTFOLIO_DATA.projects;

  return (
    <section id="projects-section" className="py-24 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-orange-500 text-sm font-bold">{proj.sectionNum}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">{proj.title[lang]}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent"></div>
            </div>
            <p className="text-slate-400 text-sm md:text-base">
              {proj.subtitle[lang]}
            </p>
          </div>
        </div>

        {/* Main Cards grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {PROJECTS_LIST.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
