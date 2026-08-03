import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import ProductGrid from '../../components/ProductGrid';
import SEO from '../../components/SEO';

const PublicCollections = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Ceramic & Vitrified Tile Collections" 
        description="Explore our wide range of premium ceramic, vitrified, wall, and floor tiles. Filter by category, size, and finish."
      />
      <Header />
      <main className="flex-1 pt-24">
        <ProductGrid />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PublicCollections;
