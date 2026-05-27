"use client";

import { useContact } from "@/components/contact/ContactContext";

export default function HelpButton() {
  const { open } = useContact();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Contact support"
      className="fixed bottom-6 right-6 w-14 h-14 bg-electric-orange text-white rounded-full shadow-lg shadow-electric-orange/30 flex items-center justify-center z-50 interactive-btn"
    >
      <span className="material-symbols-outlined">support_agent</span>
    </button>
  );
}
