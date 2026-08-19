import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords,
  image, 
  type = 'website',
  schema
}) => {
  const location = useLocation();
  const canonicalUrl = `https://srilakshmitiles.com${location.pathname}${location.search}`;
  
  const siteName = "SRI LAKSHMI TILES AND GRANITES";
  const defaultTitle = `${siteName} | Premium Vitrified Tiles, Marble & Granites in Ramanathapuram & Madurai`;
  const defaultDesc = "Sri Lakshmi Tiles and Granites is Tamil Nadu's premier luxury showroom for imported marble, vitrified floor tiles, ceramic wall tiles, granite slabs, and sanitaryware. Located on Madurai - Rameswaram Hwy, Ramanathapuram.";
  const defaultKeywords = "SRI LAKSHMI TILES AND GRANITES, luxury tiles Ramanathapuram, vitrified tiles Madurai, marble slabs Rameswaram, granite tiles Tamil Nadu, floor tiles showroom, ceramic wall tiles, bathroom tiles, outdoor parking tiles, 600x600 tiles";
  const defaultImage = "https://srilakshmitiles.com/SL_LOGO.png";
  
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image || defaultImage;

  // Global Organization & WebSite Searchbox Schema (Google Sitelinks)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://srilakshmitiles.com/#organization",
        "name": siteName,
        "url": "https://srilakshmitiles.com",
        "logo": {
          "@type": "ImageObject",
          "url": defaultImage
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9876543210",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Tamil"]
        },
        "sameAs": [
          "https://www.facebook.com/srilakshmitiles",
          "https://www.instagram.com/sri_lakshmi_tiles_and_granite",
          "https://twitter.com/srilakshmitiles"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://srilakshmitiles.com/#website",
        "url": "https://srilakshmitiles.com",
        "name": siteName,
        "publisher": {
          "@id": "https://srilakshmitiles.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://srilakshmitiles.com/collections?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Technical Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Geo-Targeting Local Meta Tags for Ramanathapuram / Madurai / Tamil Nadu */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Ramanathapuram, Madurai, Rameswaram, Tamil Nadu" />
      <meta name="geo.position" content="9.3667;78.8333" />
      <meta name="ICBM" content="9.3667, 78.8333" />
      <meta httpEquiv="content-language" content="en-US, en-IN, ta-IN" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />

      {/* Organization & Sitelinks Search Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Custom Page Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
