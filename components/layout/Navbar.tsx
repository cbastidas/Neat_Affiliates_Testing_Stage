"use client";

import Logo from "@/components/ui/Logo";
import { navLinks } from "@/lib/data";
import { useContact } from "@/components/contact/ContactContext";

export default function Navbar() {
  const { open } = useContact();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-glass-border shadow-lg shadow-primary/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center h-20">
        <Logo />

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant nav-link-hover font-body-md whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={open}
            className="text-on-surface-variant nav-link-hover font-body-md whitespace-nowrap"
          >
            Contact
          </button>
        </div>

        {/* Auth actions */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="primary-button text-white font-label-md px-6 py-2.5 rounded-xl whitespace-nowrap"
          >
            Register
          </button>
          <button
            type="button"
            className="bg-electric-orange text-white font-label-md px-6 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-electric-orange/20 whitespace-nowrap"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
