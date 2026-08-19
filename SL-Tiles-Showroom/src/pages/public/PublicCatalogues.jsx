import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import CatalogueDownload from '../../components/CatalogueDownload';
import SEO from '../../components/SEO';

const PublicCatalogues = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Download Tile & Granite Catalogues" 
        description="Download our latest 2026 product catalogues. View our complete range of ceramic, vitrified, parking, and bathroom tiles in high-resolution PDF format."
      />
      <Header />
      <main className="flex-1 pt-0">
        <CatalogueDownload isStandalone={true} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PublicCatalogues;
