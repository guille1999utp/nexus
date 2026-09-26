'use client'
// import Noise from "@/components/global/Noise";
import ScrollToTopButton from "@/components/global/top-button";
import Nav from "./_components/Nav/Nav";
import Footer from "./_components/Footer/Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <main className="overflow-hidden relative">
        <Nav />
        {children}
        <ScrollToTopButton />
        <Footer />
      </main>
    );
};

export default Layout;