import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import CategoryGrid from '../../components/CategoryGrid';
import ProductGrid from '../../components/ProductGrid';
import InspirationGallery from '../../components/InspirationGallery';
import WhyChooseUs from '../../components/WhyChooseUs';
import Testimonials from '../../components/Testimonials';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import CatalogueDownload from '../../components/CatalogueDownload';
import ContactSection from '../../components/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg">
      <Header />
      <Hero />
      <CategoryGrid />
      <ProductGrid />
      <InspirationGallery />
      <WhyChooseUs />
      <CatalogueDownload />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Home;
