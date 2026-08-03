import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  image, 
  type = 'website',
  schema
}) => {
  const location = useLocation();
  const canonicalUrl = `https://srilakshmitiles.com${location.pathname}`;
  
  const siteName = "Sri Lakshmi Tiles & Granites";
  const defaultTitle = `${siteName} | Ramanathapuram`;
  const defaultDesc = "Premium tiles, granites, and sanitaryware showroom in Ramanathapuram. Wide collection of ceramic, vitrified, wall, and floor tiles from top brands.";
  const defaultImage = "https://srilakshmitiles.com/SL_LOGO.png";
  
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
