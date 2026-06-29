import { useState, useEffect } from "react";
import { Project } from "./types/portfolio";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import InteractiveSandboxSection from "./components/sections/InteractiveSandboxSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import TechStackSection from "./components/sections/TechStackSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/layout/Footer";
import ProjectModal from "./components/ProjectModal";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";

const getInitialLanguage = (): "en" | "ar" => {
  if (typeof window === "undefined") return "ar";

  const savedLang = window.localStorage.getItem("portfolio-lang");
  return savedLang === "en" || savedLang === "ar" ? savedLang : "ar";
};

export default function App() {
  const [lang, setLang] = useState<"en" | "ar">(getInitialLanguage);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync layout direction with language state
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    window.localStorage.setItem("portfolio-lang", lang);
  }, [lang, isRtl]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-orange-500/20 selection:text-white relative overflow-hidden font-sans">
      <ScrollProgressIndicator lang={lang} />

      {/* Background radial glowing ambient light pools */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-amber-950/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full bg-red-950/5 blur-[100px] pointer-events-none" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.009)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.009)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Navigation Header */}
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <HeroSection lang={lang} />

      {/* About Section */}
      <AboutSection lang={lang} />

      {/* Projects Grid Section */}
      <ProjectsSection lang={lang} setSelectedProject={setSelectedProject} />

      {/* Compact Systems Lab */}
      <InteractiveSandboxSection lang={lang} />

      {/* Experience Section */}
      <ExperienceSection lang={lang} />

      {/* Technical Stack Dashboard Section */}
      <TechStackSection lang={lang} />

      {/* Contact Section */}
      <ContactSection lang={lang} />

      {/* Footer Area */}
      <Footer lang={lang} />

      {/* Specs Detail Modal (glowing slide over) */}
      <ProjectModal
        lang={lang}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </div>
  );
}
