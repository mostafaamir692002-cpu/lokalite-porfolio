"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { PROJECTS, Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function WorkSection() {
  const { isRtl } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // We determine cards visible per screen size for sliding bounds:
  // Desktop: 3 cards. Max index = 3 (since total is 6)
  // Mobile/Tablet bounds:
  const totalCards = PROJECTS.length;
  const maxIndex = totalCards - 1; // Bound fallback

  const slideNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex - 2 > 0 ? maxIndex - 2 : maxIndex));
  };

  const slidePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="work" className="w-full max-w-[1400px] mx-auto px-6 md:px-8 py-20 relative z-20 select-none">
      {/* Section Header */}
      <div className="flex justify-between items-end gap-6 mb-10">
        <div className="flex flex-col gap-2 text-left rtl:text-right">
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
            {isRtl ? "مشاريع مختارة" : "Selected Work"}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white tracking-tight">
            {isRtl ? "مشاريع أطلقناها للمستقبل." : "Stores built for the future."}
          </h2>
        </div>

        {/* Sliders Arrow Controls */}
        <div className="flex gap-2">
          <button
            onClick={slidePrev}
            disabled={activeIndex === 0}
            className="w-11 h-11 rounded-full border border-white/5 bg-white/3 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
            aria-label="Previous Project"
          >
            ←
          </button>
          <button
            onClick={slideNext}
            disabled={activeIndex >= maxIndex - 2}
            className="w-11 h-11 rounded-full border border-white/5 bg-white/3 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
            aria-label="Next Project"
          >
            →
          </button>
        </div>
      </div>

      {/* Sliding Track Viewport */}
      <div className="w-full overflow-hidden">
        <div 
          className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translate3d(${isRtl ? "" : "-"}${activeIndex * (100 / 3.05)}%, 0, 0)`
          }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={(id) => {
                const found = PROJECTS.find((p) => p.id === id);
                if (found) setActiveProject(found);
              }}
            />
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 justify-center mt-8">
        {Array.from({ length: totalCards - 2 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeIndex === idx ? "w-8 bg-accent" : "w-1.5 bg-white/20"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Case Study Detailed Modal Overlay */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
