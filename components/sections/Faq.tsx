"use client";

import { useState } from "react";
import { faqCategories, faqs, type FaqCategory } from "@/lib/data";

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("General");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleFaqs = faqs.filter((f) => f.category === activeCategory);

  const selectCategory = (category: FaqCategory) => {
    setActiveCategory(category);
    setOpenIndex(null);
  };

  return (
    <section
      id="faq"
      className="py-section-gap bg-surface-container-low/30 border-t border-glass-border"
    >
      <div className="max-w-3xl mx-auto px-margin-mobile">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-gradient mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            You can find the answers to your questions. For different questions,
            please contact us.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {faqCategories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                className={`px-6 py-2 rounded-full font-label-md text-label-md interactive-btn ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "border border-glass-border text-on-surface-variant"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {visibleFaqs.length === 0 ? (
            <div className="glass-card rounded-xl p-6 text-center text-on-surface-variant font-body-md text-body-md italic">
              No questions in this category yet.
            </div>
          ) : (
            visibleFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-headline-md text-headline-md text-on-surface">
                      {faq.question}
                    </span>
                    <span className="material-symbols-outlined">
                      {isOpen ? "remove" : "add"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-6 pt-0 text-on-surface-variant font-body-md text-body-md border-t border-glass-border/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="text-center mt-12">
          <button
            type="button"
            className="primary-button text-white font-label-md text-label-md px-10 py-4 rounded-xl"
          >
            Ready to Partner? Sign Up Now!
          </button>
        </div>
      </div>
    </section>
  );
}
