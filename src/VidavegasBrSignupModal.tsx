import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const VidavegasBrSignupModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [logo, setLogo] = useState<string | null>(null);

  // Load Vidavegas BR logo dynamically
  useEffect(() => {
    if (!isOpen) return;

    const loadLogo = async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("logo_url")
        .eq("name", "Vidavegas BR")
        .single();

      if (!error && data?.logo_url) setLogo(data.logo_url);
    };

    loadLogo();
  }, [isOpen]);

  // ESC close
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
      {/* MODAL */}
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
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute font-extrabold top-4 right-4 text-4xl text-brand-purple hover:scale-150 transition"
        >
          ×
        </button>

            {/* Title */}
            <h2 className="text-center text-3xl font-bold text-brand-purple mb-6">
              Create Your Affiliate Account
            </h2>

            {/* Subtitle */}
            <p className="text-center font-semibold text-black mb-8">
              Please fill in the form below to create your account for the brand shown below.
            </p>

            {/* Vidavegas BR logo */}
            <div className="w-full flex justify-center mb-8">
              {logo && (
                <img
                  src={logo}
                  alt="Vidavegas BR"
                  className="h-10 md:h-12 w-auto object-contain flex-shrink-0 hover:scale-110 transition-transform"
                />
              )}
            </div>


        {/* FORM */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Username */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Login username</label>
            <small className="text-brand-orange font-semibold">
              Please ensure your username contains only letters, numbers, hyphens (-), and underscores (_).
            </small>
            <input type="text" className="border rounded p-2 mt-1 text-black" />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Login password</label>
            <small className="text-brand-orange font-semibold">
              Must contain at least one lowercase letter, one digit, and one uppercase letter.
            </small>
            <input type="password" className="border rounded p-2 mt-1 text-black" />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Confirm password</label>
            <input type="password" className="border rounded p-2 text-black" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Email address</label>
            <input type="email" className="border rounded p-2 text-black" />
          </div>

          {/* Newsletter */}
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-black font-semibold">Email subscription</label>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Country</label>
            <select className="border rounded p-2 text-black">
              <option>Select a country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Brazil</option>
            </select>
          </div>

          {/* First Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* First Name</label>
            <input className="border rounded p-2 text-black" type="text" />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Last Name</label>
            <input className="border rounded p-2 text-black" type="text" />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Date of birth</label>
            <input className="border rounded p-2 text-black" type="date" />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-bold text-black">Address</label>
            <textarea className="border rounded p-2 text-black" rows={3}></textarea>
          </div>

          {/* Zip */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Zip code</label>
            <input className="border rounded p-2 text-black" />
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Company Name</label>
            <input className="border rounded p-2 text-black" />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Mobile Number</label>
            <input className="border rounded p-2 text-black" />
          </div>

          {/* Telegram */}
          <div className="flex flex-col">
            <label className="font-bold text-black">Telegram/Teams</label>
            <input className="border rounded p-2 text-black" />
          </div>

          {/* Website URL */}
          <div className="flex flex-col">
            <label className="font-bold text-black">* Website URL</label>
            <input className="border rounded p-2 text-black" />
          </div>
          <br></br>

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

          {/* Terms */}
          <div className="md:col-span-2 mt-4">
            <label className="font-bold text-brand-orange">* Terms & Conditions</label>

            <div className="flex items-center gap-2 mt-1 font-semibold text-black">
              <input type="checkbox" />
              <span>I agree to the terms and conditions</span>
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
                  href="mailto:vidavegas@neataffiliates.com"
                  className="flex w-fit items-center gap-2 text-brand-purple hover:underline transition text-lg font-medium"
                >
                  <span className="text-2xl">📧</span>
                  Email: vidavegas@neataffiliates.com
                </a>

              </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default VidavegasBrSignupModal;
