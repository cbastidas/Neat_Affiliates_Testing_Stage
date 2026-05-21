import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function NewsImage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("visible", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading news:", error.message);
      } else {
        setNews(data || []);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section
      id="News"
      className="
        section-card
        py-20
        rounded-2xl 
        border border-purple-400
        shadow-sm 
        px-6 
        max-w-6xl 
        mx-auto
        transition 
        duration-300
        cursor-default select-none
        hover:border-brand-purple hover:border-2
        hover:scale-110 hover:z-20 hover:shadow-2xl
      "
    >
      <h2 className="text-4xl font-bold text-center text-brand-purple mb-4">
        Latest News
      </h2>

      <p className="font-bold text-center text-black mb-8">
        Stay up to date with our latest updates and announcements.
      </p>

      {/* Loader */}
      {loading && (
        <p className="font-semibold text-center text-black">Loading news...</p>
      )}

      {/* No news message */}
      {!loading && news.length === 0 && (
        <p className="text-center text-gray-700 text-lg">
          No news available at the moment. Please check back soon! 😊
        </p>
      )}

      {/* News Grid */}
      {!loading && news.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="
                w-full 
                rounded-xl 
                overflow-hidden 
                border 
                border-gray-200
                bg-transparent
                shadow-sm
                transition-all 
                duration-300 
                hover:shadow-lg 
                hover:border-purple-300
              "
            >
              <img
                src={item.image_url}
                alt="News"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
