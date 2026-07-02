"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BootScreen from "@/components/ui/BootScreen";
import HeroSection from "@/components/hero/HeroSection";
import WorkSection from "@/components/work/WorkSection";
import ServicesSection from "@/components/services/ServicesSection";
import AboutSection from "@/components/about/AboutSection";
import ApproachSection from "@/components/approach/ApproachSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import GlassHighlightListener from "@/components/ui/GlassHighlightListener";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useLenis } from "@/hooks/useLenis";

export default function Home() {
  const [bootProgress, setBootProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const scrollProgress = useScrollProgress();
  
  // Initialize Lenis smooth scroll (which also configures GSAP ScrollTrigger updates)
  useLenis();

  useEffect(() => {
    if (!isBooted) return;
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray("[data-scroll-reveal]");
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 40, filter: "blur(6px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.0, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, [isBooted]);

  return (
    <>
      {/* Interactive global controls */}
      <CustomCursor />
      <GlassHighlightListener />
      
      {/* Cinematic system boot sequence */}
      {!isBooted && (
        <BootScreen 
          onProgressUpdate={(p) => setBootProgress(p)}
          onComplete={() => setIsBooted(true)} 
        />
      )}
      
      <main className="relative min-h-screen">
        {/* Top page scroll progress bar */}
        <div id="scrollProgress" style={{ width: `${scrollProgress * 100}%` }} />
        
        {/* Hero landing segment */}
        <HeroSection 
          scrollProgress={scrollProgress}
          bootProgress={isBooted ? 1 : bootProgress}
          isBooted={isBooted}
        />

        {/* Work / Case Studies */}
        <div data-scroll-reveal className="opacity-0">
          <WorkSection />
        </div>

        {/* Services / Core Disciplines */}
        <div data-scroll-reveal className="opacity-0">
          <ServicesSection />
        </div>

        {/* About Studio */}
        <div data-scroll-reveal className="opacity-0">
          <AboutSection />
        </div>

        {/* Approach / System Workflow */}
        <div data-scroll-reveal className="opacity-0">
          <ApproachSection />
        </div>

        {/* Testimonials / Client Proof */}
        <div data-scroll-reveal className="opacity-0">
          <TestimonialsSection />
        </div>

        {/* Contact CTA Block */}
        <div data-scroll-reveal className="opacity-0">
          <ContactSection />
        </div>

        {/* Page Footer */}
        <div data-scroll-reveal className="opacity-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
