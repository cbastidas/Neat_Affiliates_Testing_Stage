import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient"; // adjust path if needed

type Props = {
  isOpen: boolean;
  onClose: () => void;
  slug: string | null; // e.g. "realm-terms-of-use"
  title?: string;
};

export const TermsOfUseModal: React.FC<Props> = ({ isOpen, onClose, slug, title }) => {
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

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
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          bg-white w-[95%] max-w-4xl max-h-[90vh]
          overflow-y-auto rounded-2xl shadow-xl
          p-6 md:p-8 relative overflow-x-hidden box-border
        "
        style={{ minWidth: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-brand-purple text-4xl font-bold absolute top-3 right-3 hover:scale-150 transition hover:font-extrabold"
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
};
