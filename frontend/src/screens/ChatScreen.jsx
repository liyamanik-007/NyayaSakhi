
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Trash2, Sparkles, Mic, MicOff } from "lucide-react";
import axios from "axios";
import { translations } from "../translations";
import { API } from "../App";

const SPEECH_LANG_MAP = { en: "en-IN", hi: "hi-IN", ta: "ta-IN", te: "te-IN", kn: "kn-IN", mr: "mr-IN" };

export default function ChatScreen({ user, language, navigate }) {
  const tx = translations[language]?.chat || translations.en.chat;
  const [messages, setMessages]     = useState([]);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef  = useRef(null);
  const inputRef        = useRef(null);
  const recognitionRef  = useRef(null);
  const sessionId = `nyaya_${user.phone.replace(/\D/g, "")}`;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/chat/history/${sessionId}`);
        setMessages(
          res.data.messages?.length
            ? res.data.messages
            : [{ role: "assistant", content: tx.welcome, timestamp: new Date().toISOString() }]
        );
      } catch {
        setMessages([{ role: "assistant", content: tx.welcome, timestamp: new Date().toISOString() }]);
      }
    })();
  }, [sessionId]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => () => recognitionRef.current?.stop(), []);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setMessages((p) => [...p, { role: "user", content: text, timestamp: new Date().toISOString() }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/chat`, { session_id: sessionId, message: text, language, user_name: user.name, user_age: user.age || null });
      setMessages((p) => [...p, { role: "assistant", content: res.data.response, timestamp: new Date().toISOString() }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "I'm here for you. Please try again, or call Women Helpline 1091 if urgent.", timestamp: new Date().toISOString() }]);
    } finally { setLoading(false); }
  };

  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return; }
    const r = new SR();
    r.lang = SPEECH_LANG_MAP[language] || "en-IN";
    r.continuous = false; r.interimResults = false;
    r.onresult = (e) => { setInput((p) => p ? `${p} ${e.results[0][0].transcript}` : e.results[0][0].transcript); setIsRecording(false); };
    r.onend = r.onerror = () => setIsRecording(false);
    recognitionRef.current = r; r.start(); setIsRecording(true);
  };

  const clearChat = async () => {
    try { await axios.delete(`${API}/chat/session/${sessionId}`); } catch {}
    setMessages([{ role: "assistant", content: tx.welcome, timestamp: new Date().toISOString() }]);
  };

  const hasSpeech = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const formatMessage = (text) =>
    text.split("\n").map((line, i) => {
      if (/^\d+\./.test(line.trim()))
        return <div key={i} className="flex gap-2 mt-1"><span className="text-[#D8B4E2] font-bold flex-shrink-0">{line.match(/^\d+/)[0]}.</span><span>{line.replace(/^\d+\./, "").trim()}</span></div>;
      if (line.startsWith("**") && line.endsWith("**"))
        return <p key={i} className="font-bold mt-1">{line.slice(2, -2)}</p>;
      return line ? <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p> : <div key={i} className="h-1" />;
    });

  return (
    <div
      className="flex flex-col bg-[#FDFBFF] h-full"
      style={{ width: "100%" }}
    >
      {/* ── HEADER ── */}
      <div className="bg-white border-b border-[#F0E6F7] px-4 py-2.5 flex items-center gap-3 flex-shrink-0 shadow-sm">
        <button data-testid="chat-back-btn" onClick={() => navigate("home")}
          className="w-8 h-8 rounded-full bg-[#F0E6F7] flex items-center justify-center active:bg-[#E5D5F0] transition-colors flex-shrink-0">
          <ArrowLeft className="w-4 h-4 text-[#4A3254]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#4A3254] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-bold text-[#2D2331] text-sm leading-tight">{tx.title}</h2>
          <p className="text-[#6B5A74] text-xs font-body truncate">{tx.subtitle}</p>
        </div>
        <button data-testid="clear-chat-btn" onClick={clearChat} title={tx.clearChat}
          className="w-8 h-8 rounded-full bg-[#FEF2F2] flex items-center justify-center active:bg-[#FEE2E2] transition-colors flex-shrink-0">
          <Trash2 className="w-3.5 h-3.5 text-[#DC2626]" />
        </button>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="px-4 py-2 bg-[#FDFBFF] border-b border-[#F0E6F7] overflow-x-auto flex gap-2 flex-shrink-0 chat-scroll" style={{ scrollbarWidth: "none" }}>
        {tx.quickActions.map((action, i) => (
          <button key={i} data-testid={`quick-action-${i}`} onClick={() => sendMessage(action)} disabled={loading}
            className="flex-shrink-0 bg-[#F0E6F7] text-[#4A3254] text-xs font-semibold px-3 py-1.5 rounded-full active:bg-[#E5D5F0] disabled:opacity-50 font-body whitespace-nowrap">
            {action}
          </button>
        ))}
      </div>

      {/* ── MESSAGES (scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scroll">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#4A3254] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                </div>
              )}
              <div data-testid={`msg-${msg.role}-${i}`}
                className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-body ${msg.role === "user" ? "bg-[#4A3254] text-white rounded-br-sm" : "bg-white border border-[#F0E6F7] text-[#2D2331] rounded-bl-sm shadow-sm"}`}>
                {formatMessage(msg.content)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#4A3254] flex items-center justify-center mr-2 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
            </div>
            <div className="bg-white border border-[#F0E6F7] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center">
                {[0,1,2].map((j) => (
                  <motion.div key={j} animate={{ y: [0,-5,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.15 }}
                    className="w-2 h-2 rounded-full bg-[#D8B4E2]" />
                ))}
                <span className="text-[#6B5A74] text-xs ml-2 font-body">{tx.thinking}</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── INPUT BAR ── */}
      <div className="px-4 py-3 bg-white border-t border-[#F0E6F7] flex-shrink-0 relative z-[10001]">
        {isRecording && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-2 px-1">
            <motion.div animate={{ scale: [1,1.3,1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs text-red-500 font-medium font-body">Listening... speak now</span>
          </motion.div>
        )}
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-[#FDFBFF] border-2 border-[#F0E6F7] focus-within:border-[#D8B4E2] focus-within:ring-4 focus-within:ring-[#D8B4E2]/20 rounded-2xl px-4 py-3 transition-all">
            <textarea ref={inputRef} data-testid="chat-input" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={tx.placeholder} rows={1} disabled={loading}
              className="w-full bg-transparent text-[#2D2331] placeholder:text-[#6B5A74]/50 text-sm outline-none resize-none font-body"
              style={{ maxHeight: "100px" }} />
          </div>
          {hasSpeech && (
            <button data-testid="voice-btn" onClick={toggleVoice} disabled={loading}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-[0.95] flex-shrink-0 disabled:opacity-40 ${isRecording ? "bg-red-500 text-white shadow-lg shadow-red-300" : "bg-[#F0E6F7] text-[#4A3254] active:bg-[#E5D5F0]"}`}>
              {isRecording ? <MicOff className="w-[18px] h-[18px]" /> : <Mic className="w-[18px] h-[18px]" />}
            </button>
          )}
          <button data-testid="send-btn" onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-full bg-[#4A3254] text-white flex items-center justify-center active:bg-[#3A2642] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.95] flex-shrink-0">
            <Send className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}