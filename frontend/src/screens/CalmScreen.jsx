import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import { translations } from "../translations";

export default function CalmScreen({ navigate, language }) {
  const [phase, setPhase] = useState("in");
  const tx = translations[language]?.calm || translations.en.calm;

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p === "in" ? "out" : "in")), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex flex-col h-full overflow-y-auto bg-gradient-to-b from-[#FDFBFF] to-[#F0E6F7]"
      style={{ width: "100%" }}
    >
      {/* ── TOP ICON ── */}
      <div className="flex justify-center pt-10 pb-4 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-full bg-[#4A3254]/10 flex items-center justify-center"
        >
          <Wind className="w-6 h-6 text-[#4A3254]" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* ── MIDDLE CONTENT ── */}
      <div className="flex-1 flex flex-col items-center px-6">
        {/* Breathing circle */}
        <div className="relative flex items-center justify-center mb-6 mt-2">
          <div className="absolute w-52 h-52 rounded-full bg-[#D8B4E2]/20 animate-breathe" />
          <div className="absolute w-40 h-40 rounded-full bg-[#D8B4E2]/30 animate-breathe" style={{ animationDelay: "0.3s" }} />
          <motion.div
            animate={{ scale: phase === "in" ? 1.2 : 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#4A3254] shadow-[0_0_50px_rgba(216,180,226,0.5)] flex items-center justify-center"
          >
            <motion.span
              key={phase}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-white font-heading font-bold text-sm text-center px-2"
            >
              {phase === "in" ? tx.breatheIn : tx.breatheOut}
            </motion.span>
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="font-heading text-3xl font-bold text-[#2D2331] mb-1">{tx.title}</h1>
          <h2 className="font-heading text-lg text-[#6B5A74] font-medium">{tx.subtitle}</h2>
        </motion.div>

        {/* Reassurance lines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/80 border border-[#F0E6F7] rounded-3xl p-5 space-y-3 w-full"
          style={{ boxShadow: "0 2px 16px -4px rgba(216,180,226,0.3)" }}
        >
          {[tx.line1, tx.line2, tx.line3].map((line, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D8B4E2] mt-2 flex-shrink-0" />
              <p className="text-[#4A3254] font-body text-base font-medium leading-relaxed">{line}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── CTA BUTTON (pinned to bottom) ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="px-6 pt-6 pb-10 flex-shrink-0"
      >
        <button
          data-testid="calm-continue-btn"
          onClick={() => navigate("home")}
          className="w-full bg-[#4A3254] text-white rounded-full py-4 font-heading font-bold text-lg transition-all active:scale-[0.98]"
          style={{ boxShadow: "0 4px 20px -4px rgba(74,50,84,0.35)" }}
        >
          {tx.readyBtn}
        </button>
      </motion.div>
    </div>
  );
}
