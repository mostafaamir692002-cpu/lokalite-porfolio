"use client";

export default function FloatingLogo() {
  return (
    <div className="relative w-24 h-28 flex flex-col items-center justify-start pt-2 select-none">
      {/* Soft Glow behind logo */}
      <div className="absolute top-4 w-16 h-16 rounded-full bg-accent/20 blur-xl pointer-events-none" />
      
      {/* Outer Orbit Rings matching the 3D constellation scene */}
      <div className="absolute top-10 w-28 h-8 border border-sky-400/25 rounded-[50%] rotate-[20deg] pointer-events-none animate-[spin_40s_linear_infinite]" />
      <div className="absolute top-11 w-24 h-6 border border-sky-400/20 rounded-[50%] rotate-[-15deg] pointer-events-none animate-[spin_50s_linear_infinite_reverse]" />

      {/* Planet Pin Symbol */}
      <img
        src="/assets/lokalita-logo-symbol.png"
        alt="Lokalita Symbol"
        className="w-16 h-16 object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] z-10 animate-[bounce_6s_ease-in-out_infinite]"
      />

      {/* 3D Looking Podium Base */}
      <div className="absolute bottom-2 w-20 h-5 bg-gradient-to-b from-[#181d2f] to-[#0a0d16] border border-white/10 rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.6)] flex items-center justify-center p-0.5">
        {/* Inner Glowing Ring */}
        <div className="w-full h-full rounded-full border border-accent/40 bg-accent/5 flex items-center justify-center">
          <div className="w-[80%] h-[70%] rounded-full border border-sky-400/30 bg-sky-400/5" />
        </div>
      </div>
    </div>
  );
}
