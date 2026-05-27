"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { commissionGroups } from "@/lib/data";

export default function CommissionRates() {
  // Groups open by default — start with only the first one expanded.
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(commissionGroups[0] ? [commissionGroups[0].id] : []),
  );

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="commission" className="py-section-gap bg-surface-indigo/40 relative">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-gradient mb-4">
            Commission Rate
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Earn more as you grow. Our laddered commission system rewards your
            success.
          </p>
        </div>

        {/* One collapsible accordion per space (Realm / Throne / Otros) */}
        <div className="space-y-6">
          {commissionGroups.map((group, groupIndex) => {
            const isOpen = openGroups.has(group.id);

            return (
              <Reveal key={group.id} delay={groupIndex * 80}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  {/* Accordion header */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-headline-md text-headline-md text-on-surface">
                        {group.name}
                      </h3>
                      <span className="font-caption text-caption text-on-surface-variant">
                        {group.brands.length}{" "}
                        {group.brands.length === 1 ? "brand" : "brands"}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Brand grid — each brand has its own tier table */}
                  {isOpen && (
                    <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                      {group.brands.map((brand) => {
                        // Fall back to the group's defaults when a brand
                        // does not define its own tier table.
                        const rows = brand.rows ?? group.defaultRows;
                        const tierLabel =
                          brand.tierLabel ?? group.defaultTierLabel;

                        return (
                          <div
                            key={brand.name}
                            className={`glass-card interactive rounded-2xl overflow-hidden ${
                              brand.featured ? "border-primary/30" : ""
                            }`}
                          >
                            <div
                              className={`p-6 flex justify-between items-center border-b border-glass-border ${
                                brand.featured
                                  ? "bg-primary-container"
                                  : "bg-surface-container-high"
                              }`}
                            >
                              <h4
                                className={`font-headline-md text-headline-md ${
                                  brand.featured ? "text-white" : ""
                                }`}
                              >
                                {brand.name}
                              </h4>
                              <button
                                type="button"
                                className={`px-4 py-1 rounded-full text-caption border-none interactive-btn ${
                                  brand.featured
                                    ? "bg-white/20 text-white"
                                    : "bg-primary/20 text-primary"
                                }`}
                              >
                                Join Now
                              </button>
                            </div>

                            <div className="p-6">
                              <table className="w-full">
                                <thead className="bg-surface-container-highest/50">
                                  <tr className="text-left">
                                    <th className="p-3 text-caption uppercase tracking-wider text-on-surface-variant">
                                      {tierLabel}
                                    </th>
                                    <th className="p-3 text-caption uppercase tracking-wider text-on-surface-variant text-right">
                                      Commission
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="text-body-md">
                                  {rows.map((row, rowIndex) => (
                                    <tr
                                      key={row.tier}
                                      className={
                                        rowIndex < rows.length - 1
                                          ? "border-b border-glass-border/50"
                                          : ""
                                      }
                                    >
                                      <td className="p-3">{row.tier}</td>
                                      <td
                                        className={`p-3 text-right font-bold ${group.accentClass}`}
                                      >
                                        {row.commission}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            type="button"
            className="bg-electric-orange/20 text-electric-orange border border-electric-orange/30 font-label-md text-label-md px-10 py-4 rounded-xl hover:bg-electric-orange/30 transition-all interactive-btn"
          >
            Show More
          </button>
        </div>
      </div>
    </section>
  );
}