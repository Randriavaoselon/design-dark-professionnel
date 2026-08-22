import { Helmet } from "react-helmet-async";

const SITE_NAME = "Agentova";
const DEFAULT_IMAGE = "https://agentova-ai.vercel.app/og-image.png"; 
const SITE_URL = "https://agentova-ai.vercel.app"; 

function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  includeOrgSchema = false,
}) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Agentova met à votre disposition des agents IA spécialisés pour automatiser le marketing, les ventes, le SEO et la relation client.",
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph (Facebook, LinkedIn, WhatsApp...) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {includeOrgSchema && (
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;