import React from "react";
import { Home, MessageCircleHeart, Phone } from "lucide-react";
import { translations } from "../translations";

// 3-tab focused nav: Home / Chat / Emergency. Calm is the entry experience, not a tab.
const items = [
  { key: "home",      icon: Home,                screen: "home"      },
  { key: "chat",      icon: MessageCircleHeart,  screen: "chat"      },
  { key: "emergency", icon: Phone,               screen: "emergency" },
];

export default function BottomNav({ active, navigate, language }) {
  const tx = translations[language]?.nav || translations.en.nav;
  return (
    <nav
      data-testid="bottom-nav"
      className="flex-shrink-0 bg-white/95 backdrop-blur border-t border-[#F0E6F7] px-2 py-1.5 relative z-[9997]"
      style={{ boxShadow: "0 -2px 14px -4px rgba(74,50,84,0.12)" }}
    >
      <div className="grid grid-cols-3 gap-1">
        {items.map(({ key, icon: Icon, screen }) => {
          const isActive = active === screen;
          return (
            <button
              key={key}
              data-testid={`bottom-nav-${key}`}
              onClick={() => navigate(screen)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl transition-all active:scale-[0.94] ${
                isActive
                  ? "bg-[#F0E6F7] text-[#4A3254]"
                  : "text-[#6B5A74] active:bg-[#F4EEF9]"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "" : "opacity-70"}`} strokeWidth={isActive ? 2 : 1.5} />
              <span className={`text-[10px] font-body leading-none ${isActive ? "font-bold" : "font-medium"}`}>
                {tx[key] || key}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}