import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const JackburstSignupModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [logo, setLogo] = useState<string | null>(null);

  // Load Jackburst logo from Supabase
  useEffect(() => {
    if (!isOpen) return;

    const loadLogo = async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("logo_url")
        .eq("name", "Jackburst")
        .single();

      if (!error && data?.logo_url) {
        setLogo(data.logo_url);
      }
    };

    loadLogo();
  }, [isOpen]);

  // Close modal on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal Container */}
      <div className="bg-white 
                  w-[95%] max-w-4xl max-h-[90vh] 
                  overflow-y-auto 
                  rounded-2xl 
                  shadow-xl 
                  p-6 
                  md:p-8 
                  relative 
                  overflow-x-hidden 
                  box-border">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute font-extrabold top-4 right-4 text-4xl text-brand-purple hover:scale-150 transition"
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

        {/* Jackburst Logo */}
        <div className="w-full flex justify-center mb-8">
          {logo && (
            <img
              src={logo}
              alt="Jackburst"
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
            <input type="text" className="border rounded p-2 mt-1" />
          </div>

          {/* Login Password */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Login password</label>
            <small className="text-brand-orange font-semibold">
              Must contain at least one lowercase letter, one digit, and one uppercase letter.
            </small>
            <input type="password" className="border rounded p-2 mt-1 font-semibold" />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Confirm password</label>
            <input type="password" className="border rounded p-2 font-semibold" />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Email address</label>
            <input type="email" className="border rounded p-2 font-semibold" />
          </div>

          {/* Newsletter */}
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" />
            <label className="font-semibold">Email subscription</label>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Country</label>
            <select className="border rounded p-2 font-semibold">
              <option>Select a country</option>
            </select>
          </div>

          {/* First Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* First Name</label>
            <input className="border rounded p-2 font-semibold" type="text" />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Last Name</label>
            <input className="border rounded p-2 font-semibold" type="text" />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Date of birth</label>
            <input className="border rounded p-2 font-semibold" type="date" />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-bold text-black">Address</label>
            <textarea className="border rounded p-2 font-semibold" rows={3}></textarea>
          </div>

          {/* Zip Code */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Zip code</label>
            <input className="border rounded p-2 font-semibold" />
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Company name</label>
            <input className="border rounded p-2 font-semibold" />
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Mobile Number</label>
            <input className="border rounded p-2 font-semibold" />
          </div>

          {/* Telegram/Teams */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Telegram/Teams</label>
            <input className="border rounded p-2 font-semibold" />
          </div>

          {/* Website URL */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Website URL/s</label>
            <input className="border rounded p-2 font-semibold" />
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

          {/* Terms of Use */}
                    <div className="col-span-2 mt-4">
                      <label className="font-semibold text-brand-orange">* Terms of use</label>
                      <p className="text-sm text-gray-600">
                        Please read the{" "}
                        <a 
                          href="https://example.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-brand-purple underline transition hover:text-brand-purple-700"
                        >
                          Terms of Use
                        </a>{" "}
                        before agreeing.
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" />
                        <label className="text-sm">
                          I agree with the NeatAffiliates{" "}
                          <a
                            href="https://example.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-purple underline transition hover:text-brand-purple-700"
                          >
                            Terms of Use
                          </a>
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

                {/* Email */}
                <a
                  href="mailto:jackburst@neataffiliates.com"
                  className="flex w-fit items-center gap-2 text-brand-purple hover:underline transition text-lg font-medium"
                >
                  <span className="text-2xl">📧</span>
                  Email: jackburst@neataffiliates.com
                </a>

              </div>
            </div>


        </form>
      </div>
    </div>
  );
};

export default JackburstSignupModal;
