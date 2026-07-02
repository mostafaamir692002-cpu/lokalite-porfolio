"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { useLang } from "@/context/LangContext";
import { SITE } from "@/data/site";
import Navbar from "../layout/Navbar";
import ProfileSidebar from "./ProfileSidebar";
import DeviceMockups from "./DeviceMockups";
import FloatingLogo from "./FloatingLogo";
import ServicesRow from "./ServicesRow";
import BrandStrip from "./BrandStrip";
import dynamic from "next/dynamic";
const HeroCanvas = dynamic(() => import("../three/HeroCanvas"), { ssr: false });
import Magnetic from "../ui/Magnetic";

interface HeroSectionProps {
  scrollProgress: number;
  bootProgress: number;
  isBooted: boolean;
}

export default function HeroSection({ scrollProgress, bootProgress, isBooted }: HeroSectionProps) {
  const { isRtl } = useLang();

  useEffect(() => {
    if (!isBooted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate center content first: logo, title, subhead, CTA buttons
      tl.fromTo(".animate-logo", 
        { opacity: 0, y: -20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "elastic.out(1, 0.85)" }
      );

      tl.fromTo(".animate-title", 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(".animate-subhead", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      // Target the magnetic wrapper divs to avoid fighting GSAP scales
      tl.fromTo(".animate-cta-wrap", 
        { opacity: 0, scale: 0.96, y: 10 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.5"
      );

      // Stagger Left Sidebar Cards
      tl.fromTo(".animate-sidebar-card", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        "-=0.6"
      );

      // Animate Right Device Stack: Laptop → Phone → Card
      tl.fromTo(".animate-mockup-laptop", 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 1.0 },
        "-=0.8"
      );

      tl.fromTo(".animate-mockup-phone", 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 1.0 },
        "-=0.9"
      );

      tl.fromTo(".animate-mockup-card", 
        { opacity: 0, y: 30, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        "-=0.7"
      );

      // Animate Scroll indicator
      tl.fromTo(".animate-scroll-cue", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, [isBooted]);

  return (
    <header className="relative min-h-screen w-full bg-[#060810] flex flex-col justify-between overflow-hidden pb-12">
      {/* 3D Canvas Wallpaper */}
      <HeroCanvas scrollProgress={scrollProgress} bootProgress={bootProgress} />

      {/* Grid Underlay & Noise Layer */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-noise z-0 pointer-events-none" />

      {/* Top Navigation */}
      <Navbar />

      {/* Hero Body Grid Content */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-8 mt-6 relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_440px] gap-8 items-start">
          {/* Left Column: Profile Sidebar */}
          <div className="order-2 lg:order-1">
            <ProfileSidebar />
          </div>

          {/* Center Column: Message / Identity */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left rtl:lg:text-right gap-6 pt-4">
            <div className="self-center lg:self-start animate-logo opacity-0">
              <FloatingLogo />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-display font-black text-[42px] sm:text-[54px] xl:text-[72px] text-white leading-[1.05] tracking-[-0.03em] animate-title opacity-0">
                {isRtl ? (
                  <>
                    نحن نصنع
                    <br />
                    متاجر إلكترونية
                    <br />
                    <span className="text-chrome-orange">تبيع فعلاً.</span>
                  </>
                ) : (
                  <>
                    We build
                    <br />
                    ecommerce
                    <br />
                    brands that <span className="text-chrome-orange">sell.</span>
                  </>
                )}
              </h1>
              <p className="font-sans text-[14px] sm:text-[15px] text-ink-2 max-w-[460px] leading-relaxed mx-auto lg:mx-0 animate-subhead opacity-0">
                {isRtl ? (
                  "من دراسة السوق وتصميم الهوية إلى تطوير شوبيفاي المخصص وإعلانات النمو — نساعد الماركات الطموحة في الإطلاق بثقة والنمو معتمدين على البيانات الحقيقية."
                ) : (
                  "From brand strategy and identity to Shopify development and performance marketing — we help ambitious businesses launch with confidence and grow with data."
                )}
              </p>
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-2">
              <div className="animate-cta-wrap opacity-0">
                <Magnetic>
                  <a
                    href="#work"
                    className="relative inline-flex items-center justify-center bg-gradient-to-b from-accent to-accent-deep border border-white/20 text-white font-sans font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_8px_24px_rgba(249,115,22,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 interactive group"
                  >
                    <span>{isRtl ? "شاهد مشاريعنا" : "See Our Work"}</span>
                    <span className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200">
                      →
                    </span>
                  </a>
                </Magnetic>
              </div>
              <div className="animate-cta-wrap opacity-0">
                <Magnetic>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center bg-transparent border border-white/15 text-ink-1 hover:text-white hover:border-white/25 font-sans font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] interactive group"
                  >
                    <span>{isRtl ? "ابدأ مشروعك" : "Start Your Project"}</span>
                    <span className="ml-1.5 group-hover:rotate-45 transition-transform duration-200">
                      ↗
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Device Mockups */}
          <div className="order-3 flex items-center justify-center lg:block mt-8 lg:mt-0">
            <DeviceMockups />
          </div>
        </div>

        {/* Brand strip marquee & Bottom Services Row */}
        <div className="flex flex-col mt-12 animate-cta-wrap opacity-0">
          <BrandStrip />
          <ServicesRow />
        </div>
      </div>

      {/* Decorative Bottom Left: Scroll Cue Indicator */}
      <div className="absolute bottom-6 left-8 z-20 hidden xl:flex items-center gap-3 text-ink-2 select-none animate-scroll-cue opacity-0">
        <div className="w-10 h-10 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-xs text-white">
          <span className="scroll-indicator-pulse">↓</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
          {isRtl ? "مرر لأسفل" : "Scroll Down"}
        </span>
      </div>

      {/* Fixed Chat & Podium Logo Group Float (Bottom Right) */}
      <div className="fixed bottom-6 right-8 z-[80] flex flex-col items-center gap-2">
        <div className="scale-[0.65] sm:scale-75 origin-bottom animate-scroll-cue opacity-0">
          <FloatingLogo />
        </div>
        <a 
          href={SITE.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gradient-to-b from-[#23252f] to-[#14151b] border border-white/10 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 group interactive"
        >
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-[#060810] shadow-[0_0_8px_#30D158] animate-pulse" />
          <span className="text-lg group-hover:scale-110 transition-transform duration-200">💬</span>
        </a>
      </div>
    </header>
  );
}
