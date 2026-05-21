import { Outlet } from 'react-router-dom';
//import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  onOpenModal: (type: 'login' | 'signup') => void;
}

export default function Layout({ onOpenModal }: LayoutProps) {
  return (
    <div
      className="app-background"
      style={{ fontFamily: 'sans-serif', minHeight: '100vh' }}
    >
      <main style={{ paddingTop: '6rem' }}>
        <Outlet />
      </main>
      <Footer onOpenModal={onOpenModal} />
    </div>
  );
}