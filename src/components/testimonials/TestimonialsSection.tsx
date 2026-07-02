"use client";

import { useLang } from "@/context/LangContext";

export default function TestimonialsSection() {
  const { isRtl } = useLang();

  return (
    <section id="insights" className="w-full max-w-[1400px] mx-auto px-6 md:px-8 py-20 relative z-20 select-none">
      {/* Section Header */}
      <div className="flex flex-col gap-2 text-left rtl:text-right mb-12">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
          {isRtl ? "آراء عملائنا" : "Client Proof"}
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white tracking-tight">
          {isRtl ? "ملاحظات حقيقية من شركائنا." : "Real feedback from partners."}
        </h2>
      </div>

      {/* Proof Grid containing screenshots and video */}
      <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-[1100px] mx-auto">
        
        {/* Review Image 1 */}
        <div className="glass-panel-a glass-specular p-2.5 flex-1 min-w-[280px] max-w-[340px] flex flex-col justify-center rounded-2xl shadow-lg">
          <picture>
            <source srcSet="/assets/review-1.webp" type="image/webp" />
            <img
              src="/assets/review-1.jpg"
              alt="Client review conversation 1"
              loading="lazy"
              className="w-full h-auto rounded-xl border border-white/5 opacity-95 hover:opacity-100 transition-opacity duration-300"
            />
          </picture>
        </div>

        {/* Video Card */}
        <div className="glass-panel-a glass-specular p-2.5 flex-1 min-w-[280px] max-w-[340px] flex flex-col justify-center rounded-2xl shadow-lg">
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto rounded-xl border border-white/5 bg-black"
          >
            <source src="/assets/review-video.mp4" type="video/mp4" />
            {isRtl ? "متصفحك لا يدعم تشغيل الفيديو." : "Your browser does not support the video tag."}
          </video>
        </div>

        {/* Review Image 2 */}
        <div className="glass-panel-a glass-specular p-2.5 flex-1 min-w-[280px] max-w-[340px] flex flex-col justify-center rounded-2xl shadow-lg">
          <picture>
            <source srcSet="/assets/review-2.webp" type="image/webp" />
            <img
              src="/assets/review-2.jpg"
              alt="Client review conversation 2"
              loading="lazy"
              className="w-full h-auto rounded-xl border border-white/5 opacity-95 hover:opacity-100 transition-opacity duration-300"
            />
          </picture>
        </div>

      </div>
    </section>
  );
}
