"use client";

import { useLang } from "@/context/LangContext";
import { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (id: string) => void;
}

export default function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  const { isRtl, t, tArray } = useLang();

  // Color mappings based on glyphClass to match the approved gradients
  const gradientStyles: Record<string, string> = {
    "wc-1": "from-[#3a2b10] to-[#0c0d12]", // Medieval Aloud
    "wc-2": "from-[#0c2f3a] to-[#0c0d12]", // UNITED
    "wc-3": "from-[#0d3320] to-[#0c0d12]", // Royal Sea
    "wc-4": "from-[#241046] to-[#0c0d12]", // Seafood Mood
    "wc-5": "from-[#3a0f24] to-[#0c0d12]", // Pantoufla
    "wc-6": "from-[#063a38] to-[#0c0d12]"  // FISHMONGER
  };

  const gradientClass = gradientStyles[project.glyphClass] || "from-void-2 to-void-0";

  return (
    <article 
      onClick={() => onOpenCaseStudy(project.id)}
      className="flex-shrink-0 w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-gradient-to-b from-[#22242e]/60 to-[#0c0d12]/66 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-[0_18px_44px_rgba(0,0,0,0.5)] group select-none relative"
    >
      {/* Visual Top Area */}
      <div className={cn("h-48 relative overflow-hidden flex items-center justify-center bg-gradient-to-br", gradientClass)}>
        {/* Glyph / Initial */}
        <span className="font-display font-black text-[74px] opacity-10 tracking-tighter text-white select-none">
          {project.glyph}
        </span>

        {/* Project Thumbnail Image */}
        {project.previewImage && (
          <img
            src={project.previewImage}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover absolute inset-0 opacity-75 group-hover:scale-[1.03] group-hover:opacity-85 transition-all duration-500"
          />
        )}

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Top bar info */}
        <div className="absolute top-3 left-4 right-4 flex justify-between items-center z-10 text-[9px] font-mono">
          <span className="bg-accent/15 border border-accent/30 text-accent font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            ● {isRtl ? project.status.ar : project.status.en}
          </span>
          <span className="text-white/50 tracking-wide font-light">
            {project.website.replace("https://", "")}
          </span>
        </div>

        {/* Label Bottom */}
        <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-0.5 z-10">
          <span className="text-[10px] font-mono tracking-wider text-accent uppercase font-medium">
            {t(project.tag)}
          </span>
          <h3 className="font-display font-black text-xl text-white tracking-tight leading-none">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Body Area */}
      <div className="p-5 flex flex-col justify-between h-[230px]">
        {/* Story */}
        <div className="flex flex-col gap-3">
          {/* Problem */}
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] tracking-wider text-sky-400 uppercase">
              {isRtl ? "المشكلة" : "Problem"}
            </span>
            <p className="text-[12.5px] text-ink-2 leading-relaxed line-clamp-2">
              {t(project.problem_short)}
            </p>
          </div>
          {/* Outcome */}
          <div className="flex flex-col gap-0.5 border-t border-white/5 pt-2">
            <span className="font-mono text-[9px] tracking-wider text-success uppercase">
              {isRtl ? "النتيجة" : "Outcome"}
            </span>
            <p className="text-[12.5px] text-ink-0 leading-relaxed line-clamp-2">
              {t(project.outcome_short)}
            </p>
          </div>
        </div>

        {/* Focus Tags Footer */}
        <div className="flex flex-col gap-3">
          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap overflow-hidden h-[26px]">
            {tArray(project.meta).slice(0, 3).map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[9.5px] text-ink-1 px-2.5 py-1 rounded bg-white/5 border border-white/5 font-sans"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-accent to-sky-500 text-void-0 font-mono font-bold text-[10px] py-2 rounded-lg hover:opacity-90 active:scale-98 transition-all duration-200"
            >
              <span>{isRtl ? "زيارة الموقع" : "Visit Website"}</span>
              <span className="scale-90">↗</span>
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCaseStudy(project.id);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 text-ink-1 hover:text-white hover:bg-white/10 font-mono font-semibold text-[10px] py-2 rounded-lg active:scale-98 transition-all duration-200"
            >
              <span>{isRtl ? "دراسة الحالة" : "Case Study"}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
