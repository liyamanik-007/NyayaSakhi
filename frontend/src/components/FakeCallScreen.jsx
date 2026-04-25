import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Mic, Volume2, MessageSquare } from "lucide-react";
import { translations } from "../translations";

/**
 * FakeCallScreen — full-screen simulated incoming call.
 * Generates a "ring-ring" tone via Web Audio API (no asset needed).
 *
 * Props:
 *  - caller: { name: string, relation: string }
 *  - language: current ui language code
 *  - onClose: () => void  (decline or hang up after accept)
 */
export default function FakeCallScreen({ caller, language, onClose }) {
  const tx = translations[language]?.fakeCall || translations.en.fakeCall;
  const [accepted, setAccepted] = useState(false);
  const [seconds, setSeconds]   = useState(0);
  const audioCtxRef  = useRef(null);
  const ringTimerRef = useRef(null);
  const tickRef      = useRef(null);

  // Start ringtone on mount
  useEffect(() => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    audioCtxRef.current = ctx;

    const playRing = () => {
      // Two short beeps (classic ring-ring pattern: ~0.4s on, 0.2s off, 0.4s on, then ~2s pause)
      const now = ctx.currentTime;
      [0, 0.6].forEach((offset) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, now + offset);
        const o2 = ctx.createOscillator();
        o2.type = "sine";
        o2.frequency.setValueAtTime(620, now + offset);
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.18, now + offset + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.42);
        osc.connect(gain); o2.connect(gain); gain.connect(ctx.destination);
        osc.start(now + offset); o2.start(now + offset);
        osc.stop(now + offset + 0.45); o2.stop(now + offset + 0.45);
      });
    };

    // play first ring then loop every 2.6s
    playRing();
    ringTimerRef.current = setInterval(playRing, 2600);

    return () => {
      clearInterval(ringTimerRef.current);
      try { ctx.close(); } catch (_) {}
    };
  }, []);

  // Stop ringtone when accepted, start call timer
  useEffect(() => {
    if (!accepted) return;
    clearInterval(ringTimerRef.current);
    tickRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(tickRef.current);
  }, [accepted]);

  // Vibrate on incoming (when supported)
  useEffect(() => {
    if (accepted) return;
    if (navigator.vibrate) {
      const id = setInterval(() => navigator.vibrate([400, 200, 400]), 1800);
      return () => { clearInterval(id); navigator.vibrate(0); };
    }
  }, [accepted]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleAccept  = () => setAccepted(true);
  const handleDecline = () => onClose();

  return (
    <motion.div
      data-testid="fake-call-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-[10000] flex flex-col text-white"
      style={{
        background:
          "linear-gradient(180deg, #1f1228 0%, #2d1b39 40%, #4A3254 100%)",
      }}
    >
      {/* Top status bar (fake) */}
      <div className="flex justify-between items-center px-6 pt-4 pb-1 text-xs font-body text-white/60">
        <span>{accepted ? formatTime(seconds) : tx.incoming}</span>
        <span>•••</span>
      </div>

      {/* Caller block */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-white/60 text-sm mb-2 font-body">
          {accepted ? tx.onCall : tx.incomingCall}
        </p>

        <motion.div
          animate={accepted ? { scale: 1 } : { scale: [1, 1.06, 1] }}
          transition={{ duration: 1.4, repeat: accepted ? 0 : Infinity, ease: "easeInOut" }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#7B5EA7] flex items-center justify-center mb-5 shadow-[0_0_60px_rgba(216,180,226,0.45)]"
        >
          <span className="font-heading text-5xl font-bold text-white">
            {(caller?.name || "?").trim().charAt(0).toUpperCase()}
          </span>
        </motion.div>

        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {caller?.name || "Unknown"}
        </h1>
        {caller?.relation && (
          <p className="text-white/70 text-sm mt-1 font-body">{caller.relation}</p>
        )}
        {accepted && (
          <p className="text-emerald-300/90 text-xs mt-3 font-body">
            {tx.connected} • {formatTime(seconds)}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-8 pb-12 pt-4">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="incoming"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="flex justify-between items-center"
            >
              <button
                data-testid="fake-call-decline-btn"
                onClick={handleDecline}
                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center active:scale-[0.94] shadow-[0_8px_24px_-6px_rgba(239,68,68,0.7)]"
              >
                <PhoneOff className="w-7 h-7 text-white" />
              </button>
              <p className="text-white/50 text-xs font-body">{tx.swipeHint}</p>
              <button
                data-testid="fake-call-accept-btn"
                onClick={handleAccept}
                className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center active:scale-[0.94] shadow-[0_8px_24px_-6px_rgba(16,185,129,0.7)]"
              >
                <Phone className="w-7 h-7 text-white" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="oncall"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[Mic, Volume2, MessageSquare].map((Ic, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <Ic className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                  </div>
                ))}
              </div>
              <button
                data-testid="fake-call-end-btn"
                onClick={handleDecline}
                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center active:scale-[0.94] shadow-[0_8px_24px_-6px_rgba(239,68,68,0.7)]"
              >
                <PhoneOff className="w-7 h-7 text-white" />
              </button>
              <p className="text-white/50 text-xs font-body mt-2">{tx.endCall}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
