import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import ProductGrid from '../../components/ProductGrid';
import CategoryGrid from '../../components/CategoryGrid';
import InspirationGallery from '../../components/InspirationGallery';
import WhyChooseUs from '../../components/WhyChooseUs';
import Testimonials from '../../components/Testimonials';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import LeadCapturePopup from '../../components/LeadCapturePopup';
import OffersBanner from '../../components/OffersBanner';
import SEO from '../../components/SEO';
import CatalogueDownload from '../../components/CatalogueDownload';
import ContactSection from '../../components/ContactSection';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Sri Lakshmi Tiles & Granites",
  "image": "https://srilakshmitiles.com/SL_LOGO.png",
  "@id": "https://srilakshmitiles.com",
  "url": "https://srilakshmitiles.com",
  "telephone": "+918608666441",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13-3011-10, Muniyasamy Nagar, Rameswaram ECR Road",
    "addressLocality": "Ramanathapuram",
    "addressRegion": "TN",
    "postalCode": "623501",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.3667,
    "longitude": 78.8333
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "10:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.facebook.com/srilakshmitiles",
    "https://www.instagram.com/srilakshmitiles"
  ]
};

const Home = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Best Tiles Showroom" 
        schema={localBusinessSchema} 
      />
      <Header />
      <Hero />
      <CategoryGrid />
      <ProductGrid />
      <InspirationGallery />
      <OffersBanner />
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
