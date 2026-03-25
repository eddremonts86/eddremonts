import { personalInfo } from '@/data/cvData';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO = ({ title, description, image, url }: SEOProps) => {
  const { i18n } = useTranslation();

  const siteTitle = title || `${personalInfo.name} - ${personalInfo.title}`;
  const siteDescription = description || personalInfo.description;
  const siteImage = image || 'https://eddremonts.dk/storage/app/media/og-image.jpg'; // Placeholder
  const siteUrl = url || 'https://eddremonts.dk';

  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": personalInfo.name,
          "jobTitle": personalInfo.title,
          "url": siteUrl,
          "sameAs": personalInfo.socials.map(s => s.url)
        })}
      </script>
    </Helmet>
  );
};
