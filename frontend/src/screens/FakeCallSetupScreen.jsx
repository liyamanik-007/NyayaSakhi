import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, PhoneIncoming } from "lucide-react";
import { translations } from "../translations";

export default function FakeCallSetupScreen({ navigate, language, onStart }) {
  const tx = translations[language]?.fakeCallSetup || translations.en.fakeCallSetup;
  const callTx = translations[language]?.fakeCall || translations.en.fakeCall;
  const [name, setName]       = useState("Mom");
  const [relation, setRel]    = useState(callTx.incomingCall || "Mobile");

  const start = () => onStart({ name: name.trim() || "Unknown", relation: relation.trim() });

  return (
    <div className="flex flex-col h-full bg-[#F4EEF9]" style={{ width: "100%" }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A3254] to-[#7B5EA7] px-5 py-5 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6 pointer-events-none" />
        <button
          data-testid="fakecall-setup-back-btn"
          onClick={() => navigate("emergency")}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3 active:bg-white/30 transition-colors relative z-10"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="flex items-center gap-2 relative z-10">
          <PhoneIncoming className="w-5 h-5 text-white/90" strokeWidth={1.5} />
          <h1 className="font-heading text-xl font-bold text-white">{tx.title}</h1>
        </div>
        <p className="text-white/70 text-xs mt-0.5 font-body relative z-10">{tx.desc}</p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6 space-y-4">
        <div>
          <label className="text-[#4A3254] text-xs font-semibold mb-2 block uppercase tracking-wide">
            {tx.quick}
          </label>
          <div className="flex flex-wrap gap-2">
            {tx.presets.map((p) => (
              <button
                key={p}
                data-testid={`fakecall-preset-${p}`}
                onClick={() => setName(p)}
                className={`text-sm font-semibold px-3.5 py-2 rounded-full transition-all active:scale-[0.96] ${
                  name === p
                    ? "bg-[#4A3254] text-white"
                    : "bg-white border border-[#F0E6F7] text-[#4A3254] active:bg-[#F4EEF9]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#F0E6F7] rounded-2xl p-5 space-y-4"
          style={{ boxShadow: "0 2px 12px -2px rgba(74,50,84,0.08)" }}
        >
          <div>
            <label className="text-[#4A3254] text-sm font-semibold mb-1.5 block">{tx.callerName}</label>
            <input
              data-testid="fakecall-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={tx.callerNamePlaceholder}
              className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] focus:ring-4 focus:ring-[#D8B4E2]/20 rounded-2xl px-4 py-3 text-[#2D2331] text-base outline-none font-body transition-all"
            />
          </div>
          <div>
            <label className="text-[#4A3254] text-sm font-semibold mb-1.5 block">{tx.relation}</label>
            <input
              data-testid="fakecall-relation-input"
              value={relation}
              onChange={(e) => setRel(e.target.value)}
              placeholder={tx.relationPlaceholder}
              className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] focus:ring-4 focus:ring-[#D8B4E2]/20 rounded-2xl px-4 py-3 text-[#2D2331] text-base outline-none font-body transition-all"
            />
          </div>
        </div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2d1b39] to-[#4A3254] rounded-2xl p-5 text-white text-center"
        >
          <p className="text-white/60 text-xs font-body mb-2">{callTx.incoming}</p>
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#7B5EA7] flex items-center justify-center mb-2">
            <span className="font-heading text-2xl font-bold">
              {(name || "?").trim().charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="font-heading font-bold text-lg leading-tight">{name || "Unknown"}</p>
          <p className="text-white/65 text-xs font-body">{relation}</p>
        </motion.div>

        <button
          data-testid="fakecall-start-btn"
          onClick={start}
          className="w-full bg-gradient-to-r from-[#4A3254] to-[#7B5EA7] text-white rounded-full py-4 font-heading font-bold text-base active:scale-[0.98] transition-all"
          style={{ boxShadow: "0 4px 16px -4px rgba(74,50,84,0.4)" }}
        >
          {tx.startBtn}
        </button>
      </div>
    </div>
  );
}
