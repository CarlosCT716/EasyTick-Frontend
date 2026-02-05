import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import Footer from './Footer'; // (Crea el Footer.tsx con tu código HTML estático)

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="grow">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default Layout;