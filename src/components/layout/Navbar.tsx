"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/context/LangContext";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/cn";
import Magnetic from "../ui/Magnetic";

export default function Navbar() {
  const { lang, setLang, isRtl } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 select-none",
          scrolled 
            ? "bg-[#060810]/70 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" 
            : "bg-transparent"
        )}
      >
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 relative">
            <img
              src="/assets/lokalita-logo-symbol.png"
              alt="Lokalita Logo"
              className="w-full h-full object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            />
          </div>
          <span className="font-display font-black text-lg tracking-[0.12em] text-white uppercase">
            Lokalita
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 bg-glass-1/25 backdrop-blur-md px-6 py-2 border border-white/5 rounded-full">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-[13px] font-medium text-ink-1 hover:text-white transition-colors duration-200"
            >
              {isRtl && link.label === "Work"
                ? "مشاريعنا"
                : isRtl && link.label === "Services"
                ? "خدماتنا"
                : isRtl && link.label === "Approach"
                ? "منهجيتنا"
                : isRtl && link.label === "About"
                ? "عن الاستوديو"
                : isRtl && link.label === "Insights"
                ? "آراء"
                : isRtl && link.label === "Contact"
                ? "اتصل بنا"
                : link.label}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* GMT Clock / Location */}
          <div className="hidden md:flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full bg-success animate-pulse shadow-[0_0_8px_#30D158]" />
            <span className="text-[11px] font-mono text-ink-2 uppercase tracking-wider">
              {isRtl ? "القاهرة، مصر GMT+2" : "Cairo, Egypt GMT+2"}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex bg-void-0/60 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-2 py-1 text-[10px] font-mono rounded font-semibold uppercase tracking-wider transition-all duration-200",
                lang === "en"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-ink-2 hover:text-white"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ar")}
              className={cn(
                "px-2 py-1 text-[10px] font-mono rounded font-semibold uppercase tracking-wider transition-all duration-200",
                lang === "ar"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-ink-2 hover:text-white"
              )}
            >
              AR
            </button>
          </div>

          {/* Start a Project CTA Button */}
          <div className="hidden sm:block">
            <Magnetic>
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center bg-gradient-to-b from-accent to-accent-deep border border-white/20 text-white font-sans font-semibold text-[12px] px-4 py-2.5 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 interactive group"
              >
                <span>{isRtl ? "ابدأ مشروعك" : "Start Your Project"}</span>
                <span className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-200">
                  →
                </span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile Hamburger menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
            aria-label="Toggle Menu"
          >
            <span className={cn("w-5 h-[1.5px] bg-white transition-all duration-300", isOpen && "translate-y-[5px] rotate-45")} />
            <span className={cn("w-5 h-[1.5px] bg-white transition-all duration-300", isOpen && "opacity-0")} />
            <span className={cn("w-5 h-[1.5px] bg-white transition-all duration-300", isOpen && "-translate-y-[5px] -rotate-45")} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[90] bg-[#060810]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 transition-all duration-500",
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-display font-bold text-ink-1 hover:text-white hover:translate-x-1 transition-all duration-300 p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/3"
            >
              {isRtl && link.label === "Work"
                ? "مشاريعنا"
                : isRtl && link.label === "Services"
                ? "خدماتنا"
                : isRtl && link.label === "Approach"
                ? "منهجيتنا"
                : isRtl && link.label === "About"
                ? "عن الاستوديو"
                : isRtl && link.label === "Insights"
                ? "آراء"
                : isRtl && link.label === "Contact"
                ? "اتصل بنا"
                : link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu CTA and Location info */}
        <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full relative inline-flex items-center justify-center bg-gradient-to-b from-accent to-accent-deep border border-white/20 text-white font-sans font-bold text-sm py-4 rounded-xl shadow-[0_6px_20px_rgba(249,115,22,0.28)]"
          >
            <span>{isRtl ? "ابدأ مشروعك" : "Start Your Project"}</span>
            <span className="ml-2">→</span>
          </a>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_#30D158]" />
            <span className="text-[11px] font-mono text-ink-2 uppercase tracking-wider">
              {isRtl ? "القاهرة، مصر GMT+2" : "Cairo, Egypt GMT+2"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
