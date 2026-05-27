export default function FinalCta() {
  return (
    <section className="py-section-gap relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full" />

      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop relative z-10 text-center">
        <h2 className="font-display-lg text-display-lg-mobile lg:text-display-lg mb-6">
          Join Neat Affiliates Today!
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg mb-10 max-w-xl mx-auto">
          Sign up now to start earning commissions with ease. Access premium
          marketing materials and expert support from day one.
        </p>
        <button
          type="button"
          className="primary-button text-white font-headline-md text-headline-md px-12 py-5 rounded-xl"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
