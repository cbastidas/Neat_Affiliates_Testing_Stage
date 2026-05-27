import Reveal from "@/components/ui/Reveal";
import { whyJoinFeatures } from "@/lib/data";

export default function WhyJoin() {
  return (
    <section
      id="why-join"
      className="py-section-gap px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-gradient mb-4">
          Why Join Neat Affiliates?
        </h2>
        <p className="text-on-surface-variant font-body-md text-body-md">
          Top reasons why affiliates love working with us
        </p>
      </div>

      {/*
        lg grid uses 6 columns: each card spans 2 -> 3 cards per row.
        Card index 3 starts at column 2, so the last row of 2 cards is centered.
        This centering is calibrated for 5 cards; adjust col-start if the count changes.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter">
        {whyJoinFeatures.map((feature, index) => (
          <Reveal
            key={feature.title}
            delay={index * 100}
            className={`lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}
          >
            <div className="glass-card interactive p-8 rounded-xl h-full">
              <div
                className={`w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center mb-6`}
              >
                <span
                  className={`material-symbols-outlined ${feature.iconColor}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">
                {feature.title}
              </h3>
              <p className="text-on-surface-variant font-body-md text-body-md">
                {feature.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          type="button"
          className="primary-button text-white font-label-md text-label-md px-10 py-4 rounded-xl"
        >
          Join Neat Affiliates
        </button>
      </div>
    </section>
  );
}