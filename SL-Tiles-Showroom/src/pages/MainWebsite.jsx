import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import InspirationGallery from '../components/InspirationGallery';
import WhyChooseUs from '../components/WhyChooseUs';
import OffersBanner from '../components/OffersBanner';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

function MainWebsite() {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg">
      <Header />
      <Hero />
      <CategoryGrid />
      <ProductGrid />
      <InspirationGallery />
      <WhyChooseUs />
      <OffersBanner />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default MainWebsite;
