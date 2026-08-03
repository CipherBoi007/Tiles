import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import CatalogueDownload from '../../components/CatalogueDownload';

const PublicCatalogues = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <CatalogueDownload />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PublicCatalogues;
