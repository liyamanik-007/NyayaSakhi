import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Globe, ChevronDown } from "lucide-react";
import { translations, LANGUAGES } from "../translations";

export default function LoginScreen({ language, setLanguage, onLogin }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [showLangPicker, setShowLangPicker] = useState(false);
  const langRef = useRef(null);
  const tx = translations[language]?.login || translations.en.login;
  const appTx = translations[language] || translations.en;

  // Close dropdown on outside click/tap
  useEffect(() => {
    if (!showLangPicker) return;
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setShowLangPicker(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [showLangPicker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    if (name.trim() && phone.trim() && ageNum >= 13 && ageNum <= 100) {
      onLogin({ name: name.trim(), phone: phone.trim(), age: ageNum });
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#FDFBFF] px-6 py-8 relative">
      {/* Language Selector */}
      <div className="flex justify-end mb-3" ref={langRef}>
        <button
          data-testid="language-toggle-btn"
          onPointerDown={() => setShowLangPicker((v) => !v)}
          className="bg-[#F0E6F7] text-[#4A3254] text-sm font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 active:bg-[#E5D5F0] select-none"
        >
          <Globe className="w-4 h-4" />
          <span>{currentLang.native}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLangPicker ? "rotate-180" : ""}`} />
        </button>

        {showLangPicker && (
          <div className="absolute top-16 right-6 bg-white border border-[#F0E6F7] rounded-2xl shadow-2xl z-[9999] w-40 overflow-hidden">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                data-testid={`lang-option-${lang.code}`}
                onPointerDown={() => { setLanguage(lang.code); setShowLangPicker(false); }}
                className={`w-full text-left px-5 py-3.5 text-sm font-semibold select-none ${
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

      {/* Logo & Title */}
      <motion.div
        className="flex flex-col items-center mb-8 mt-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#4A3254] flex items-center justify-center mb-3 shadow-lg shadow-[#D8B4E2]/40">
          <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#2D2331] tracking-tight">
          {appTx.appName}
        </h1>
        <p className="text-[#6B5A74] text-xs mt-1.5 text-center">{appTx.tagline}</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="bg-white border border-[#F0E6F7] rounded-3xl p-6 shadow-[0_4px_24px_-8px_rgba(216,180,226,0.3)]"
      >
        <h2 className="font-heading text-xl font-bold text-[#2D2331] mb-0.5">{tx.welcome}</h2>
        <p className="text-[#6B5A74] text-sm mb-5">{tx.safeSpace}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[#4A3254] text-sm font-semibold mb-1.5 block">{tx.nameLabel}</label>
            <input
              data-testid="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={tx.namePlaceholder}
              className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] focus:ring-4 focus:ring-[#D8B4E2]/20 rounded-2xl px-4 py-3.5 text-[#2D2331] placeholder:text-[#6B5A74]/50 transition-all text-base outline-none font-body"
              required
            />
          </div>
          <div>
            <label className="text-[#4A3254] text-sm font-semibold mb-1.5 block">{tx.phoneLabel}</label>
            <input
              data-testid="phone-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={tx.phonePlaceholder}
              className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] focus:ring-4 focus:ring-[#D8B4E2]/20 rounded-2xl px-4 py-3.5 text-[#2D2331] placeholder:text-[#6B5A74]/50 transition-all text-base outline-none font-body"
              required
            />
          </div>
          <div>
            <label className="text-[#4A3254] text-sm font-semibold mb-1.5 block">{tx.ageLabel}</label>
            <input
              data-testid="age-input"
              type="number"
              min="13"
              max="100"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder={tx.agePlaceholder}
              className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] focus:ring-4 focus:ring-[#D8B4E2]/20 rounded-2xl px-4 py-3.5 text-[#2D2331] placeholder:text-[#6B5A74]/50 transition-all text-base outline-none font-body"
              required
            />
          </div>
          <button
            data-testid="login-submit-btn"
            type="submit"
            disabled={!name.trim() || !phone.trim() || !(parseInt(age, 10) >= 13 && parseInt(age, 10) <= 100)}
            className="w-full bg-[#4A3254] text-white hover:bg-[#3A2642] disabled:opacity-40 disabled:cursor-not-allowed rounded-full py-4 font-heading font-bold text-lg transition-all active:scale-[0.98] mt-1"
          >
            {tx.continueBtn}
          </button>
        </form>
      </motion.div>

      <p className="text-center text-[#6B5A74] text-xs mt-6 leading-relaxed">
        Your information is private and never shared.
      </p>
    </div>
  );
}
