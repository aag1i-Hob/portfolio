import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Navbar from "@/components/portfolio/Navbar";
import { getProfile, getFeaturedProjects, getSkills } from "@/lib/db";

export const revalidate = 60;

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getSkills(),
  ]);

  return (
    <main className="mesh-bg min-h-screen">
      <Navbar profile={profile} />
      <HeroSection profile={profile} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ContactSection />
    </main>
  );
}
