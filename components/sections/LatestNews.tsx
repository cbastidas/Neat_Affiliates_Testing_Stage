import Reveal from "@/components/ui/Reveal";

export default function LatestNews() {
  return (
    <section
      id="news"
      className="py-section-gap bg-surface-container-low/50 border-y border-glass-border"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg mb-2">
              Latest News
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              Stay up to date with our latest updates and announcements.
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              type="button"
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-on-surface interactive-btn"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-on-surface interactive-btn"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <Reveal>
          <div className="glass-card p-12 rounded-2xl text-center">
            <p className="text-on-surface-variant font-body-lg text-body-lg italic">
              No news available at the moment. Please check back soon! 😊
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
