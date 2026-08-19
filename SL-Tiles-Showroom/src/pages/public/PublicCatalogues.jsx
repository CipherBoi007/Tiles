import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import CatalogueDownload from '../../components/CatalogueDownload';
import SEO from '../../components/SEO';

const catalogueSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://srilakshmitiles.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "PDF Catalogues",
        "item": "https://srilakshmitiles.com/catalogues"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "SRI LAKSHMI TILES AND GRANITES Product Catalogue Library 2026",
    "description": "Download high-resolution technical catalogues and design spec sheets for imported vitrified tiles, marble slabs, and commercial flooring series.",
    "publisher": {
      "@type": "Organization",
      "name": "SRI LAKSHMI TILES AND GRANITES"
    }
  }
];

const PublicCatalogues = () => {
  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Download Tile & Granite Catalogues (PDF Brochure 2026)" 
        description="Download our latest 2026 product catalogues and technical specification sheets. View our complete range of ceramic, vitrified, parking, and marble tiles in high-resolution PDF."
        keywords="download tile catalogue PDF, vitrified tiles catalog 2026, SRI LAKSHMI TILES brochure, marble tiles spec sheet, Ramanathapuram tiles catalogue"
        schema={catalogueSchemas}
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
