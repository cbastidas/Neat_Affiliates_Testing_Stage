import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface FaqItem { // Renamed from Faq to FaqItem for clarity
  id: string;
  category: string;
  question: string;
  answer: string;
}

// 🎯 Define the new prop interface
interface FaqProps {
    onSignup: () => void;
}

// 🎯 Accept the new prop
export default function Faq({ onSignup }: FaqProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase.from('faqs').select('*').order('order');
      if (data) {
        setFaqs(data);
        const firstCat = data[0]?.category;
        if (firstCat) setActiveCategory(firstCat);
      }
    };
    fetchFaqs();
  }, []);

  const categories = [...new Set(faqs.map(f => f.category))];

  const filtered = faqs.filter(f => f.category === activeCategory);

  return (
    <section id="FAQ" className="py-16 text-center bg-white 
                                  border-2 border-transparent
                                  font-bold
                                  cursor-default select-none
                                  transition duration-300
                                  rounded-2xl">
      <h2 className="text-4xl font-bold text-center mb-4 text-brand-purple">Frequently Asked Questions</h2>
      <p className="text-black font-bold text-center text-base mb-8 transition">You can find the answers to your questions. For different questions, please contact us.</p>

      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {categories.map((cat) => (
          <button 
            key={cat} 
            className={`px-4 py-2 rounded-xl ${activeCategory === cat ? 'bg-brand-purple font-bold text-white hover:bg-brand-purple-700' : 'bg-white text-brand-purple border border-brand-purple hover:scale-105 transition  hover:bg-brand-orange hover:text-white hover:border-brand-orange '}`} 
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-left">
        {filtered.map((faq) => (
          <div key={faq.id} className="mb-4 border rounded-xl bg-white 
                                        border-2 border-gray
                                        hover:border-brand-purple 
                                        hover:scale-105 hover:z-20 hover:shadow-2xl        
                                        transition duration-300
                                        rounded-2xl">
            <button 
              onClick={() => setExpanded(expanded === faq.id ? null : faq.id)} 
              className="w-full text-left px-4 py-3 font-bold"
            >
              {faq.question}
            </button>
            {expanded === faq.id && (
              <div className="px-4 pb-4 text-gray-600 font-semibold">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🎯 NEW CTA BUTTON */}
      <div className="text-center mt-12">
          <button
              onClick={onSignup}
              className="text-base sm:text-lg lg:text-xl font-semibold px-8 py-3 rounded-xl bg-brand-purple text-white hover:bg-brand-orange shadow-lg transition"
          >
              Ready to Partner? Sign Up Now!
          </button>
      </div>
    </section>
  );
}