"use client";

export default function FloatingLogo() {
  return (
    <div className="relative w-20 h-24 flex items-center justify-center animate-[bounce_6s_ease-in-out_infinite]">
      {/* Soft Glow behind logo */}
      <div className="absolute w-20 h-20 rounded-full bg-accent/15 blur-xl pointer-events-none" />
      
      {/* Outer Orbit Rings matching the 3D constellation scene */}
      <div className="absolute w-28 h-8 border border-sky-400/25 rounded-[50%] rotate-[20deg] pointer-events-none animate-[spin_40s_linear_infinite]" />
      <div className="absolute w-24 h-6 border border-sky-400/20 rounded-[50%] rotate-[-15deg] pointer-events-none animate-[spin_50s_linear_infinite_reverse]" />

      <img
        src="/assets/lokalita-logo.png"
        alt="Lokalita Symbol"
        className="w-full h-full object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] z-10"
      />
    </div>
  );
}
