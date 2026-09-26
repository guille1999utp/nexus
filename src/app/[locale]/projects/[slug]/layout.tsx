'use client'

import React from 'react';
import Nav from '../../(landing)/_components/Nav/Nav';
import Footer from '../../(landing)/_components/Footer/Footer';
import ScrollToTopButton from '@/components/global/top-button';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div>
        <Nav />
        {children}
        <Footer />
        <ScrollToTopButton />
      </div>
    );
};

export default Layout;