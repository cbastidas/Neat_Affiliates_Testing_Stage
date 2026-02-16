import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { createPortal } from 'react-dom';

interface AuthLink {
  id: number;
  instance: string;
  order: number;
  login: string;
  signup: string;
}

interface Brand {
  id: number;
  name: string;
  group: string; // instance name
}

interface Props {
  isOpen: boolean;
  type: 'login' | 'signup';
  onClose: () => void;
  onInstance1Signup: () => void;
  onInstance2Signup: () => void; 
  onInstanceVidavegasBrSignup: () => void;
  onBluffbetSignup: () => void;
  onVidavegasLatamSignup: () => void;
  onJackburstSignup: () => void;
}


const normalize = (value?: string | null) =>
  (value ?? '')
    .toLowerCase()
    .replace(/[\s-]+/g, '') 
    .trim();

export default function LoginSignupModal({
  isOpen,
  type,
  onClose,
  onInstance1Signup,
  onInstance2Signup,
  onInstanceVidavegasBrSignup,
  onBluffbetSignup,
  onVidavegasLatamSignup,
  onJackburstSignup,
}: Props) {
  const [authLinks, setAuthLinks] = useState<AuthLink[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Fetch auth links and brands
  const fetchData = async () => {
    const { data: authData } = await supabase
      .from('auth_links')
      .select('*')
      .order('order');

    const { data: brandData } = await supabase
      .from('brands')
      .select('id, name, group');
      

    if (authData) setAuthLinks(authData);
    if (brandData) setBrands(brandData);
  };

  // Group links by instance
  const groupedLinks = authLinks.reduce(
    (acc: Record<string, AuthLink[]>, item) => {
      acc[item.instance] = acc[item.instance] || [];
      acc[item.instance].push(item);
      return acc;
    },
    {}
  );

  if (!isOpen) return null;

    // Close modal on ESC key
    useEffect(() => {
      if (!isOpen) return;
  
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
  
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);
  
    if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]"
      onClick={(e) => {
        // Close only if clicking the overlay, not the modal content
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-brand-purple rounded-2xl shadow-lg p-6 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto relative animate-fadeIn"
        role="dialog" 
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute font-bold hover:scale-150 transition text-4xl top-2 right-4 text-white hover:font-extrabold"
        >
          ✕
        </button>

        <h3 className="text-4xl font-bold text-brand-orange cursor-default select-none mb-4 text-center capitalize">
          {type} Forms
        </h3>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto bg-brand-purple">
          {Object.entries(groupedLinks).map(([instance, links]) => {
            
            const associatedBrands = brands
              .filter(
                (b) => normalize(b.group) === normalize(instance)
              )
              .map((b) => b.name)
              .join(', ');

            return (
              <div

                key={instance}
                className="block bg-white hover:bg-brand-orange hover:text-white border rounded-2xl hover:border-brand-orange"
                onClick={(e) => {
                  
                  if (instance === 'Realm' && type === 'signup') {
                    e.preventDefault();
                    onClose();
                    onInstance1Signup();
                    return;
                  }

                  if (instance === 'Throne' && type === 'signup') {
                    e.preventDefault();
                    onClose();
                    onInstance2Signup();   // opens ThroneSignupModal
                    return;
                  }

                  if (instance === "Vidavegas - BR" && type === "signup") {
                    e.preventDefault();
                    onClose();
                    onInstanceVidavegasBrSignup();
                    return;
                  }

                  if (instance === "Bluffbet" && type === "signup") {
                    e.preventDefault();
                    onClose();
                    onBluffbetSignup();
                    return;
                  }

                  if (instance === "Vidavegas - Latam" && type === "signup") {
                    e.preventDefault();
                    onClose();
                    onVidavegasLatamSignup();
                    return;
                  }

                  if (instance === "Jackburst" && type === "signup") {
                    e.preventDefault();
                    onClose();
                    onJackburstSignup();
                    return;
                  }





                  // Normal behavior
                  const url =
                    type === 'login' ? links[0].login : links[0].signup;
                  window.open(url, '_blank');
                }}
              >
                <div className="border p-4 rounded-xl transition duration-300 cursor-pointer text-center
                hover:border-brand-orange
                 hover:font-bold
                 transition
                 duration-300">
                
                  <p className="font-bold">
                    {associatedBrands || 'No brands associated'}
                  </p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
