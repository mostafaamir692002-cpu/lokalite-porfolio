export const DESIGN_TOKENS = {
  colors: {
    void: {
      0: "#060810", // Primary background
      1: "#0a0e1a", // Gradient layer
      2: "#0e1228"  // Dark overlay card base
    },
    glass: {
      1: "rgba(12, 16, 28, 0.55)", // Panel A
      2: "rgba(15, 20, 35, 0.65)", // Panel B
      3: "rgba(15, 18, 30, 0.4)"   // Panel C
    },
    ink: {
      0: "#f4f6fb",
      1: "#c5cad6",
      2: "#8b909e",
      3: "#5a5f6e"
    },
    accent: {
      default: "#F97316",
      deep: "#EA580C",
      deep2: "#C2410C"
    },
    success: "#30D158",
    orbit: "#3B82F6"
  }
} as const;
