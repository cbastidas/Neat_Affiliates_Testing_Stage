// BluffbetSignupModal.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Bluffbet Terms slug (based on your DB)
 */
const BLUFFBET_TERMS_SLUG = "bluffbet-terms-of-use";

/**
 * Modal that loads Terms of Use HTML from Supabase table: "terms"
 * It fetches by "slug" and renders HTML stored in "content".
 */
function TermsOfUseModal({
  isOpen,
  onClose,
  slug,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  slug: string | null;
  title?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Close on ESC
//  useEffect(() => {
//    if (!isOpen) return;
//
//    const handler = (e: KeyboardEvent) => {
//      if (e.key === "Escape") onClose();
//    };
//
//    document.addEventListener("keydown", handler);
//    return () => document.removeEventListener("keydown", handler);
//  }, [isOpen, onClose]);

  // Load terms by slug
  useEffect(() => {
    if (!isOpen || !slug) return;

    const fetchTerms = async () => {
      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase
        .from("terms")
        .select("content")
        .eq("slug", slug)
        .single();

      if (error) {
        setHtmlContent("");
        setErrorMsg(`Could not load Terms of Use for slug "${slug}". ${error.message}`);
      } else {
        setHtmlContent(data?.content ?? "");
      }

      setLoading(false);
    };

    fetchTerms();
  }, [isOpen, slug]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-2 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      //onClick={(e) => {
      //  // Close only when clicking overlay
      //  if (e.target === e.currentTarget) onClose();
      //}}
    >
      <div
        className="
          bg-white
          w-[95%] max-w-4xl max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-xl
          p-6 md:p-8
          relative
          overflow-x-hidden
          box-border
        "
        style={{ minWidth: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-brand-purple text-4xl font-bold absolute top-3 right-3 hover:scale-150 transition hover:text-brand-purple hover:font-extrabold"
          onClick={onClose}
          aria-label="Close"
          title="Close"
        >
          ×
        </button>

        <h2 className="text-center text-3xl font-bold text-brand-purple mb-6">
          {title ?? "Terms of Use"}
        </h2>

        {loading ? (
          <p className="text-center text-black font-semibold">Loading...</p>
        ) : errorMsg ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <p className="font-bold mb-1">Error</p>
            <p>{errorMsg}</p>
          </div>
        ) : (
          <div className="text-black">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        )}
      </div>
    </div>
  );
}

const BluffbetSignupModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [logo, setLogo] = useState<string | null>(null);

  // Terms modal state (IMPORTANT: opens only when user clicks Terms of Use)
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsSlug, setTermsSlug] = useState<string | null>(null);
  const [termsTitle, setTermsTitle] = useState<string>("Terms of Use — Bluffbet");

  // Load Bluffbet logo dynamically from Supabase
  useEffect(() => {
    if (!isOpen) return;

    const loadLogo = async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("logo_url")
        .eq("name", "Bluffbet")
        .single();

      if (!error && data?.logo_url) {
        setLogo(data.logo_url);
      }
    };

    loadLogo();
  }, [isOpen]);

  // Close modal on ESC
//  useEffect(() => {
//    if (!isOpen) return;
//
//    const handler = (e: KeyboardEvent) => {
//      if (e.key === "Escape") onClose();
//    };
//
//    document.addEventListener("keydown", handler);
//    return () => document.removeEventListener("keydown", handler);
//  }, [isOpen, onClose]);
//
  if (!isOpen) return null;

  // Open Bluffbet Terms directly (no chooser for Bluffbet)
  const handleTermsClick = () => {
    setTermsSlug(BLUFFBET_TERMS_SLUG);
    setTermsTitle("Terms of Use — Bluffbet");
    setIsTermsOpen(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      //onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal container */}
      <div
        className="
          bg-white
          w-[95%] max-w-4xl max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-xl
          p-6
          md:p-8
          relative
          overflow-x-hidden
          box-border
        "
        style={{ minWidth: 0 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute font-extrabold top-4 right-4 text-4xl text-brand-purple hover:scale-150 transition"
          aria-label="Close"
          title="Close"
        >
          ×
        </button>

        {/* Header Title */}
        <h2 className="text-center text-3xl font-bold text-brand-purple mb-6">
          Create Your Affiliate Account
        </h2>

        {/* Header Subtitle */}
        <p className="text-center font-semibold text-black mb-8">
          Please fill in the form below to create your account for the brand shown below.
        </p>

        {/* Bluffbet Logo */}
        <div className="w-full flex justify-center mb-8">
          {logo && (
            <img
              src={logo}
              alt="Bluffbet"
              className="h-10 md:h-12 w-auto object-contain flex-shrink-0 hover:scale-110 transition-transform"
            />
          )}
        </div>

        {/* Signup Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Login Username */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Login username</label>
            <small className="text-brand-orange font-semibold">
              Please ensure your username contains only letters, numbers, hyphens (-), and underscores (_).
            </small>
            <input type="text" className="border rounded p-2 mt-1 font-semibold text-black" />
          </div>

          {/* Login Password */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Login password</label>
            <small className="text-brand-orange font-semibold">
              Must contain at least one lowercase letter, one digit, and one uppercase letter.
            </small>
            <input type="password" className="border rounded p-2 mt-1 font-semibold text-black" />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Confirm password</label>
            <input type="password" className="border rounded p-2 font-semibold text-black" />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Email address</label>
            <input type="email" className="border rounded p-2 font-semibold text-black" />
          </div>

          {/* Newsletter */}
          <div className="flex items-center mt-2 gap-2">
            <input type="checkbox" />
            <label className="text-black font-semibold">Email subscription</label>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Country</label>
            <select className="border rounded p-2 text-black">
              <option>Select a country</option>
            </select>
          </div>

          {/* First Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* First Name</label>
            <input className="border rounded p-2 font-semibold text-black" type="text" />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Last Name</label>
            <input className="border rounded p-2 font-semibold text-black" type="text" />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Date of birth</label>
            <input className="border rounded p-2 font-semibold text-black" type="date" />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-bold text-black">Address</label>
            <textarea className="border rounded p-2 font-semibold text-black" rows={3}></textarea>
          </div>

          {/* Zip Code */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Zip code</label>
            <input className="border rounded p-2 font-semibold text-black" />
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Company Name</label>
            <input className="border rounded p-2 font-semibold text-black" />
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Mobile Number</label>
            <input className="border rounded p-2 font-semibold text-black" />
          </div>

          {/* Telegram/Teams */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Telegram/Teams</label>
            <input className="border rounded p-2 font-semibold text-black" />
          </div>

          {/* Website URL */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Website URL/s</label>
            <input className="border rounded p-2 font-semibold text-black" />
          </div>

          {/* Marketing Method */}
          <div className="md:col-span-2 flex flex-col w-full">
            <label className="font-bold text-black">* How will you market us?</label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <label className="flex items-center gap-2 font-semibold">
                <input type="radio" name="market" /> Website
              </label>
              <label className="flex items-center gap-2 font-semibold">
                <input type="radio" name="market" /> Offline
              </label>
              <label className="flex items-center gap-2 font-semibold">
                <input type="radio" name="market" /> Email
              </label>
              <label className="flex items-center gap-2 font-semibold">
                <input type="radio" name="market" /> Other
              </label>
            </div>
          </div>

          {/* Terms of Use (CLICK -> opens Bluffbet terms modal directly) */}
          <div className="col-span-2 mt-4">
            <label className="font-semibold text-brand-orange">* Terms of use</label>

            <p className="text-sm text-gray-600">
              Please read the{" "}
              <button
                type="button"
                onClick={handleTermsClick}
                className="text-brand-purple underline transition hover:text-brand-purple-700 font-semibold"
              >
                Terms of Use
              </button>{" "}
              before agreeing.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" />
              <label className="text-sm">
                I agree with the NeatAffiliates{" "}
                <button
                  type="button"
                  onClick={handleTermsClick}
                  className="text-brand-purple underline transition hover:text-brand-purple-700 font-semibold"
                >
                  Terms of Use
                </button>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="font-extrabold text-xl bg-brand-purple hover:bg-brand-orange hover:scale-110 text-white px-10 py-3 rounded-xl transition"
            >
              Signup
            </button>
          </div>

          {/* Support Section */}
          <div className="md:col-span-2 mt-8 justify-start">
            <h2 className="text-xl text-center font-bold text-brand-orange mb-2">Support</h2>

            <div className="flex flex-col justify-start gap-1">
              <a
                href="mailto:bluffbet@neataffiliates.com"
                className="flex w-fit items-center gap-2 text-brand-purple hover:underline transition text-lg font-medium"
              >
                <span className="text-2xl">📧</span>
                Email: bluffbet@neataffiliates.com
              </a>
            </div>
          </div>
        </form>

        {/* Terms Modal (Bluffbet direct) */}
        <TermsOfUseModal
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
          slug={termsSlug}
          title={termsTitle}
        />
      </div>
    </div>
  );
};

export default BluffbetSignupModal;
