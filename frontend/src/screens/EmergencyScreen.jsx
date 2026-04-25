import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, AlertTriangle, CheckCircle, PhoneIncoming } from "lucide-react";
import { translations } from "../translations";

const helplines = [
  { key: "womenHelpline", number: "1091",       icon: "♀", color: "from-[#4A3254] to-[#7B5EA7]", urgent: true  },
  { key: "police",        number: "100",        icon: "🛡", color: "from-[#DC2626] to-[#EF4444]", urgent: true  },
  { key: "ncw",           number: "7827170170", icon: "⚖", color: "from-[#4F46E5] to-[#6366F1]", urgent: false },
  { key: "childline",     number: "1098",       icon: "🤝", color: "from-[#0891B2] to-[#06B6D4]", urgent: false },
];

export default function EmergencyScreen({ navigate, language }) {
  const tx   = translations[language]?.emergency || translations.en.emergency;
  const fcTx = translations[language]?.fakeCallSetup || translations.en.fakeCallSetup;
  const tips = [tx.tip1, tx.tip2, tx.tip3];

  return (
    <div
      className="flex flex-col h-full bg-[#F4EEF9]"
      style={{ width: "100%" }}
    >
      {/* ── HEADER (static, no overlap) ── */}
      <div className="bg-gradient-to-br from-[#991B1B] to-[#DC2626] px-5 py-5 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6 pointer-events-none" />
        <button
          data-testid="emergency-back-btn"
          onClick={() => navigate("home")}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3 active:bg-white/30 transition-colors relative z-10"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="flex items-center gap-2 mb-0.5 relative z-10">
          <AlertTriangle className="w-5 h-5 text-white/90" strokeWidth={1.5} />
          <h1 className="font-heading text-xl font-bold text-white">{tx.title}</h1>
        </div>
        <p className="text-white/80 text-xs font-body relative z-10">{tx.subtitle}</p>
      </div>

      {/* ── CONTENT (starts below header, scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-3">

        {/* Alert banner */}
        <div className="bg-[#FEF2F2] border border-red-200 rounded-2xl px-4 py-3 flex gap-3 items-start">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-[#991B1B] text-sm font-body font-medium leading-relaxed">{tx.safeMessage}</p>
        </div>

        {/* Helpline grid */}
        <div className="grid grid-cols-2 gap-3">
          {helplines.map((h, i) => (
            <motion.a
              key={h.key}
              data-testid={`helpline-${h.key}`}
              href={`tel:${h.number}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.07 }}
              className={`bg-gradient-to-br ${h.color} rounded-2xl p-4 flex flex-col items-center justify-center text-white text-center min-h-[110px] active:scale-[0.97] transition-all shadow-md ${h.urgent ? "emergency-pulse" : ""}`}
            >
              <span className="text-xl mb-1">{h.icon}</span>
              <span className="font-heading font-bold text-2xl tracking-wide leading-none">{h.number}</span>
              <span className="text-white/85 text-xs mt-1 font-body leading-tight">{tx[h.key]}</span>
              <div className="mt-2 flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-1">
                <Phone className="w-3 h-3" />
                <span className="text-xs font-semibold">{tx.callNow}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Safety tips */}
        <div className="bg-white border border-[#F0E6F7] rounded-2xl p-4" style={{ boxShadow: "0 2px 8px -2px rgba(74,50,84,0.08)" }}>
          <h3 className="font-heading font-bold text-[#2D2331] text-sm mb-3">Safety Tips</h3>
          <div className="space-y-2.5">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <CheckCircle className="w-4 h-4 text-[#4A3254] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-[#2D2331] text-sm font-body leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fake Call card */}
        <button
          data-testid="open-fakecall-setup-btn"
          onClick={() => navigate("fakeCallSetup")}
          className="w-full bg-gradient-to-r from-[#4A3254] to-[#7B5EA7] text-white rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-all text-left"
          style={{ boxShadow: "0 2px 12px -2px rgba(74,50,84,0.18)" }}
        >
          <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <PhoneIncoming className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-base leading-snug">{fcTx.title}</p>
            <p className="text-white/75 text-xs mt-0.5 font-body truncate">{fcTx.desc}</p>
          </div>
          <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* CTA */}
        <button
          data-testid="emergency-chat-btn"
          onClick={() => navigate("chat")}
          className="w-full bg-[#4A3254] text-white rounded-full py-4 font-heading font-bold text-base active:scale-[0.98] transition-all"
          style={{ boxShadow: "0 4px 16px -4px rgba(74,50,84,0.35)" }}
        >
          Talk to NyayaSakhi Now
        </button>
      </div>
    </div>
  );
}
