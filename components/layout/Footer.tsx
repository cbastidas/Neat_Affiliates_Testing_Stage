type FooterColumn = { title: string; links: { label: string; href: string }[] };

const footerColumns: FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "API Docs", href: "#" },
      { label: "Affiliate Blog", href: "#" },
      { label: "Support", href: "#" },
      { label: "Soporte", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Analytics", href: "#news" },
      { label: "Commission", href: "#commission" },
      { label: "Partners", href: "#brands" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Settings", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-section-gap border-t border-glass-border">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-16">
          <div className="col-span-2 lg:col-span-1">
            <div className="font-headline-md text-headline-md text-on-surface mb-6">
              Neat Affiliates
            </div>
            <p className="text-on-surface-variant font-caption text-caption leading-relaxed mb-6">
              Empowering digital marketers with superior analytics and a diverse
              portfolio of high-performing brands.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Share"
                className="text-on-surface-variant hover:text-cyan-glitter transition-all"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
              <a
                href="#"
                aria-label="Website"
                className="text-on-surface-variant hover:text-cyan-glitter transition-all"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h5 className="font-label-md text-label-md text-on-surface mb-6 uppercase tracking-wider">
                {column.title}
              </h5>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-on-surface-variant footer-link-hover font-caption text-caption block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-glass-border/30">
          <p className="text-on-surface-variant font-caption text-caption mb-4 md:mb-0">
            © 2026 Neat Affiliates. Technological Vitality for Marketers.
          </p>
          <div className="flex gap-6">
            <span className="font-caption text-caption text-tertiary">
              v2.4.0-Stable
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
