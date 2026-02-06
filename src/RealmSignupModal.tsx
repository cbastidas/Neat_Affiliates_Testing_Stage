// RealmSignupModal.tsx
import React, { useState, useEffect } from 'react'; // 🔹 NEW: added useEffect
import { supabase } from './lib/supabaseClient';    // 🔹 NEW: import supabase

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const RealmSignupModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
const [paymentMethod, setPaymentMethod] = useState<'bank' | 'crypto' | 'papel' | null>(null);
const [autoInvoice, setAutoInvoice] = useState(false);

// 🔹 NEW: state to store Realm brands
const [realmBrands, setRealmBrands] = useState<any[]>([]);

// 🔹 NEW: load Realm brands from Supabase when the modal opens
useEffect(() => {
  if (!isOpen) return;

  const fetchRealmBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('id, name, logo_url, group, order')
      .eq('group', 'Realm')
      .order('order', { ascending: true });

    if (!error && data) {
      setRealmBrands(data);
    }
  };

  fetchRealmBrands();
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
          onClick={(e) => {
            // Close only when clicking background, not the modal content
            if (e.target === e.currentTarget) onClose();
          }}
        >
            {/* Modal Container */}
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
                    className="text-brand-purple text-4xl font-bold absolute top-3 right-3 hover:scale-150 transition hover:text-brand-purple hover:font-extrabold"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* Modal Title */}
                <h2 className="text-center text-3xl font-bold text-brand-purple mb-6">
                    Create Your Affiliate Account
                </h2>

                <p className="text-center font-semibold text-black mb-8">
                    Please fill in the form below to create your account for the brands shown below.
                </p>

                {/* 🔹 NEW: Realm logos from Supabase */}
                <div className="w-full flex flex-wrap justify-center gap-4 md:gap-6 mt-4 mb-8">
                  {realmBrands.map((brand) => (
                      <img
                        key={brand.id}
                        src={brand.logo_url}
                        alt={brand.name}
                        className="h-10 md:h-12 w-auto object-contain flex-shrink-0 hover:scale-110 transition-transform"
                      />
                  ))}
                </div>

                {/* FORM START */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Login Username */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-black">
                            * Login username
                        </label>
                        <input 
                            className="border rounded p-2 text-black"
                            type="text"
                            placeholder="Enter username"
                        />
                        <small className="text-brand-orange font-semibold">
                            Please ensure your username contains only letters, numbers and underscores.
                        </small>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">
                            * Login password
                        </label>
                        <input 
                            className="border rounded p-2 text-black"
                            type="password"
                            placeholder="Enter password"
                        />
                        <small className="text-brand-orange font-semibold">
                            Must contain one uppercase letter and one number.
                        </small>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">
                            * Confirm password
                        </label>
                        <input 
                            className="border rounded p-2 text-black"
                            type="password"
                            placeholder="Confirm password"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">* Email address</label>
                        <input 
                            className="border rounded p-2 text-black"
                            type="email"
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Country */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">* Country</label>
                        <select className="border rounded p-2 text-black">
                            <option value="">Select a country</option>
                            <option>Malta</option>
                            <option>Spain</option>
                            <option>Colombia</option>
                            <option>Brazil</option>
                        </select>
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center gap-2 mt-6">
                        <input type="checkbox" />
                        <label className="text-black font-semibold">Email subscription</label>
                    </div>

                    {/* First Name */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">* First Name</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">* Last Name</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* Date of birth */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">* Date of Birth</label>
                        <input className="border rounded p-2 text-black" type="date" />
                    </div>

                    {/* Teams */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">Teams (Skype)</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* Telegram */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">Telegram</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* Street */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">Street Address</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* City */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">City</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">Company</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">Phone</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>

                    {/* Site URL */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-bold text-brand-black">* Site URL</label>
                        <input className="border rounded p-2 text-black" type="text" />
                    </div>


                    {/* Payment Instructions */}
                    <div className="col-span-2 mt-6">

                      <h3 className="font-extrabold text-black">Payment Instructions</h3>

                      {/* Choose payment method */}
                      <label className="font-semibold text-brand-orange">* Choose a payment method</label>

                      <div className="flex flex-col gap-2 mt-2">

                        {/* Bank Transfer */}
                        <label className="flex text-black items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'bank'}
                            onChange={() => setPaymentMethod('bank')}
                          />
                          Bank Transfer
                        </label>

                        {/* Crypto */}
                        <label className="flex text-black items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'crypto'}
                            onChange={() => setPaymentMethod('crypto')}
                          />
                          Crypto
                        </label>

                        {/* Papel Wallet */}
                        <label className="flex text-black items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'papel'}
                            onChange={() => setPaymentMethod('papel')}
                          />
                          Papel Wallet
                        </label>
                      </div>

                      {/* Dynamic Payment Sections */}

                      {/* ------------------------------------------------------------------ */}
                      {/* BANK TRANSFER SECTION */}
                      {/* ------------------------------------------------------------------ */}
                      {paymentMethod === 'bank' && (
                        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                          <h4 className="font-bold text-black mb-1">
                            Bank Transfer payment details
                          </h4>
                          <p className="text-sm font-semibold text-black mb-4">
                            Please insert all the necessary information
                          </p>
                    
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                            {/* IBAN / Account number */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-brand-orange">* IBAN / Account number</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                    
                            {/* Bank name */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-black">Bank Name</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                    
                            {/* Beneficiary name */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-brand-orange">* Beneficiary name</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                    
                            {/* SWIFT / BIC */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-black">SWIFT / BIC</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ------------------------------------------------------------------ */}
                      {/* CRYPTO SECTION */}
                      {/* ------------------------------------------------------------------ */}
                      {paymentMethod === 'crypto' && (
                        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                          <h4 className="font-bold text-black mb-1">
                            Crypto payment details
                          </h4>
                          <p className="text-sm text-black font-semibold mb-4">
                            Please enter your wallet information
                          </p>
                    
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                            {/* Wallet Address */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-brand-orange">* Wallet Address</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                    
                            {/* Network */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-brand-orange">* Network (BTC, ETH, TRC20, etc.)</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ------------------------------------------------------------------ */}
                      {/* PAPEL WALLET SECTION */}
                      {/* ------------------------------------------------------------------ */}
                      {paymentMethod === 'papel' && (
                        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                          <h4 className="font-bold text-black mb-1">
                            Papel Wallet payment details
                          </h4>
                          <p className="text-sm text-black font-semibold mb-4">
                            Please enter valid Papel wallet details
                          </p>
                    
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                            {/* Account number */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-brand-orange">* Account number</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                    
                            {/* Affiliate name */}
                            <div className="flex flex-col">
                              <label className="font-semibold text-brand-orange">* Affiliate name</label>
                              <input className="border rounded p-2 text-black" type="text" />
                            </div>
                    
                          </div>
                        </div>
                      )}

                    </div>


                     {/* Invoicing Options */}
                    <div className="col-span-2 mt-8">
                                    
                      <h3 className="font-semibold mb-2 text-gray-800">Invoicing Options</h3>
                                    
                      <label className="font-semibold text-brand-orange">* Automatically generate payment invoices?</label>
                                    
                      <div className="flex items-center gap-2 mt-2 text-black">
                        <input 
                          type="checkbox"
                          checked={autoInvoice}
                          onChange={() => setAutoInvoice(!autoInvoice)}
                        />
                        <span className="text-sm">Automatically generate an invoice for each payment</span>
                      </div>
                                    
                      {/* Biller details */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                        <div className="flex flex-col md:col-span-1">
                          <label className="font-semibold text-brand-orange">* Biller details</label>
                          <p className="text-sm font-semibold text-gray-600 mb-1">
                            Invoice header example:<br/>
                            Affiliate Inc.<br/>
                            123 Example Street,<br/>
                            Windsor, 13345.<br/>
                            ABN: 123 456 789 0
                          </p>
                          <textarea 
                            className="border rounded p-2 w-full"
                            rows={5}
                            disabled={!autoInvoice}
                          ></textarea>
                        </div>
                                    
                        <div className="flex flex-col md:col-span-1">
                                    
                          {/* Default Tax Details */}
                          <h3 className="font-semibold mb-2 text-gray-800 mt-4 md:mt-0">Default tax details</h3>
                                    
                          {/* Tax name */}
                          <label className="font-semibold text-brand-orange">* Tax name</label>
                          <select 
                            className="border rounded p-2 mb-4"
                            disabled={!autoInvoice}
                          >
                            <option value="">Select</option>
                            <option value="IVA">IVA</option>
                            <option value="GST">GST</option>
                            <option value="VAT">VAT</option>
                          </select>
                                    
                          {/* Tax rate */}
                          <label className="font-semibold text-brand-orange">* Tax rate</label>
                          <div className="flex items-center gap-2 mb-4">
                            <input 
                              type="number" 
                              className="border rounded p-2 w-full"
                              placeholder="0–100"
                              disabled={!autoInvoice}
                            />
                            <span className="font-semibold text-brand-orange">%</span>
                          </div>
                                    
                          {/* Tax note */}
                          <label className="font-semibold text-black">Tax note</label>
                          <input 
                            className="border rounded p-2 mb-2"
                            type="text"
                            disabled={!autoInvoice}
                          />
                          <p className="text-sm text-black font-semibold">
                            The tax note will appear beside the tax amount on the generated invoice.
                          </p>
                                    
                        </div>
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
                    <div className="col-span-2 mt-6 flex justify-center">
                        <button 
                            type="submit"
                            className="font-extrabold text-xl bg-brand-purple hover:bg-brand-orange hover:scale-110 text-white px-10 py-3 rounded-xl transition"
                        >
                            Signup
                        </button>
                    </div>

                {/* Support Section */}
                <div className="md:col-span-2 mt-10">
                  <h3 className="text-2xl font-bold text-brand-orange mb-4 text-center">Support</h3>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Telegram */}
                    <a
                      href="https://t.me/neat_affiliates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-brand-purple hover:underline text-lg font-medium"
                    >
                      <span className="text-2xl">📨</span>
                      Telegram: @neat_affiliates
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:support@neataffiliates.com"
                      className="flex items-center gap-2 text-brand-purple hover:underline text-lg font-medium"
                    >
                      <span className="text-2xl">📧</span>
                      Email: support@neataffiliates.com
                    </a>

                  </div>
                </div>

                </form>
                {/* FORM END */}
            </div>
        </div>
    );
};

export default RealmSignupModal;
