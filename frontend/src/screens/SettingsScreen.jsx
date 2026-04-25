import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Users, Plus, Pencil, Trash2, X, LogOut, Globe, Check } from "lucide-react";
import { translations, LANGUAGES } from "../translations";

const CONTACTS_KEY = "nyayaContacts";
const MAX_CONTACTS = 5;

export const loadContacts = () => {
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
const saveContacts = (list) => localStorage.setItem(CONTACTS_KEY, JSON.stringify(list));

export default function SettingsScreen({ user, language, setLanguage, navigate, onProfileUpdate, onLogout }) {
  const tx = translations[language]?.settings || translations.en.settings;

  const [name,  setName]  = useState(user.name || "");
  const [age,   setAge]   = useState(user.age?.toString() || "");
  const [savedFlash, setSavedFlash] = useState(false);
  const [contacts, setContacts] = useState(loadContacts());
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [draft, setDraft] = useState({ name: "", phone: "", relation: "" });

  useEffect(() => { saveContacts(contacts); }, [contacts]);

  const saveProfile = () => {
    const ageNum = parseInt(age, 10);
    if (!name.trim() || !(ageNum >= 13 && ageNum <= 100)) return;
    onProfileUpdate({ name: name.trim(), age: ageNum, phone: user.phone });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  const openAdd = () => { setDraft({ name: "", phone: "", relation: "" }); setEditing("new"); };
  const openEdit = (c) => { setDraft({ name: c.name, phone: c.phone, relation: c.relation }); setEditing(c.id); };
  const closeEditor = () => { setEditing(null); setDraft({ name: "", phone: "", relation: "" }); };

  const persistDraft = () => {
    if (!draft.name.trim() || !draft.phone.trim()) return;
    if (editing === "new") {
      if (contacts.length >= MAX_CONTACTS) return;
      setContacts([...contacts, { id: Date.now().toString(36), ...draft }]);
    } else {
      setContacts(contacts.map((c) => (c.id === editing ? { ...c, ...draft } : c)));
    }
    closeEditor();
  };

  const removeContact = (id) => setContacts(contacts.filter((c) => c.id !== id));

  return (
    <div className="flex flex-col h-full bg-[#F4EEF9]" style={{ width: "100%" }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A3254] to-[#7B5EA7] px-5 py-5 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6 pointer-events-none" />
        <button
          data-testid="settings-back-btn"
          onClick={() => navigate("home")}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3 active:bg-white/30 transition-colors relative z-10"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <h1 className="font-heading text-xl font-bold text-white relative z-10">{tx.title}</h1>
        <p className="text-white/70 text-xs mt-0.5 font-body relative z-10">{tx.subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-4">
        {/* Profile */}
        <section className="bg-white border border-[#F0E6F7] rounded-2xl p-5"
          style={{ boxShadow: "0 2px 12px -2px rgba(74,50,84,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-[#4A3254]" />
            <h2 className="font-heading font-bold text-[#2D2331] text-sm">{tx.profile}</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[#4A3254] text-xs font-semibold mb-1 block">{tx.nameLabel}</label>
              <input
                data-testid="settings-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] rounded-xl px-3 py-2.5 text-[#2D2331] text-sm outline-none font-body"
              />
            </div>
            <div>
              <label className="text-[#4A3254] text-xs font-semibold mb-1 block">{tx.ageLabel}</label>
              <input
                data-testid="settings-age-input"
                type="number" min="13" max="100" inputMode="numeric"
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 3))}
                className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] rounded-xl px-3 py-2.5 text-[#2D2331] text-sm outline-none font-body"
              />
            </div>

            <div>
              <label className="text-[#4A3254] text-xs font-semibold mb-1.5 block flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> {tx.languageLabel}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    data-testid={`settings-lang-${l.code}`}
                    onClick={() => setLanguage(l.code)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                      language === l.code
                        ? "bg-[#4A3254] text-white"
                        : "bg-[#F0E6F7] text-[#4A3254] active:bg-[#E5D5F0]"
                    }`}
                  >
                    {l.native}
                  </button>
                ))}
              </div>
            </div>

            <button
              data-testid="settings-save-profile-btn"
              onClick={saveProfile}
              className="w-full mt-2 bg-[#4A3254] text-white rounded-full py-2.5 font-heading font-bold text-sm active:scale-[0.98] transition-all"
            >
              {savedFlash ? `✓ ${tx.profileSaved}` : tx.saveProfile}
            </button>
          </div>
        </section>

        {/* Trusted Contacts */}
        <section className="bg-white border border-[#F0E6F7] rounded-2xl p-5"
          style={{ boxShadow: "0 2px 12px -2px rgba(74,50,84,0.08)" }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#4A3254]" />
              <div>
                <h2 className="font-heading font-bold text-[#2D2331] text-sm leading-tight">{tx.contactsTitle}</h2>
                <p className="text-[#6B5A74] text-xs mt-0.5 font-body leading-snug">{tx.contactsSub}</p>
              </div>
            </div>
          </div>

          {contacts.length === 0 && (
            <p className="text-[#6B5A74] text-xs italic mb-3 font-body">{tx.noContacts}</p>
          )}

          <div className="space-y-2 mb-3">
            <AnimatePresence initial={false}>
              {contacts.map((c) => (
                <motion.div
                  key={c.id}
                  data-testid={`contact-card-${c.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-3 bg-[#F4EEF9] rounded-xl px-3 py-2.5"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D8B4E2] to-[#7B5EA7] flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0">
                    {c.name.trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-[#2D2331] text-sm leading-tight truncate">{c.name}</p>
                    <p className="text-[#6B5A74] text-xs font-body truncate">
                      {c.relation ? `${c.relation} • ` : ""}{c.phone}
                    </p>
                  </div>
                  <button
                    data-testid={`contact-edit-${c.id}`}
                    onClick={() => openEdit(c)}
                    className="w-8 h-8 rounded-full bg-white text-[#4A3254] flex items-center justify-center active:bg-[#E5D5F0]"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    data-testid={`contact-delete-${c.id}`}
                    onClick={() => removeContact(c.id)}
                    className="w-8 h-8 rounded-full bg-white text-[#DC2626] flex items-center justify-center active:bg-red-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            data-testid="contact-add-btn"
            onClick={openAdd}
            disabled={contacts.length >= MAX_CONTACTS}
            className="w-full bg-[#F0E6F7] text-[#4A3254] rounded-full py-2.5 font-heading font-bold text-sm flex items-center justify-center gap-2 active:bg-[#E5D5F0] disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
            {contacts.length >= MAX_CONTACTS ? tx.maxReached : tx.addContact}
          </button>
        </section>

        {/* Sign out */}
        <button
          data-testid="settings-logout-btn"
          onClick={() => {
            if (window.confirm(tx.confirmLogout)) onLogout();
          }}
          className="w-full bg-white border border-red-200 text-[#DC2626] rounded-2xl py-3 font-heading font-bold text-sm flex items-center justify-center gap-2 active:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          {tx.logout}
        </button>
      </div>

      {/* Add/Edit Contact Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            data-testid="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-end"
            onClick={closeEditor}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 240 }}
              className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-[#2D2331]">
                  {editing === "new" ? tx.addContact : tx.editContact}
                </h3>
                <button
                  data-testid="contact-modal-close"
                  onClick={closeEditor}
                  className="w-8 h-8 rounded-full bg-[#F4EEF9] flex items-center justify-center active:bg-[#E5D5F0]"
                >
                  <X className="w-4 h-4 text-[#4A3254]" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { k: "name",     label: tx.contactName,     ph: tx.contactNamePh,     testid: "contact-name-input" },
                  { k: "phone",    label: tx.contactPhone,    ph: tx.contactPhonePh,    testid: "contact-phone-input", type: "tel" },
                  { k: "relation", label: tx.contactRelation, ph: tx.contactRelationPh, testid: "contact-relation-input" },
                ].map((f) => (
                  <div key={f.k}>
                    <label className="text-[#4A3254] text-xs font-semibold mb-1 block">{f.label}</label>
                    <input
                      data-testid={f.testid}
                      type={f.type || "text"}
                      value={draft[f.k]}
                      onChange={(e) => setDraft({ ...draft, [f.k]: e.target.value })}
                      placeholder={f.ph}
                      className="w-full bg-[#FDFBFF] border-2 border-[#F0E6F7] focus:border-[#D8B4E2] rounded-xl px-3 py-2.5 text-[#2D2331] text-sm outline-none font-body"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  data-testid="contact-modal-cancel"
                  onClick={closeEditor}
                  className="flex-1 bg-[#F4EEF9] text-[#4A3254] rounded-full py-3 font-heading font-bold text-sm active:bg-[#E5D5F0]"
                >
                  {tx.cancel}
                </button>
                <button
                  data-testid="contact-modal-save"
                  onClick={persistDraft}
                  disabled={!draft.name.trim() || !draft.phone.trim()}
                  className="flex-1 bg-[#4A3254] text-white rounded-full py-3 font-heading font-bold text-sm active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {tx.save}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
