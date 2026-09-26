'use client'

import { ConfettiProvider } from "@/provider/confetti-provider";
import Footer from "../(landing)/_components/Footer/Footer";
import Nav from "../(landing)/_components/Nav/Nav";
import ScrollToTopButton from "@/components/global/top-button";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <>
        <ConfettiProvider />
        <main className="relative overflow-hidden">
          <Nav />
          {children}
          <ScrollToTopButton />
          <Footer />
        </main>
      </>
    );
};

export default Layout;