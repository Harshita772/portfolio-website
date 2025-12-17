import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { LazySection } from "@/components/LazySection";

// Lazy load sections for better performance
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <SkillsSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <ExperienceSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        </LazySection>
      </main>
      
      {/* <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense> */}
    </div>
  );
};

export default Index;
