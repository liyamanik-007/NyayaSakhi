import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X, MapPin, Users, Check } from "lucide-react";
import { translations } from "../translations";
import { loadContacts } from "../screens/SettingsScreen";

/**
 * PanicButton — floating SOS action with simulated alert.
 * Visible globally; opens a modal that simulates location sharing & contact alert.
 */
export default function PanicButton({ language, user }) {
  const [open, setOpen]       = useState(false);
  const [phase, setPhase]     = useState("confirm"); // confirm | sending | sent
  const [count, setCount]     = useState(5);
  const [contacts, setContacts] = useState([]);
  const tx = translations[language]?.panic || translations.en.panic;
  const cancelRef = useRef(null);

  // Refresh contacts every time the modal opens
  useEffect(() => {
    if (open) setContacts(loadContacts());
  }, [open]);

  useEffect(() => {
    if (!open) { setPhase("confirm"); setCount(5); return; }
    if (phase !== "sending") return;

    cancelRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(cancelRef.current);
          setPhase("sent");
          if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 300]);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(cancelRef.current);
  }, [phase, open]);

  const triggerAlert = () => setPhase("sending");
  const cancelAlert = () => {
    clearInterval(cancelRef.current);
    setOpen(false);
  };
  const close = () => setOpen(false);

  return (
    <>
      {/* Floating button */}
      <button
        data-testid="panic-button"
        onClick={() => setOpen(true)}
        className="absolute right-3 bottom-[78px] z-[9998] w-14 h-14 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(220,38,38,0.6)] active:scale-[0.94] panic-pulse"
        aria-label={tx.button}
      >
        <ShieldAlert className="w-6 h-6 text-white" strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="panic-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[9999] bg-black/55 backdrop-blur-sm flex items-end"
            onClick={phase === "sent" ? close : undefined}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 240 }}
              className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              {phase === "confirm" && (
                <>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-[#2D2331] leading-tight">{tx.title}</h3>
                      <p className="text-[#6B5A74] text-xs mt-1 font-body leading-relaxed">{tx.description}</p>
                    </div>
                    <button
                      data-testid="panic-close-btn"
                      onClick={close}
                      className="w-8 h-8 rounded-full bg-[#F4EEF9] flex items-center justify-center active:bg-[#E5D5F0]"
                    >
                      <X className="w-4 h-4 text-[#4A3254]" />
                    </button>
                  </div>

                  {/* Show actual contacts */}
                  {contacts.length > 0 && (
                    <div className="mb-3 mt-2 bg-[#F4EEF9] rounded-xl p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B5A74] mb-2">
                        {contacts.length === 1 ? "1 trusted contact" : `${contacts.length} trusted contacts`}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {contacts.map((c) => (
                          <span
                            key={c.id}
                            data-testid={`panic-contact-${c.id}`}
                            className="bg-white text-[#4A3254] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#E5D5F0]"
                          >
                            {c.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <ul className="space-y-2 mb-5 mt-3">
                    {[
                      { icon: MapPin, text: tx.willShareLocation },
                      { icon: Users,  text: contacts.length > 0 ? tx.willAlertContacts : `${tx.willAlertContacts} (add in Settings)` },
                    ].map(({ icon: Ic, text }, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[#4A3254] text-sm font-body">
                        <Ic className="w-4 h-4 text-[#DC2626]" strokeWidth={1.5} />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    data-testid="panic-trigger-btn"
                    onClick={triggerAlert}
                    className="w-full bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white rounded-full py-3.5 font-heading font-bold text-base active:scale-[0.98]"
                  >
                    {tx.confirm}
                  </button>
                </>
              )}

              {phase === "sending" && (
                <div className="text-center py-4">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center mb-3"
                  >
                    <ShieldAlert className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-bold text-[#2D2331]">{tx.sendingTitle}</h3>
                  <p className="text-[#6B5A74] text-xs mt-1 mb-5 font-body">
                    {tx.cancelHint.replace("{n}", count)}
                  </p>
                  <button
                    data-testid="panic-cancel-btn"
                    onClick={cancelAlert}
                    className="w-full bg-[#F4EEF9] text-[#4A3254] rounded-full py-3.5 font-heading font-bold text-base active:bg-[#E5D5F0]"
                  >
                    {tx.cancel}
                  </button>
                </div>
              )}

              {phase === "sent" && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 14 }}
                    className="mx-auto w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-3"
                  >
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="font-heading text-lg font-bold text-[#2D2331]">{tx.sentTitle}</h3>
                  <p className="text-[#6B5A74] text-xs mt-1 mb-4 font-body leading-relaxed">
                    {contacts.length > 0
                      ? `Notified: ${contacts.map((c) => c.name).join(", ")}. Help is on the way.`
                      : tx.sentMessage}
                  </p>
                  <button
                    data-testid="panic-done-btn"
                    onClick={close}
                    className="w-full bg-[#4A3254] text-white rounded-full py-3.5 font-heading font-bold text-base active:scale-[0.98]"
                  >
                    {tx.done}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
