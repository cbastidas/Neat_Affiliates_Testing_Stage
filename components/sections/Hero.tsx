export default function Hero() {
  return (
    <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden px-margin-mobile">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.1),transparent_70%)]" />

      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="font-display-lg-mobile text-display-lg-mobile lg:text-display-lg mb-6 leading-tight">
          Grow your affiliate revenue with{" "}
          <span className="text-gradient">Neat Affiliates</span>
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
          Tools, reporting and flexible deals to help you scale&mdash;fast.
          Unlock higher tiers and maximize your marketing potential with a
          partner that values growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="primary-button text-white font-headline-md text-headline-md px-10 py-4 rounded-xl w-full sm:w-auto"
          >
            Register Now and Start Earning
          </button>
          <button
            type="button"
            className="bg-electric-orange text-white font-headline-md text-headline-md px-10 py-4 rounded-xl w-full sm:w-auto"
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
