import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Scale, Shield, BookOpen } from "lucide-react";
import { translations } from "../translations";

const sectionIcons = { posh: Scale, dv: Shield, ipc: BookOpen };
const sectionColors = {
  posh: { bg: "bg-purple-50", icon: "text-[#4A3254]", badge: "bg-[#4A3254] text-white", border: "border-[#D8B4E2]" },
  dv:   { bg: "bg-rose-50",   icon: "text-rose-600",  badge: "bg-rose-600 text-white",   border: "border-rose-200"   },
  ipc:  { bg: "bg-indigo-50", icon: "text-indigo-600", badge: "bg-indigo-600 text-white", border: "border-indigo-200" },
};

export default function LegalScreen({ navigate, language }) {
  const [expanded, setExpanded] = useState("posh");
  const tx = translations[language]?.legal || translations.en.legal;
  const sections = [
    { key: "posh", data: tx.posh },
    { key: "dv",   data: tx.dv   },
    { key: "ipc",  data: tx.ipc  },
  ];

  return (
    <div
      className="flex flex-col h-full bg-[#F4EEF9]"
      style={{ width: "100%" }}
    >
      {/* ── HEADER (static, no overlap) ── */}
      <div className="bg-gradient-to-br from-[#4A3254] to-[#7B5EA7] px-5 py-5 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6 pointer-events-none" />
        <button
          data-testid="legal-back-btn"
          onClick={() => navigate("home")}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3 active:bg-white/30 transition-colors relative z-10"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <h1 className="font-heading text-xl font-bold text-white relative z-10">{tx.title}</h1>
        <p className="text-white/70 text-xs mt-0.5 font-body relative z-10">{tx.subtitle}</p>
      </div>

      {/* ── CONTENT (starts below header, scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-8 space-y-3">
        {sections.map(({ key, data }) => {
          const Icon = sectionIcons[key];
          const colors = sectionColors[key];
          const isOpen = expanded === key;

          return (
            <motion.div
              key={key}
              className={`bg-white border ${colors.border} rounded-2xl overflow-hidden`}
              style={{ boxShadow: "0 2px 12px -2px rgba(74,50,84,0.10)" }}
              layout
            >
              <button
                data-testid={`legal-section-${key}`}
                onClick={() => setExpanded(isOpen ? null : key)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${colors.badge}`}>
                    {data.title}
                  </span>
                  <p className="text-[#2D2331] font-heading font-semibold text-sm mt-1.5 leading-snug">
                    {data.fullName}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-[#6B5A74]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`px-4 pb-4 pt-2 ${colors.bg} border-t border-[#F0E6F7]`}>
                      <p className="text-[#4A3254] text-sm font-body leading-relaxed mb-3">
                        {data.description}
                      </p>
                      <div className="space-y-2">
                        {data.steps.map((step, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className={`w-5 h-5 rounded-full ${colors.badge} flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5`}>
                              {i + 1}
                            </div>
                            <p className="text-[#2D2331] text-sm font-body leading-relaxed flex-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* CTA */}
        <div className="bg-white rounded-2xl p-5 border border-[#F0E6F7]" style={{ boxShadow: "0 2px 12px -2px rgba(74,50,84,0.08)" }}>
          <p className="text-[#4A3254] text-sm font-body text-center leading-relaxed">
            Need personalized guidance? Talk to NyayaSakhi for step-by-step help.
          </p>
          <button
            data-testid="legal-chat-btn"
            onClick={() => navigate("chat")}
            className="w-full bg-[#4A3254] text-white rounded-full py-3 font-heading font-bold text-base mt-3 active:scale-[0.98] transition-all"
          >
            Talk to NyayaSakhi
          </button>
        </div>
      </div>
    </div>
  );
}
