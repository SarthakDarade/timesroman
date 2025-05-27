
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
  title = 'Times Roman News',
  description = 'Breaking News in India: Read Latest News on Sports, Business, Entertainment, World News and Political News.',
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
  const twitterHandle = '@timesroman';
  
  // Use window.location.href safely by checking if window exists (for SSR compatibility)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;

  // Ensure description is not too short (minimum 120 characters for SEO)
  const enhancedDescription = description && description.length < 120 
    ? `${description} Read more on Times Roman, the next-generation AI-powered news platform.` 
    : description;
    
  // Create JSON-LD structured data
  const generateStructuredData = () => {
    // Base website structured data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: canonicalUrl.split('/').slice(0, 3).join('/'), // Root domain
      potentialAction: {
        '@type': 'SearchAction',
        target: `${canonicalUrl.split('/').slice(0, 3).join('/')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
    
    // Organization data
    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: publisherInfo.name,
      url: canonicalUrl.split('/').slice(0, 3).join('/'),
      logo: {
        '@type': 'ImageObject',
        url: publisherInfo.logo,
        width: 600,
        height: 60
      },
      sameAs: [
        'https://twitter.com/timesroman',
        'https://facebook.com/timesroman'
      ]
    };
    
    // Article structured data (only if this is an article page)
    const articleData = isArticle && articleMeta ? {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: title,
      image: [ogImage],
      datePublished: articleMeta.publishedTime,
      dateModified: articleMeta.modifiedTime || articleMeta.publishedTime,
      author: {
        '@type': 'Organization',
        name: articleMeta.author || 'Times Roman'
      },
      publisher: {
        '@type': 'Organization',
        name: publisherInfo.name,
        logo: {
          '@type': 'ImageObject',
          url: publisherInfo.logo,
          width: 600,
          height: 60
        }
      },
      description: enhancedDescription,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      articleSection: articleMeta.category || 'News',
      articleBody: articleMeta.content?.substring(0, 500) || ''
    } : null;
    
    return JSON.stringify([
      websiteData,
      organizationData,
      ...(articleData ? [articleData] : [])
    ]);
  };

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={enhancedDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={isArticle ? 'article' : ogType} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Ensure preview works on WhatsApp and other platforms */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article Specific Meta Tags - Only render if ogType is article and articleMeta exists */}
      {isArticle && articleMeta && articleMeta.publishedTime && (
        <meta property="article:published_time" content={articleMeta.publishedTime} />
      )}
      {isArticle && articleMeta && articleMeta.modifiedTime && (
        <meta property="article:modified_time" content={articleMeta.modifiedTime} />
      )}
      {isArticle && articleMeta && articleMeta.author && (
        <meta property="article:author" content={articleMeta.author} />
      )}
      {isArticle && articleMeta && articleMeta.category && (
        <meta property="article:section" content={articleMeta.category} />
      )}
      
      {/* IndexNow API Key Tag */}
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_ID" />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">{generateStructuredData()}</script>
    </Helmet>
  );
};

export default SEOHead;
