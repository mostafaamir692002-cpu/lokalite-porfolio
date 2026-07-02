"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { isRtl, t, tArray } = useLang();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.classList.add("is-locked");
    } else {
      document.body.classList.remove("is-locked");
    }
    return () => document.body.classList.remove("is-locked");
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] overflow-y-auto overflow-x-hidden flex justify-center items-start p-4 md:p-8 select-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060810]/80 backdrop-blur-md z-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative max-w-4xl w-full bg-[#0a0e1a]/95 border border-white/10 rounded-[28px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] z-10 my-auto flex flex-col"
        >
          {/* Top Header Panel (Sticky details) */}
          <div className="p-6 md:p-8 border-b border-white/5 bg-[#0f1424]/60 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-20">
            {/* Title / Info */}
            <div className="flex flex-col gap-1 text-left rtl:text-right">
              <span className="text-[11px] font-mono tracking-wider text-accent uppercase font-medium">
                {t(project.tag)}
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-none">
                {project.title}
              </h2>
            </div>

            {/* Actions / Close */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-b from-accent to-accent-deep border border-white/10 text-white font-sans font-bold text-[12px] px-5 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(249,115,22,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>{isRtl ? "زيارة المتجر" : "Visit Store"}</span>
                <span>↗</span>
              </a>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-ink-2 hover:text-white flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all duration-200"
                aria-label="Close Case Study"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto space-y-8 text-left rtl:text-right scrollbar-thin">
            {/* Context/Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6">
              {/* Left Column: Context Story */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-white">
                  {isRtl ? "نظرة عامة على المشروع" : "Project Overview"}
                </h3>
                <p className="text-[14px] text-ink-1 leading-relaxed">
                  {t(project.overview)}
                </p>
                <p className="text-[14.5px] text-ink-0 leading-relaxed font-medium">
                  {t(project.businessContext)}
                </p>
              </div>

              {/* Right Column: Project Highlights (Stats / Meta) */}
              <div className="bg-white/3 border border-white/5 rounded-2xl p-5 flex flex-col gap-5 justify-between">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[9px] tracking-wider text-ink-2 uppercase border-b border-white/5 pb-2">
                    {isRtl ? "النتائج والمقاييس" : "Metrics & Outcomes"}
                  </span>
                  <div className="space-y-4">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col gap-0.5">
                        <div className="flex justify-between items-end">
                          <span className="text-[11px] font-mono text-ink-2 uppercase">
                            {stat.lbl}
                          </span>
                          <span className="font-display font-black text-lg text-accent">
                            {stat.val}
                          </span>
                        </div>
                        <span className="text-[11px] text-ink-1 leading-normal">
                          {stat.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                  <span className="font-mono text-[9px] tracking-wider text-ink-2 uppercase">
                    {isRtl ? "تقنيات التخصص" : "Platform Stack"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tArray(project.techs).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[9.5px] font-mono text-ink-0 px-2 py-1 rounded bg-white/5 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Problem & Solution Double Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] tracking-wider text-sky-400 uppercase">
                  {isRtl ? "التحدي / المشكلة" : "The Challenge / Problem"}
                </span>
                <p className="text-[13.5px] text-ink-1 leading-relaxed">
                  {t(project.problem)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] tracking-wider text-success uppercase">
                  {isRtl ? "الحل / الاستراتيجية" : "The Solution / Strategy"}
                </span>
                <p className="text-[13.5px] text-ink-0 leading-relaxed font-medium">
                  {t(project.solution)}
                </p>
              </div>
            </div>

            {/* Key Architectural Decisions */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <h3 className="font-display font-bold text-lg text-white">
                {isRtl ? "القرارات الاستراتيجية والتنفيذ" : "Key Strategy & Execution"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tArray(project.decisions).map((decision, idx) => {
                  const parts = decision.split(":");
                  const title = parts[0];
                  const body = parts.slice(1).join(":");
                  return (
                    <div key={idx} className="p-4 bg-white/3 border border-white/5 rounded-xl flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-accent font-bold">
                        0{idx + 1}
                      </span>
                      <h4 className="font-display font-bold text-[14px] text-white leading-tight">
                        {title}
                      </h4>
                      {body && (
                        <p className="text-[12px] text-ink-2 leading-relaxed">
                          {body}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Infrastructure */}
            {project.systemArchitecture && (
              <div className="space-y-2 pt-6 border-t border-white/5">
                <span className="font-mono text-[10px] tracking-wider text-ink-2 uppercase">
                  {isRtl ? "الهيكل والربط البرمجي" : "System Architecture"}
                </span>
                <p className="text-[13.5px] text-ink-1 leading-relaxed">
                  {t(project.systemArchitecture)}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
