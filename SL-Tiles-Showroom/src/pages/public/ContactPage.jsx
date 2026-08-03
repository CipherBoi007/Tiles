import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import ContactSection from '../../components/ContactSection';
import SEO from '../../components/SEO';

const ContactPage = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Contact Our Showroom" 
        description="Get in touch with Sri Lakshmi Tiles & Granites in Ramanathapuram. Visit our showroom, call us, or chat with us on WhatsApp for your flooring needs."
      />
      <Header />
      <main className="flex-1 pt-24">
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ContactPage;
