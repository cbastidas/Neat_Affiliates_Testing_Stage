import { useEffect, useState, useRef } from "react";
import { supabase } from "./lib/supabaseClient";
import { useSearchParams } from "react-router-dom";
import TestimonialsEditor from "./TestimonialsEditor";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  title: string;
  content: string;
  link: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [maxScrollIndex, setMaxScrollIndex] = useState(0);

  // Auto-slide
  const autoTimer = useRef<NodeJS.Timeout | null>(null);
  const userInteracting = useRef(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      setTestimonials(data || []);
    };
    fetchTestimonials();
  }, []);

  const calculateMaxScroll = () => {
    const el = trackRef.current;
    if (!el || testimonials.length === 0) {
      setMaxScrollIndex(0);
      return;
    }

    const slideEl = el.querySelector(
      ".testimonial-slide"
    ) as HTMLElement | null;
    if (!slideEl) return;

    const slideWidth = slideEl.clientWidth;
    const visibleSlidesCount = Math.floor(el.clientWidth / slideWidth);
    const max = testimonials.length - visibleSlidesCount;

    const clampedMax = Math.max(0, max);
    setMaxScrollIndex(clampedMax);
    setActive((i) => Math.min(i, clampedMax));
  };

  useEffect(() => {
    calculateMaxScroll();
    window.addEventListener("resize", calculateMaxScroll);
    return () => window.removeEventListener("resize", calculateMaxScroll);
  }, [testimonials]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;

    const slideEl = el.querySelector(
      ".testimonial-slide"
    ) as HTMLElement | null;
    if (!slideEl) return;

    const cardWidth = slideEl.clientWidth;
    const i = Math.round(el.scrollLeft / cardWidth);
    setActive(Math.min(i, maxScrollIndex));

    userInteracting.current = true;
    resetAutoSlide();
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;

    const slideEl = el.querySelector(
      ".testimonial-slide"
    ) as HTMLElement | null;
    if (!slideEl) return;

    const cardWidth = slideEl.clientWidth;
    const clamped = Math.max(0, Math.min(i, maxScrollIndex));

    el.scrollTo({ left: clamped * cardWidth, behavior: "smooth" });
    setActive(clamped);
  };

  const next = () => {
    const nextIndex = active < maxScrollIndex ? active + 1 : 0;
    goTo(nextIndex);
  };

  const prev = () => {
    const prevIndex = active > 0 ? active - 1 : maxScrollIndex;
    goTo(prevIndex);
  };

  // Auto slide
  const startAutoSlide = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);

    autoTimer.current = setInterval(() => {
      if (userInteracting.current) return;
      next();
    }, 4000);
  };

  const resetAutoSlide = () => {
    userInteracting.current = true;
    if (autoTimer.current) clearInterval(autoTimer.current);

    setTimeout(() => {
      userInteracting.current = false;
    }, 2000);

    startAutoSlide();
  };

  useEffect(() => {
    if (!testimonials.length) return;
    startAutoSlide();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials, maxScrollIndex]);

  const handleTouchStart = () => {
    userInteracting.current = true;
    if (autoTimer.current) clearInterval(autoTimer.current);
  };

  const handleTouchEnd = () => {
    userInteracting.current = false;
    startAutoSlide();
  };

  if (isAdmin) return <TestimonialsEditor />;
  if (testimonials.length === 0) return null;

  return (
    <section
      id="Testimonials"
      className="py-2 px-3 sm:pt-16 text-center bg-white
      border-2 border-transparent
      font-bold
      cursor-default select-none
      transition duration-300
      rounded-2xl"
    >
      <h2 className="text-4xl font-extrabold mb-4 text-brand-purple">Testimonials</h2>
      <p className="text-2xl text-black mb-6 transition">
        Here is what our partners say about us.
      </p>

      <div className="max-w-6xl mx-auto relative">

        {/* Sliders onlyon Desktop */}
        <button
          onClick={prev}
          onMouseEnter={() => {
            userInteracting.current = true;
            if (autoTimer.current) clearInterval(autoTimer.current);
          }}
          onMouseLeave={() => {
            userInteracting.current = false;
            startAutoSlide();
          }}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 
                     bg-brand-orange p-2 rounded-full shadow border border-brand-orange hover:bg-brand-purple hover:border-brand-purple z-10"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* TRACK: scroll/touch + auto-slide */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="
            relative flex overflow-x-auto
            snap-x snap-mandatory
            scroll-smooth
            [-webkit-overflow-scrolling:touch]
            no-scrollbar
            w-full
            px-2
            mx-2
          "
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="
                testimonial-slide 
                snap-start shrink-0 
                w-full sm:w-1/2 lg:w-1/3 
                px-3 sm:px-6 mb-4 
              "
            >
              <div className="
                group
                bg-white 
                px-4 py-4 sm:px-6 sm:py-6 
                rounded-2xl shadow-md 
                border border-gray-200
                hover:border-brand-orange
                transition duration-300
                h-full flex flex-col
              ">

                {/* TITLE */}
                <h3 className="text-lg sm:text-xl font-bold text-black mb-1 transition">
                  {t.title}
                </h3>

                {/* LINK */}
                {t.link && (
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-brand-purple text-sm mb-3 block 
                       transition
                    "
                  >
                    Visit Page →
                  </a>
                )}

                {/* CONTENT */}
                <p className="
                  text-gray-700 leading-relaxed italic
                  border-l-4 border-brand-purple pl-3
                  group-hover:font-bold
                  transition
                ">
                  "{t.content}"
                </p>
              
              </div>
              </div>

          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          onMouseEnter={() => {
            userInteracting.current = true;
            if (autoTimer.current) clearInterval(autoTimer.current);
          }}
          onMouseLeave={() => {
            userInteracting.current = false;
            startAutoSlide();
          }}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 
                     bg-brand-orange p-2 rounded-full shadow border border-brand-orange hover:bg-brand-purple hover:border-brand-purple z-10"
        >
          <ChevronRight className="w-6 h-6 font-bold text-white hover:font-extrabold" />
        </button>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: maxScrollIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition 
                ${i === active ? "bg-brand-orange w-6" : "bg-gray-300 w-2.5"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
