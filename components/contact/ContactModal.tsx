"use client";

import { useContact } from "@/components/contact/ContactContext";
import { supportBrands } from "@/lib/data";

export default function ContactModal() {
  const { isOpen, view, close, showMain, showBrand } = useContact();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={close}
        aria-hidden
      />

      {view.mode === "main" ? (
        // ---- Main contact view ----
        <div className="absolute bottom-24 right-6 w-[90%] max-w-[400px] glass-modal rounded-3xl p-8 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-white font-headline-md text-3xl">
              Contact Support
            </h3>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="text-white/80 hover:text-white interactive-btn"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          <p className="text-on-surface-variant font-body-md text-body-md mb-8">
            Fill the form below and we will receive your message on Telegram.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-label-md text-label-md mb-2">
                Your question <span className="text-electric-orange">*</span>
              </label>
              <div className="snake-border-container">
                <div className="snake-inner">
                  <textarea
                    className="w-full bg-white rounded-2xl p-4 text-slate-900 focus:ring-0 border-none outline-none min-h-[120px] font-body-md text-body-md block"
                    placeholder="Write your question here..."
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-primary text-on-primary font-headline-md text-body-md font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 interactive-btn shadow-lg shadow-primary/20 mt-6"
          >
            Send Message on Telegram
            <span className="material-symbols-outlined text-xl">forum</span>
          </button>

          <p className="text-on-surface-variant text-caption italic leading-tight mt-4">
            {supportBrands.map((brand, index) => (
              <span key={brand}>
                <button
                  type="button"
                  className="font-bold text-primary hover:underline"
                  onClick={() => showBrand(brand)}
                >
                  {brand}
                </button>
                {index < supportBrands.length - 2
                  ? ", "
                  : index === supportBrands.length - 2
                    ? " and "
                    : " "}
              </span>
            ))}
            have their own support channels.
          </p>
        </div>
      ) : (
        // ---- Brand-specific contact view ----
        <div className="absolute bottom-24 right-6 w-[90%] max-w-[400px] glass-modal rounded-3xl p-8 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-4">
            <button
              type="button"
              onClick={showMain}
              className="text-white/60 hover:text-white flex items-center gap-1 font-label-md text-label-md interactive-btn"
            >
              <span className="material-symbols-outlined text-xl">
                arrow_back
              </span>
              Back
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="text-white/80 hover:text-white interactive-btn"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-white font-headline-md text-2xl mb-1">
              {view.brand} Support
            </h3>
            <p className="text-on-surface-variant font-body-md text-body-md">
              Direct email support for {view.brand} partners.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-label-md text-label-md mb-2">
                Your email <span className="text-electric-orange">*</span>
              </label>
              <div className="snake-border-container">
                <div className="snake-inner flex items-center px-4">
                  <input
                    type="email"
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-900 py-3 font-body-md text-body-md"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-white font-label-md text-label-md mb-2">
                Your question <span className="text-electric-orange">*</span>
              </label>
              <div className="snake-border-container">
                <div className="snake-inner">
                  <textarea
                    className="w-full bg-white rounded-2xl p-4 text-slate-900 border-none focus:ring-0 outline-none min-h-[140px] font-body-md text-body-md block"
                    placeholder="Write your question here..."
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-white text-on-primary font-headline-md text-headline-md py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-lg mt-6"
          >
            Send Email <span className="material-symbols-outlined">mail</span>
          </button>
        </div>
      )}
    </div>
  );
}