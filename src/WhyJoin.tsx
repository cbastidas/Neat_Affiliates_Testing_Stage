import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import LoginSignupModal from "./LoginSignupModal";

interface WhyJoinItem {
  id: string;
  title: string;
  description: string;
  emoji_url: string;
  order: number;
}

export default function WhyJoin() {
  const [items, setItems] = useState<WhyJoinItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  // ------------------------------------------------------------
  // Load all cards directly from Supabase
  // ------------------------------------------------------------
  useEffect(() => {
    const fetchWhyJoinItems = async () => {
      const { data, error } = await supabase
        .from("why_join")
        .select("*")
        .order("order", { ascending: true });

      if (error) {
        console.error("Error loading Why Join cards:", error.message);
      } else {
        setItems(data || []);
      }

      setLoading(false);
    };

    fetchWhyJoinItems();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Loading Why Join section...
      </p>
    );
  }

  // ------------------------------------------------------------
  // Animation keyframes (slide from left)
  // ------------------------------------------------------------
  const cardAnimation = `
    @keyframes slideIn {
      0% {
        opacity: 0;
        transform: translateX(-40px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

  return (
    <>
      {/* Inject animation into page */}
      <style>{cardAnimation}</style>

      <section id="WhyJoin" className="relative py-12 rounded-2xl border
  border-purple-400
  font-bold
  bg-white
  hover:shadow-2xl
  hover:border-brand-purple hover:border-2
  transition
  duration-300"
  style={{
    //backgroundImage: "url('/NA-BG2.svg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
        <div className="max-w-6xl mx-auto px-4">

          {/* ------------------------------------------------------------
              Section Header
          ------------------------------------------------------------ */}
          <h2 className="text-4xl font-extrabold text-center cursor-default select-none text-brand-purple mb-4">
            Why Join Neat Affiliates?
          </h2>
          <p className="text-center text-black mb-8 transition">
            Top reasons why affiliates love working with us
          </p>

          {/* ------------------------------------------------------------
              MOBILE VERSION — 1 card per row
          ------------------------------------------------------------ */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group
                      p-4 bg-white rounded-xl border border-gray-200 flex items-start gap-3 
                      border border-orange-400
                      hover:border-brand-orange hover:border-2
                      opacity-0 transition-all duration-300
                      hover:scale-105 hover:z-20 hover:shadow-2xl
                "
                style={{
                  animation: "slideIn 1.2s ease-out forwards",
                  animationDelay: `${index}s`,
                }}
              >
                {/* Icon */}
                {item.emoji_url && (
                  <img
                    src={item.emoji_url}
                    alt="Icon"
                    className="mt-1 flex-shrink-0"
                    style={{ width: 32, height: 32 }}
                  />
                )}

                {/* Title + Description */}
                <div>
                  <h3 className="text-gray-800 font-bold text-sm mb-1 transition">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-xs leading-snug cursor-pointer transition">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>


{/* ------------------------------------------------------------
    DESKTOP VERSION — same size cards, last row centered
------------------------------------------------------------ */}
<div className="hidden md:flex flex-wrap justify-center gap-8 w-full">
  {items.map((item, index) => (
    /*  Container */
    <div
      key={item.id}
      className="w-[300px] flex opacity-0"
      style={{
        animation: "slideIn 1.2s ease-out forwards",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="
        flex-1 flex-col p-6 bg-white rounded-xl border border-gray-200 shadow-md text-center
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:z-20 hover:shadow-2xl
        cursor-default select-none
      ">
        {/* Icon */}
        {item.emoji_url && (
          <img
            src={item.emoji_url}
            alt="Icon"
            className="mx-auto mb-4 flex-shrink-0"
            style={{ width: 60, height: 60 }}
          />
        )}

        {/* Títle */}
        <h3 className="text-gray-800 font-bold text-lg mb-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="flex-grow text-gray-600 text-sm px-2 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  ))}
</div>

          {/* ------------------------------------------------------------
              CTA BUTTON
          ------------------------------------------------------------ */}
          <div className="text-center mt-10">
            <button
              onClick={() => setModalType("signup")}
              className="
                text-xl font-bold px-6 py-3 rounded-xl
                border border-brand-purple bg-brand-purple text-white hover:bg-brand-orange
                hover:border-brand-orange
                hover:text-white
                hover: shadow-md
                shadow-lg transition
                 hover:font-bold
                 transition 
                 duration-300
              "
            >
              Join Neat Affiliates
            </button>
          </div>

          {modalType && (
            <LoginSignupModal
              isOpen={true}
              type={modalType}
              onClose={() => setModalType(null)}
              onInstance1Signup={() => {}}
              onInstance2Signup={() => {}}
              onInstanceVidavegasBrSignup={() => {}}
              onBluffbetSignup={() => {}}
              onVidavegasLatamSignup={() => {}}
              onJackburstSignup={() => {}}
            />
          )}
        </div>
      </section>
    </>
  );
}
