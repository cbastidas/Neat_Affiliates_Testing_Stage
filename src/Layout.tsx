import { Outlet } from 'react-router-dom';
//import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  onOpenModal: (type: 'login' | 'signup') => void;
}

export default function Layout({ onOpenModal }: LayoutProps) {
  return (
    <div style={{
  fontFamily: 'sans-serif',
  minHeight: '100vh',
  //backgroundColor: '#ffffff', //gray home
  backgroundImage: "url('/NA-BG2.svg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
}}>
      <main style={{ paddingTop: '6rem' }}>
        <Outlet />
      </main>
      <Footer onOpenModal={onOpenModal} />
    </div>
  );
}
