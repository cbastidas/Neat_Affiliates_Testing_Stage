import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-section-gap px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-gradient mb-4">
          Testimonials
        </h2>
        <p className="text-on-surface-variant font-body-md text-body-md">
          Here is what our partners say about us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {testimonials.map((item, index) => (
          <Reveal key={item.brand} delay={index * 100}>
            <div
              className={`glass-card interactive p-6 rounded-2xl flex flex-col justify-between h-full ${
                index === 1 ? "border-primary/20" : ""
              }`}
            >
              <div>
                <div className="mb-4">
                  <h4 className="font-headline-md text-headline-md text-primary">
                    {item.brand}
                  </h4>
                  <a
                    href={item.href}
                    className="text-caption text-on-surface-variant nav-link-hover inline-flex items-center gap-1"
                  >
                    Visit Page
                    <span className="material-symbols-outlined text-[14px]">
                      arrow_outward
                    </span>
                  </a>
                </div>
                <p className="font-body-md text-body-md italic text-on-surface-variant">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-10">
        {testimonials.map((item, index) => (
          <div
            key={item.brand}
            className={`w-2 h-2 rounded-full ${
              index === 0 ? "bg-primary" : "bg-glass-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
