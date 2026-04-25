import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircleHeart, Scale, Phone, Wind, Globe, ChevronDown, Settings as SettingsIcon } from "lucide-react";
import { translations, LANGUAGES } from "../translations";

const cards = [
  {
    key: "chat",
    icon: MessageCircleHeart,
    screen: "chat",
    bg: "from-[#4A3254] to-[#7B5EA7]",
    iconBg: "bg-white/20",
    textColor: "text-white",
    subColor: "text-white/80",
  },
  {
    key: "rights",
    icon: Scale,
    screen: "legal",
    bg: "from-[#F0E6F7] to-[#E5D5F0]",
    iconBg: "bg-[#4A3254]/10",
    textColor: "text-[#2D2331]",
    subColor: "text-[#6B5A74]",
    iconColor: "text-[#4A3254]",
  },
  {
    key: "emergency",
    icon: Phone,
    screen: "emergency",
    bg: "from-[#FEF2F2] to-[#FEE2E2]",
    iconBg: "bg-red-100",
    textColor: "text-[#991B1B]",
    subColor: "text-[#DC2626]/80",
    iconColor: "text-[#DC2626]",
  },
  {
    key: "calm",
    icon: Wind,
    screen: "calm",
    bg: "from-[#F4EEF9] to-[#EDE3F5]",
    iconBg: "bg-[#D8B4E2]/30",
    textColor: "text-[#2D2331]",
    subColor: "text-[#6B5A74]",
    iconColor: "text-[#4A3254]",
  },
];

const containerVariants = { animate: { transition: { staggerChildren: 0.08 } } };
const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function HomeScreen({ user, language, setLanguage, navigate }) {
  const tx = translations[language] || translations.en;
  const [showLang, setShowLang] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    if (!showLang) return;
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setShowLang(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [showLang]);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div
      className="flex flex-col h-full bg-[#F4EEF9]"
      style={{ width: "100%" }}
    >
      {/* ── HEADER (fixed height ~130px, no overlap) ── */}
      <div
        className="bg-gradient-to-br from-[#4A3254] to-[#7B5EA7] px-5 py-5 relative overflow-hidden flex-shrink-0"
        style={{ minHeight: 130 }}
      >
        {/* decorative circle */}
        <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/5 -translate-y-8 translate-x-8 pointer-events-none" />

        {/* greeting row + language toggle */}
        <div className="flex items-start justify-between relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-w-0 pr-3"
          >
            <p className="text-[#D8B4E2] text-xs font-medium font-body">
              {tx.home.greeting},
            </p>
            <h1 className="font-heading text-2xl font-bold text-white leading-tight truncate">
              {user.name}
            </h1>
            <p className="text-white/60 text-xs mt-1 font-body">{tx.home.subtitle}</p>
          </motion.div>

          {/* Language dropdown + Settings */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              data-testid="home-settings-btn"
              onClick={() => navigate("settings")}
              className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center active:bg-white/30 select-none"
              aria-label="Settings"
            >
              <SettingsIcon className="w-4 h-4" strokeWidth={1.8} />
            </button>
            <div ref={langRef} className="relative">
              <button
                data-testid="home-lang-btn"
                onPointerDown={() => setShowLang((v) => !v)}
                className="bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1.5 active:bg-white/30 select-none whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{currentLang.native}</span>
                <ChevronDown
                  className={`w-3 h-3 flex-shrink-0 transition-transform ${showLang ? "rotate-180" : ""}`}
                />
              </button>

              {showLang && (
                <div className="absolute top-10 right-0 bg-white border border-[#F0E6F7] rounded-2xl shadow-2xl z-[9999] w-36 overflow-hidden">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      data-testid={`home-lang-${lang.code}`}
                      onPointerDown={() => {
                        setLanguage(lang.code);
                        setShowLang(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold select-none ${
                        language === lang.code
                          ? "bg-[#F0E6F7] text-[#4A3254]"
                          : "text-[#2D2331] active:bg-[#F4EEF9]"
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT (normal flow, starts below header) ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-8 space-y-3">
        <motion.div variants={containerVariants} initial="initial" animate="animate">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.key}
                data-testid={`nav-${card.key}`}
                variants={cardVariants}
                onPointerDown={() => navigate(card.screen)}
                className={`w-full bg-gradient-to-r ${card.bg} rounded-2xl p-4 flex items-center gap-4 mb-3 active:scale-[0.98] text-left select-none`}
                style={{
                  boxShadow: "0 2px 12px -2px rgba(74,50,84,0.14)",
                  borderRadius: 20,
                }}
              >
                <div
                  className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon
                    className={`w-5 h-5 ${card.iconColor || "text-white"}`}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-heading font-bold text-base leading-snug ${card.textColor}`}
                  >
                    {tx.home[card.key]}
                  </p>
                  <p className={`text-xs ${card.subColor} mt-0.5 font-body truncate`}>
                    {tx.home[`${card.key}Sub`]}
                  </p>
                </div>

                <svg
                  className={`w-4 h-4 ${card.textColor} opacity-40 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            );
          })}
        </motion.div>

        <p className="text-center text-[#6B5A74] text-xs pt-1 leading-relaxed">
          Everything you share is private and confidential.
        </p>
      </div>
    </div>
  );
}
