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
  const isRtl = lang === "ar";

  return (
    <section id="projects-section" className="py-24 border-t border-white/5 relative">
      <div className="ds-shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className={isRtl ? "font-arabic text-right" : ""}>
            <div className="ds-section-heading mb-4">
              <span className="ds-kicker text-orange-500">{proj.sectionNum}</span>
              <h2 className={`ds-section-title ${isRtl ? "font-arabic" : "uppercase"}`}>{proj.title[lang]}</h2>
              <div className="ds-section-rule" />
            </div>
            <p className={`ds-muted-copy text-sm md:text-base max-w-5xl ${isRtl ? "font-arabic" : ""}`}>
              {proj.subtitle[lang]}
            </p>
          </div>
        </div>

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
