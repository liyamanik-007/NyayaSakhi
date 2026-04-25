import React, { useState, useEffect } from "react";
import "@/App.css";
import { AnimatePresence, motion } from "framer-motion";
import LoginScreen from "./screens/LoginScreen";
import CalmScreen from "./screens/CalmScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LegalScreen from "./screens/LegalScreen";
import EmergencyScreen from "./screens/EmergencyScreen";
import FakeCallSetupScreen from "./screens/FakeCallSetupScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BottomNav from "./components/BottomNav";
import PanicButton from "./components/PanicButton";
import FakeCallScreen from "./components/FakeCallScreen";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

const pageTransition = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1],
};

// Screens that show the bottom nav
const NAV_SCREENS = new Set(["home", "chat", "legal", "emergency", "fakeCallSetup", "settings"]);
// Screens where the panic button is visible (hidden on chat to keep input area clean, hidden on login/calm)
const PANIC_SCREENS = new Set(["home", "legal", "emergency", "fakeCallSetup", "settings"]);

function App() {
  const [screen, setScreen] = useState("calm");
  const [user, setUser] = useState({ name: "", phone: "", age: null });
  const [language, setLanguage] = useState("en");
  const [activeFakeCall, setActiveFakeCall] = useState(null); // { name, relation } or null
  const [chatPrefill, setChatPrefill] = useState(""); // pre-filled query from quick actions

  useEffect(() => {
    const savedUser = localStorage.getItem("nyayaUser");
    const savedLang = localStorage.getItem("nyayaLang") || "en";
    setLanguage(savedLang);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.name && parsed.phone) {
          setUser(parsed);
          setScreen("calm"); // ALWAYS land on Calm first, even for returning users
        } else {
          setScreen("login");
        }
      } catch (_) {
        setScreen("login");
      }
    } else {
      setScreen("login");
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("nyayaUser", JSON.stringify(userData));
    setScreen("calm");
  };

  const handleProfileUpdate = (data) => {
    const next = { ...user, ...data };
    setUser(next);
    localStorage.setItem("nyayaUser", JSON.stringify(next));
  };

  const handleLogout = () => {
    localStorage.removeItem("nyayaUser");
    localStorage.removeItem("nyayaContacts");
    setUser({ name: "", phone: "", age: null });
    setScreen("login");
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("nyayaLang", lang);
  };

  // navigate("chat", { prefill: "..." }) — second arg optional
  const navigate = (target, opts = {}) => {
    if (typeof opts.prefill === "string") setChatPrefill(opts.prefill);
    setScreen(target);
  };
  const consumePrefill = () => { const p = chatPrefill; setChatPrefill(""); return p; };
  const startFakeCall = (caller) => setActiveFakeCall(caller);
  const closeFakeCall = () => setActiveFakeCall(null);

  const screenProps = { user, language, setLanguage: handleLanguageChange, navigate };
  const showBottomNav = NAV_SCREENS.has(screen) && !activeFakeCall;
  const showPanic     = PANIC_SCREENS.has(screen) && !activeFakeCall;

  return (
    <div className="min-h-screen bg-[#EDE3F5] flex items-start justify-center" style={{ paddingBottom: "56px" }}>
      <div
        className="w-full max-w-md bg-[#FDFBFF] shadow-[0_0_60px_-12px_rgba(74,50,84,0.2)] relative flex flex-col overflow-hidden"
        style={{ height: "calc(100vh - 56px)" }}
      >
        {/* Animated screen area */}
        <div className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="absolute inset-0 flex flex-col overflow-hidden"
            >
              {screen === "login" && (
                <LoginScreen {...screenProps} onLogin={handleLogin} />
              )}
              {screen === "calm"      && <CalmScreen {...screenProps} />}
              {screen === "home"      && <HomeScreen {...screenProps} />}
              {screen === "chat"      && <ChatScreen {...screenProps} consumePrefill={consumePrefill} />}
              {screen === "legal"     && <LegalScreen {...screenProps} />}
              {screen === "emergency" && <EmergencyScreen {...screenProps} />}
              {screen === "fakeCallSetup" && (
                <FakeCallSetupScreen {...screenProps} onStart={startFakeCall} />
              )}
              {screen === "settings" && (
                <SettingsScreen
                  {...screenProps}
                  onProfileUpdate={handleProfileUpdate}
                  onLogout={handleLogout}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Panic SOS */}
        {showPanic && <PanicButton language={language} user={user} />}

        {/* Bottom navigation */}
        {showBottomNav && (
          <BottomNav active={screen} navigate={navigate} language={language} />
        )}

        {/* Full-screen fake call overlay */}
        <AnimatePresence>
          {activeFakeCall && (
            <FakeCallScreen
              caller={activeFakeCall}
              language={language}
              onClose={closeFakeCall}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
