import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProofLayerSection } from "@/components/sections/ProofLayerSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SandboxSection } from "@/components/sections/SandboxSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollProgressIndicator } from "@/components/motion/ScrollProgressIndicator";
import { MotionShell } from "@/components/motion/MotionShell";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ShortcutsHelp } from "@/components/layout/ShortcutsHelp";
import { ScrollSpyDots } from "@/components/layout/ScrollSpyDots";
import { FEATURES } from "@/config/features";
import { MOTION_CONFIG } from "@/config/motion";

export const dynamicParams = false;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;

  return (
    <>
      {(FEATURES.scrollProgress && MOTION_CONFIG.enabled) && (
        <ScrollProgressIndicator />
      )}
      <MotionShell />
      <GrainOverlay />
      <Navbar locale={loc} />
      <main id="main">
        <HeroSection locale={loc} />
        <AboutSection locale={loc} />
        <ProjectsSection locale={loc} />
        <ProofLayerSection locale={loc} />
        <TestimonialsSection locale={loc} />
        <SandboxSection locale={loc} />
        <ExperienceSection locale={loc} />
        <TechStackSection locale={loc} />
        <ContactSection locale={loc} />
      </main>
      <Footer locale={loc} />
      <CommandPalette locale={loc} />
      <ScrollToTop locale={loc} />
      <ShortcutsHelp locale={loc} />
      <ScrollSpyDots locale={loc} />
    </>
  );
}
