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

const homeSchemas = [
  {
    "@context": "https://schema.org",
    "@type": ["TileStore", "HomeGoodsStore"],
    "@id": "https://srilakshmitiles.com/#store",
    "name": "SRI LAKSHMI TILES AND GRANITES",
    "legalName": "Sri Lakshmi Tiles and Granites",
    "image": "https://srilakshmitiles.com/SL_LOGO.png",
    "url": "https://srilakshmitiles.com",
    "telephone": "+91-9876543210",
    "email": "srilakshimitilesandgranite@gmail.com",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madurai - Rameswaram Hwy, near mugavai car Care Mandapam, Muniyasamy nagar, Pattinamkathan",
      "addressLocality": "Ramanathapuram",
      "addressRegion": "Tamil Nadu",
      "postalCode": "623536",
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
      "opens": "09:00",
      "closes": "21:00"
    },
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
    "currenciesAccepted": "INR",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Ramanathapuram" },
      { "@type": "AdministrativeArea", "name": "Madurai" },
      { "@type": "AdministrativeArea", "name": "Rameswaram" },
      { "@type": "AdministrativeArea", "name": "Tamil Nadu" }
    ],
    "sameAs": [
      "https://www.facebook.com/srilakshmitiles",
      "https://www.instagram.com/sri_lakshmi_tiles_and_granite"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where is SRI LAKSHMI TILES AND GRANITES located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SRI LAKSHMI TILES AND GRANITES is located at Madurai - Rameswaram Hwy, near mugavai car Care Mandapam, Muniyasamy nagar, Pattinamkathan, Ramanathapuram, Tamil Nadu 623536."
        }
      },
      {
        "@type": "Question",
        "name": "What are the opening hours of the showroom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our showroom is open 7 days a week, Monday to Sunday from 9:00 AM to 9:00 PM."
        }
      },
      {
        "@type": "Question",
        "name": "What types of tiles and slabs are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer premium vitrified floor tiles, ceramic wall tiles, imported Italian marble slabs, granite slabs, outdoor parking tiles, and luxury mosaic backsplashes."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide bulk ordering for builders and contractors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer special bulk pricing and direct support for construction professionals, contractors, and builders with volume discounts."
        }
      }
    ]
  }
];

const Home = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col w-full overflow-x-hidden relative">
      <SEO 
        title="Best Vitrified Tiles, Marble & Granites Showroom" 
        description="SRI LAKSHMI TILES AND GRANITES is Tamil Nadu's leading luxury showroom for vitrified floor tiles, imported marble, granites & wall cladding in Ramanathapuram & Madurai."
        keywords="SRI LAKSHMI TILES AND GRANITES, vitrified tiles Ramanathapuram, marble slabs Madurai, granite tiles Tamil Nadu, floor tiles showroom, ceramic wall tiles, bathroom tiles, luxury tiles Rameswaram"
        schema={homeSchemas} 
      />
      <Header />
      <Hero />
      <CategoryGrid />
      <ProductGrid />
      <OffersBanner />
      <InspirationGallery />
      <WhyChooseUs />
      <CatalogueDownload />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
      <LeadCapturePopup />
    </div>
  );
};

export default Home;
