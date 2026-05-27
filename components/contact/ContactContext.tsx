"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ContactView = { mode: "main" } | { mode: "brand"; brand: string };

type ContactState = {
  isOpen: boolean;
  view: ContactView;
  open: () => void;
  close: () => void;
  showMain: () => void;
  showBrand: (brand: string) => void;
};

const ContactCtx = createContext<ContactState | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ContactView>({ mode: "main" });

  const open = useCallback(() => {
    setView({ mode: "main" }); // always reset to main view when opening
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const showMain = useCallback(() => setView({ mode: "main" }), []);
  const showBrand = useCallback(
    (brand: string) => setView({ mode: "brand", brand }),
    [],
  );

  const value = useMemo(
    () => ({ isOpen, view, open, close, showMain, showBrand }),
    [isOpen, view, open, close, showMain, showBrand],
  );

  return <ContactCtx.Provider value={value}>{children}</ContactCtx.Provider>;
}

export function useContact() {
  const ctx = useContext(ContactCtx);
  if (!ctx) {
    throw new Error("useContact must be used within a <ContactProvider>");
  }
  return ctx;
}
