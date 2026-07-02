"use client";

export default function FloatingLogo() {
  return (
    <div className="relative w-32 h-36 flex flex-col items-center justify-start pt-2 select-none">
      {/* Soft Glow behind logo */}
      <div className="absolute top-4 w-24 h-24 rounded-full bg-accent/25 blur-xl pointer-events-none" />
      
      {/* Outer Orbit Rings matching the 3D constellation scene */}
      <div className="absolute top-12 w-36 h-12 border border-sky-400/25 rounded-[50%] rotate-[20deg] pointer-events-none animate-[spin_40s_linear_infinite]" />
      <div className="absolute top-13 w-32 h-10 border border-sky-400/20 rounded-[50%] rotate-[-15deg] pointer-events-none animate-[spin_50s_linear_infinite_reverse]" />

      {/* Planet Pin Symbol */}
      <img
        src="/assets/lokalita-logo-symbol.png"
        alt="Lokalita Symbol"
        className="w-24 h-24 object-contain filter brightness-150 contrast-125 drop-shadow-[0_0_18px_rgba(255,255,255,0.95)] z-10 animate-[bounce_6s_ease-in-out_infinite]"
      />

      {/* 3D Looking Podium Base */}
      <div className="absolute bottom-2 w-28 h-7 bg-gradient-to-b from-[#181d2f] to-[#0a0d16] border border-white/10 rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.6)] flex items-center justify-center p-0.5">
        {/* Inner Glowing Ring */}
        <div className="w-full h-full rounded-full border border-accent/40 bg-accent/5 flex items-center justify-center">
          <div className="w-[80%] h-[70%] rounded-full border border-sky-400/30 bg-sky-400/5" />
        </div>
      </div>
    </div>
  );
}
