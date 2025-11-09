import React from 'react';

const SEO = ({
  title = 'Kanata-Toon - Baca Komik Gratis Bahasa Indonesia Terbaru',
  description = 'Baca komik online gratis di Kanata-Toon. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!',
  keywords = 'komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia, komik terbaru, komik trending',
  image = 'https://comic.antidonasi.web.id/vite.svg',
  url = 'https://comic.antidonasi.web.id/',
  type = 'website',
  structuredData = null
}) => {
  const siteTitle = 'Kanata-Toon';
  const fullTitle = title.includes(siteTitle) ? title : `${title} - ${siteTitle}`;

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </>
  );
};

export default SEO;
