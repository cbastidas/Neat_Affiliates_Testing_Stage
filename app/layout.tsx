import type { Metadata } from "next";
import "./globals.css";
import { ContactProvider } from "@/components/contact/ContactContext";
import ContactModal from "@/components/contact/ContactModal";
import HelpButton from "@/components/contact/HelpButton";

export const metadata: Metadata = {
  title: "Neat Affiliates | Technological Vitality for Marketers",
  description:
    "Grow your affiliate revenue with Neat Affiliates. Tools, reporting and flexible deals to help you scale fast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lexend:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md text-body-md selection:bg-primary selection:text-on-primary">
        <ContactProvider>
          {children}
          <ContactModal />
          <HelpButton />
        </ContactProvider>
      </body>
    </html>
  );
}
