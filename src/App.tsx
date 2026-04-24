import { useEffect, useState } from 'react';
import './styles.css';
//import BackgroundAnimation from './BackgroundAnimation';
import BrandCard from './BrandCard';
import { supabase } from './lib/supabaseClient';
import PublicBrandLogoGallery from './BrandsSection';
import AdminDashboard from './AdminDashboard';
import WhyJoin from './WhyJoin';
import AdminLogin from './AdminLogin';
import { Session } from '@supabase/supabase-js';
//import Contact from './Contact';
import Faq from './Faq';
import LoginSignupModal from './LoginSignupModal';
import NewsImage from './NewsImage';
import HomeHero from "./HomeHero";
import BackToTopLogo from "./BackToTopLogo";
import ContactQuickModal from "./ContactQuickModal";
//import { useUiSections } from './hooks/useUiSections';
import ContactSupportModal from './ContactSupportModal';
import CommissionRateMobile from './CommissionRateMobile';
import Testimonials from './Testimonials';
// NEW: modal for full instance signup form
import RealmSignupModal from './RealmSignupModal';
import ThroneSignupModal from './ThroneSignupModal';
import VidavegasBrSignupModal from './VidavegasBrSignupModal';
import BluffbetSignupModal from './BluffbetSignupModal';
import VidavegasLatamSignupModal from './VidavegasLatamSignupModal';
import JackburstSignupModal from './JackburstSignupModal';



export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactInstance] = useState<string | null>(null);
  //const { map: ui } = useUiSections(); 
  const [isContactEmailOpen, setIsContactEmailOpen] = useState(false);
  const [openInstance1Form, setOpenInstance1Form] = useState(false);
  const [openThroneForm, setOpenThroneForm] = useState(false);
  // Number of extra brands currently visible per group
  const [visibleExtra, setVisibleExtra] = useState<Record<string, number>>({});
  const [openVidavegasBrForm, setOpenVidavegasBrForm] = useState(false);
  const [openBluffbetSignup, setOpenBluffbetSignup] = useState(false);
  const [openVidavegasLatam, setOpenVidavegasLatam] = useState(false);
  const [openJackburstSignup, setOpenJackburstSignup] = useState(false);
  

  const handleOpenSignupModal = (brand: any) => {
  const g = brand.group?.trim();

  switch (g) {
    case "Realm":
      setOpenInstance1Form(true);
      break;
    case "Throne":
      setOpenThroneForm(true);
      break;
    case "Vidavegas - BR":
      setOpenVidavegasBrForm(true);
      break;
    case "Vidavegas - Latam":
      setOpenVidavegasLatam(true);
      break;
    case "Bluffbet":
      setOpenBluffbetSignup(true);
      break;
    case "Jackburst":
      setOpenJackburstSignup(true);
      break;
    default:
      console.warn("Unknown brand group:", g);
  }
};



  


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };
  const [signupByInstance, setSignupByInstance] = useState<Record<string, string>>({});

  // 🟢 Fetch signup links by instance (auth table)
  const fetchSignupLinks = async () => {
    const { data, error } = await supabase
      .from('auth_links')
      .select('instance, signup');

    if (error) {
      console.error('Error fetching signup links:', error.message);
      return;
    }

    if (data) {
      const map: Record<string, string> = {};
      data.forEach((row) => {
        if (row.instance && row.signup) map[row.instance] = row.signup;
      });
      setSignupByInstance(map);
    }
  };


  const getSignupForBrand = (brand: any) => {
  const byBrand = (brand.signup_url || '').trim();
  if (byBrand) return byBrand;

  const key = (brand.group || '').trim();
  return signupByInstance[key] || undefined;
};

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*, signup_url')
        .eq('is_visible', true)
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching brands:', error.message);
      } else {
        setBrands(data || []);
      }
    };



    fetchBrands();
    fetchSignupLinks();

    // 🟣 Admin Authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const isAdmin = window.location.search.includes('admin=true');

  if (isAdmin) {
    return session ? <AdminDashboard /> : <AdminLogin />;
  }

  const groupOrder = ['Realm', 'Throne', 'Neatplay'];

  const groupedBrands = groupOrder.map((groupName) => {
  if (groupName === 'Neatplay') {
    return {
      groupName,
      brands: brands.filter((b) =>
        ['Vidavegas - Latam', 'Vidavegas - BR', 'Bluffbet', 'Jackburst']
          .includes(b.group)
      ),
    };
  }

  return {
    groupName,
    brands: brands.filter((b) => b.group === groupName),
  };
});

const showMore = (groupName: string, maxExtra: number) => {
  setVisibleExtra(prev => ({ ...prev, [groupName]: maxExtra })); // show ALL extras
};

const showLess = (groupName: string) => {
  setVisibleExtra(prev => ({ ...prev, [groupName]: 0 }));

  setTimeout(() => {
    const section = document.getElementById("CommissionRate");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 150);
};



  // return


  return (
    
    <div className="font-sans min-h-screen bg-transparent scroll-smooth">
      {/* Navbar */}

<nav className="fixed top-0 left-0 w-full bg-white shadow z-20 px-6 pt-2 pb-2 flex justify-between items-center">

  {/* Logo - Takes to TOP */}
  <div 
    onClick={() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMenuOpen(false);
    }}
    className="flex items-center gap-2"
  >
    <img src="/logo1.svg" alt="Logo" className="h-10 w-25 cursor-pointer hover:brightness-125" />
  </div>

    {/* Hamburguer Menu */}
      <div className="md:hidden flex items-center gap-2 px-3">
      {/* 🟢 Login Button (Mobile Only) */}
      <button
          onClick={() => setModalType('login')}
          className="rounded-xl bg-brand-purple px-5 py-2 text-white font-bold hover:bg-brand-orange hover:text-white transition"
      >
          Login
      </button>

      {/* 🟢 Hamburguer Menu (Increased Size) */}
      <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-brand-purple text-4xl hover:scale-110 hover:z-20 hover:shadow-2xl cursor-default select-none transition-all duration-300 rounded-2xl hover:font-extrabold" 
      >
          {menuOpen ? '✕' : '☰'}
      </button>
  </div>

{/* Desktop nav */}
<div className="font-bold hidden md:flex flex-wrap gap-1 justify-end w-full max-w-full text-black">

  {[
    'WhyJoin',
    'News',
    'OurBrands',
    'CommissionRate',
    'Contact',
    'FAQ',
  ].map((id) => (
  <button
    key={id}
    onClick={() => {
      if (id === 'Contact') {
        setIsContactEmailOpen(true); // open popup instead of scrolling
      } else {
        scrollToSection(id);
      }
    }}
    className="text-black font-extrabold text-base px-3 py-2 rounded-xl border border-transparent
    hover:bg-brand-purple
    hover:text-white
    transition-all duration-300"
    >
    {id.replace(/([A-Z])/g, ' $1').trim()}
  </button>
))}

  <button
    onClick={() => setModalType('signup')}
    className="bg-brand-purple font-extrabold text-white px-3 py-0 rounded hover:bg-brand-orange hover:text-white"
  >
    Register
  </button>

  <button
    onClick={() => setModalType('login')}
    className="text-white px-3 py-0 rounded font-extrabold border border-brand-orange bg-brand-orange hover:bg-white hover:border-brand-orange hover:text-brand-orange"
  >
    Login
  </button>

</div>

</nav>


      {/* Mobile Menu Dropdown */}
{menuOpen && (
  <div className="font-bold md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-50 px-4 py-4 text-black">
    {[
      { id: 'WhyJoin', label: 'Why Join' },
      { id: 'News', label: 'News' },
      { id: 'OurBrands', label: 'Our Brands' },
      { id: 'CommissionRate', label: 'Commission Rate' },
      //{ id: 'Contact', label: 'Contact' },
      { id: 'FAQ', label: 'FAQ' },
    ].map(({ id, label }) => (
      <button
        key={id}
        onClick={() => scrollToSection(id)}
        className="block w-full text-left text-black py-2 px-2 rounded hover:bg-brand-purple hover:text-white"
      >
        {label}
      </button>
    ))}

    {/* Login/Signup in mobile */}
    <button
      onClick={() => { setModalType('signup'); setMenuOpen(false); }}
      className="block w-full text-left font-extrabold text-brand-purple py-2 px-2 hover:bg-brand-purple hover:text-white rounded"
    >
      Signup
    </button>
  </div>
)}

      {/* Main content */}
      <div>
        <HomeHero
          onLogin={() => setModalType('login')}
          onSignup={() => setModalType('signup')}
          onScrollNext={() => {
            const faqSection = document.getElementById('WhyJoin');
            faqSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          />
      </div>

      <main className="max-w-6xl mx-auto px-4 space-y-12 md:space-y-12">

        

        {
          <WhyJoin />
        }

        {
          <section id="News">
          <NewsImage />
          </section>
        }

        
        <div id="OurBrands">
        {/* 🎯 Pass the onSignup function */}
        <PublicBrandLogoGallery 
          onSignup={() => setModalType('signup')} 
        />
        </div>

        {/* ✅ Commission Rate with Tailwind styling applied */}
          <section
            id="CommissionRate"
            className="
              bg-white 
              pt-6 md:pt-24 pb-6
              border rounded-2xl
              cursor-default select-none
              border-purple-400
              font-bold
              hover:border-brand-purple hover:border-2
              transition duration-300
            "
          >
            <div className="max-w-[1200px] mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4 text-brand-purple">
                Commission Rate
              </h2>

              <p className="text-center text-black font-bold mb-8 text-base transition">
                Earn more as you grow. Our laddered commission system rewards your success.
              </p>

              <div className="space-y-10 mt-6 border border-transparent">
                {groupedBrands.map(({ groupName, brands }) => (
                  brands.length > 0 && (
                    <section
                      key={groupName}
                      className="
                        p-6 bg-white rounded-lg border border-purple-400 shadow-sm
                        
                      "
                    >

                      {/* MOBILE */}
                      <div className="md:hidden -mx-20 px-4 border border-purple-300 rounded-2xl">
                        <CommissionRateMobile 
                          brands={brands.map(brand => ({
                            ...brand,
                            signup_url: getSignupForBrand(brand),
                          }))}
                          handleOpenSignupMobile={handleOpenSignupModal}
                        />
                      </div>

                      {/* DESKTOP */}
                      <div
                        className="hidden md:flex flex-col items-center rounded-2xl border bg-white"
                        style={{
                          //backgroundImage: "url('/NA-BG2.svg')",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >

                        {/* Always 3 initial cards */}
                        <div className="
                          grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 
                          gap-8 justify-items-center w-full p-6 rounded-2xl
                          border
                          transition duration-300
                        ">
                          {brands.slice(0, 3).map((brand) => (
                            <BrandCard
                              key={brand.id}
                              id={brand.id}
                              logoUrl={brand.logo_url}
                              name={brand.name}
                              commissionTiers={brand.commission_tiers || []}
                              commissionType={brand.commission_type}
                              isVisible={brand.is_visible}
                              commission_tiers_label={brand.commission_tiers_label}
                              onSave={() => {}}
                              isPublicView={true}
                              onJoin={() => handleOpenSignupModal(brand)}
                            />
                          ))}
                        </div>

                        {/* LOAD MORE */}
                        {brands.length > 3 && (
                          <div className="w-full px-6 mt-2">
                            <div className="
                              grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 
                              gap-8 justify-items-center
                            ">
                              {brands
                                .slice(3, 3 + (visibleExtra[groupName] || 0))
                                .map((brand) => (
                                  <BrandCard
                                    key={brand.id}
                                    id={brand.id}
                                    logoUrl={brand.logo_url}
                                    name={brand.name}
                                    commissionTiers={brand.commission_tiers || []}
                                    commissionType={brand.commission_type}
                                    isVisible={brand.is_visible}
                                    commission_tiers_label={brand.commission_tiers_label}
                                    onSave={() => {}}
                                    isPublicView={true}
                                    onJoin={() => handleOpenSignupModal(brand)}
                                  />
                                ))}
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-center gap-4 mt-4 my-3">

                              {/* SHOW MORE */}
                              {(visibleExtra[groupName] || 0) < brands.length - 3 && (
                                <button
                                  onClick={() => showMore(groupName, brands.length - 3)}
                                  className="
                                    px-6 py-2 rounded-xl 
                                    bg-brand-orange text-white font-semibold
                                    border border-brand-orange
                                    hover:bg-white hover:text-brand-orange
                                    hover:border-brand-orange
                                    transition duration-300
                                  "
                                >
                                  Show More
                                </button>
                              )}

                              {/* SHOW LESS */}
                              {(visibleExtra[groupName] || 0) > 0 && (
                                <button
                                  onClick={() => showLess(groupName)}
                                  className="
                                    px-6 py-2 rounded-xl
                                    bg-white text-brand-orange font-bold 
                                    border-brand-orange
                                    hover:bg-brand-orange
                                    hover:border-brand-orange
                                    hover:font-bold
                                    hover:text-white
                                    border
                                    transition-all duration-300
                                  "
                                >
                                  Show Less
                                </button>
                              )}

                            </div>
                          </div>
                        )}

                      </div>

                    </section>
                  )
                ))}
              </div>
            </div>
          </section>


        {/* Contact Section
        {ui.contact_section !== false && (
          <>
            <Contact />
            <br />
          </>
        )}
          */}
        
        <div id="Testimonials">
        <Testimonials />
        </div>

        <section id="FAQ">
        {/* 🎯 PASS THE onSignup PROP TO FAQ */}
        <Faq onSignup={() => setModalType('signup')} />
        </section>

      {/* Login and Signup Section */}
      <div className="py-16 text-center bg-white 
                      border border-orange-300 rounded-2xl
                      font-bold
                      hover:border-brand-orange hover:border-2
                      hover:scale-105 hover:z-20 hover:shadow-2xl
                      cursor-default select-none
                      transition-all duration-300
                      rounded-2xl
        ">

          <h2 className="text-4xl font-bold text-brand-purple text-center text-black mb-4">Join Neat Affiliates Today!</h2>
          <h3 className="text-base text-black font-bold text-center mb-8 transition">
            Sign up now to start earning commissions with ease.
          </h3>
          
          <button
            onClick={() => setModalType('signup')}
            className="text-base sm:text-lg lg:text-xl font-bold bg-brand-purple text-white px-5 py-2 rounded-xl mx-2 hover:bg-brand-orange"
          >
            Get Started
          </button>

          {modalType && (
            <LoginSignupModal
              isOpen={true}
              type={modalType}
              onClose={() => setModalType(null)}
              onInstance1Signup={() => setOpenInstance1Form(true)}  // 🔥 NEW
              onInstance2Signup={() => setOpenThroneForm(true)}
              onInstanceVidavegasBrSignup={() => setOpenVidavegasBrForm(true)}
              onBluffbetSignup={() => setOpenBluffbetSignup(true)}
              onVidavegasLatamSignup={() => setOpenVidavegasLatam(true)}
              onJackburstSignup={() => setOpenJackburstSignup(true)}

            />
          )}
      </div>


    {/* Footer logo + mobile FAB */}
    <BackToTopLogo homeAnchorId="HomeHero" />
    <ContactQuickModal
      isOpen={contactOpen}
      instance={contactInstance}
      onClose={() => setContactOpen(false)}
    />
    {/* Desktop-only floating Contact button (bottom-left) */}
{!isContactEmailOpen && (
  <button
    type="button"
    onClick={() => setIsContactEmailOpen(true)}
    className="
      hidden 
      lg:flex
      fixed left-4 
      bottom-4 
      z-[10000]
      px-3 py-2
      bg-brand-purple 
      text-white 
      rounded-xl 
      shadow-md 
      text-sm
      font-semibold
      hover:bg-brand-orange 
      active:scale-95
      transition-all
      duration-200
    "
  >
    Support 💬
  </button>
)}


    {/* Mobile-only floating Contact button (bottom-left) */}
{!isContactEmailOpen && (
  <button
    type="button"
    onClick={() => setIsContactEmailOpen(true)}
    className="
      fixed left-4 
      bottom-6
      bottom-[calc(1rem+env(safe-area-inset-bottom))] 
      z-[10000] 
      md:hidden 
      h-12 w-12 
      rounded-full 
      bg-brand-orange 
      shadow-lg 
      flex items-center justify-center
      text-2xl 
      hover:bg-brand-purple 
      active:scale-[0.98] 
      transition
    "
    aria-label="Open Contact form"
    title="Contact"
  >
    <span className="leading-none">💬</span>
  </button>
)}

{/* Global Contact modal (opens from navbar or FAB) */}
<ContactSupportModal
  isOpen={isContactEmailOpen}
  onClose={() => setIsContactEmailOpen(false)}
/>



<RealmSignupModal
  isOpen={openInstance1Form}
  onClose={() => setOpenInstance1Form(false)}
/>

<ThroneSignupModal
  isOpen={openThroneForm}
  onClose={() => setOpenThroneForm(false)}
/>

<VidavegasBrSignupModal
  isOpen={openVidavegasBrForm}
  onClose={() => setOpenVidavegasBrForm(false)}
/>

<BluffbetSignupModal
  isOpen={openBluffbetSignup}
  onClose={() => setOpenBluffbetSignup(false)}
/>

<VidavegasLatamSignupModal
  isOpen={openVidavegasLatam}
  onClose={() => setOpenVidavegasLatam(false)}
/>

<JackburstSignupModal
  isOpen={openJackburstSignup}
  onClose={() => setOpenJackburstSignup(false)}
/>




    </main>
    </div>

    
  );
}
