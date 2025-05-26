
import React from 'react';
import { Helmet } from 'react-helmet';

interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  content?: string;
}

interface PublisherInfo {
  name: string;
  logo: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  articleMeta?: ArticleMeta;
  isArticle?: boolean;
  publisherInfo?: PublisherInfo;
  lang?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Times Roman News - Breaking News, Latest News, India News, World News',
  description = 'Breaking News in India: Read Latest News on Sports, Business, Entertainment, World News and Political News. Get accurate, AI-powered news coverage.',
  ogImage = 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png',
  ogType = 'website',
  canonical,
  articleMeta,
  isArticle = false,
  publisherInfo = {
    name: 'Times Roman',
    logo: 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png'
  },
  lang = 'en'
}) => {
  const siteName = 'Times Roman';
  const twitterHandle = '@timesroman_in';
  
  // Use window.location.href safely by checking if window exists (for SSR compatibility)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://timesroman.in';

  // Ensure description is optimal for SEO (120-160 characters)
  const enhancedDescription = description && description.length < 120 
    ? `${description} Stay informed with Times Roman's comprehensive news coverage.` 
    : description;

  // Safe string conversion function
  const safeString = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value.toString();
    // Handle symbols and other non-serializable values
    try {
      return String(value);
    } catch {
      return '';
    }
  };

  // Create structured data for website
  const websiteStructuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": safeString(siteName),
    "alternateName": "Times Roman News",
    "url": safeString(baseUrl),
    "description": safeString(enhancedDescription),
    "inLanguage": safeString(lang),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": safeString(publisherInfo.name),
      "url": safeString(baseUrl),
      "logo": {
        "@type": "ImageObject",
        "url": safeString(publisherInfo.logo),
        "width": 600,
        "height": 60
      }
    }
  });

  // Create structured data for organization
  const organizationStructuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": safeString(publisherInfo.name),
    "alternateName": "Times Roman News",
    "url": safeString(baseUrl),
    "description": "Next-generation AI-powered news platform delivering fresh, unbiased perspectives on current events.",
    "foundingDate": "2024",
    "logo": {
      "@type": "ImageObject",
      "url": safeString(publisherInfo.logo),
      "width": 600,
      "height": 60,
      "caption": "Times Roman Logo"
    },
    "sameAs": [
      "https://x.com/timesroman_in",
      "https://www.linkedin.com/company/times-roman/",
      "https://www.instagram.com/timesroman.in/",
      "https://whatsapp.com/channel/0029VbApDCe6GcG9wAYtkN0p"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@timesroman.in",
      "url": `${baseUrl}/contact`
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  });

  // Create article structured data if this is an article
  let articleStructuredData = '';
  if (isArticle && articleMeta) {
    articleStructuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": safeString(title),
      "description": safeString(enhancedDescription),
      "image": {
        "@type": "ImageObject",
        "url": safeString(ogImage),
        "width": 1200,
        "height": 630,
        "caption": safeString(title)
      },
      "datePublished": safeString(articleMeta.publishedTime || new Date().toISOString()),
      "dateModified": safeString(articleMeta.modifiedTime || articleMeta.publishedTime || new Date().toISOString()),
      "author": {
        "@type": "Person",
        "name": safeString(articleMeta.author || 'Times Roman Editorial Team'),
        "jobTitle": "Journalist",
        "worksFor": {
          "@type": "Organization",
          "name": safeString(publisherInfo.name)
        }
      },
      "publisher": {
        "@type": "NewsMediaOrganization",
        "name": safeString(publisherInfo.name),
        "url": safeString(baseUrl),
        "logo": {
          "@type": "ImageObject",
          "url": safeString(publisherInfo.logo),
          "width": 600,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": safeString(canonicalUrl)
      },
      "articleSection": safeString(articleMeta.category || 'News'),
      "articleBody": safeString(articleMeta.content?.substring(0, 500) || ''),
      "wordCount": articleMeta.content?.split(' ').length || 0,
      "inLanguage": safeString(lang),
      "copyrightHolder": {
        "@type": "Organization",
        "name": safeString(publisherInfo.name)
      },
      "copyrightYear": new Date().getFullYear(),
      "isAccessibleForFree": true,
      "genre": "news"
    });
  }

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={isArticle && articleMeta ? `${articleMeta.category}, news, ${articleMeta.author}, breaking news, latest news` : 'news, breaking news, latest news, india news, world news, politics, technology, business'} />
      <meta name="author" content={isArticle && articleMeta ? articleMeta.author : 'Times Roman Editorial Team'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={isArticle ? 'article' : ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Enhanced Image Meta Tags */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={title} />

      {/* Article Specific Meta Tags */}
      {isArticle && articleMeta && (
        <>
          {articleMeta.publishedTime && (
            <meta property="article:published_time" content={articleMeta.publishedTime} />
          )}
          {articleMeta.modifiedTime && (
            <meta property="article:modified_time" content={articleMeta.modifiedTime} />
          )}
          {articleMeta.author && (
            <meta property="article:author" content={articleMeta.author} />
          )}
          {articleMeta.category && (
            <>
              <meta property="article:section" content={articleMeta.category} />
              <meta property="article:tag" content={articleMeta.category} />
            </>
          )}
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Performance and Cache Headers */}
      <meta httpEquiv="Cache-Control" content="max-age=86400, public" />
      
      {/* RSS Feed Link */}
      <link rel="alternate" type="application/rss+xml" title={`${siteName} RSS Feed`} href={`${baseUrl}/rss.xml`} />
      
      {/* JSON-LD structured data - using safe string conversion */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteStructuredData }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationStructuredData }} />
      {articleStructuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleStructuredData }} />
      )}
    </Helmet>
  );
};

export default SEOHead;
