
import React from 'react';
import { Helmet } from 'react-helmet';

interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  content?: string;
  tags?: string[];
}

interface PublisherInfo {
  name: string;
  logo: string;
  url?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
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
  breadcrumbs?: BreadcrumbItem[];
  keywords?: string[];
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Times Roman News - Breaking News, Latest News, India News, World News',
  description = 'Breaking News in India: Read Latest News on Sports, Business, Entertainment, World News and Political News. Get the latest updates on politics, technology, business, entertainment, sports and more.',
  ogImage = 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png',
  ogType = 'website',
  canonical,
  articleMeta,
  isArticle = false,
  publisherInfo = {
    name: 'Times Roman',
    logo: 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png',
    url: 'https://timesroman.in'
  },
  lang = 'en',
  breadcrumbs = [],
  keywords = [],
  noIndex = false
}) => {
  const siteName = 'Times Roman';
  const twitterHandle = '@timesroman_in';
  
  // Get current URL safely
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://timesroman.in';

  // Enhance description for SEO (minimum 150 characters)
  const enhancedDescription = description && description.length < 150 
    ? `${description} Stay updated with Times Roman - India's trusted source for breaking news, analysis and expert commentary on current events.` 
    : description;

  // Generate keywords for the page
  const defaultKeywords = [
    'Times Roman', 'breaking news', 'latest news', 'India news', 'world news',
    'politics', 'business', 'technology', 'entertainment', 'sports'
  ];
  
  const allKeywords = [...defaultKeywords, ...keywords];
  if (articleMeta?.category) {
    allKeywords.push(articleMeta.category.toLowerCase());
  }
  if (articleMeta?.tags) {
    allKeywords.push(...articleMeta.tags);
  }

  // Generate rich structured data
  const generateStructuredData = () => {
    const structuredDataArray = [];

    // Website structured data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: baseUrl,
      description: 'Times Roman - Breaking News, Latest Updates, and In-depth Analysis',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: publisherInfo.name,
        url: publisherInfo.url || baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: publisherInfo.logo,
          width: 600,
          height: 60
        }
      }
    };
    structuredDataArray.push(websiteData);

    // Organization data
    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: publisherInfo.name,
      url: publisherInfo.url || baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: publisherInfo.logo,
        width: 600,
        height: 60
      },
      sameAs: [
        'https://x.com/timesroman_in',
        'https://www.linkedin.com/company/times-roman/',
        'https://www.instagram.com/timesroman.in/',
        'https://whatsapp.com/channel/0029VbApDCe6GcG9wAYtkN0p'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'editorial',
        url: `${baseUrl}/contact`
      }
    };
    structuredDataArray.push(organizationData);

    // Article structured data (only for article pages)
    if (isArticle && articleMeta) {
      const articleData = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: title,
        description: enhancedDescription,
        image: {
          '@type': 'ImageObject',
          url: ogImage,
          width: 1200,
          height: 630
        },
        datePublished: articleMeta.publishedTime,
        dateModified: articleMeta.modifiedTime || articleMeta.publishedTime,
        author: {
          '@type': 'Person',
          name: articleMeta.author || 'Times Roman Editorial Team'
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
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        articleSection: articleMeta.category || 'News',
        articleBody: articleMeta.content?.substring(0, 500) || '',
        keywords: allKeywords.join(', '),
        inLanguage: lang
      };
      
      if (articleMeta.tags && articleMeta.tags.length > 0) {
        articleData.keywords = articleMeta.tags.join(', ');
      }
      
      structuredDataArray.push(articleData);
    }

    // Breadcrumb structured data
    if (breadcrumbs.length > 0) {
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${baseUrl}${crumb.url}`
        }))
      };
      structuredDataArray.push(breadcrumbData);
    }

    return JSON.stringify(structuredDataArray);
  };

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots meta */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - ${siteName}`} />
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
      <meta name="twitter:image:alt" content={`${title} - ${siteName}`} />

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
            <meta property="article:section" content={articleMeta.category} />
          )}
          {articleMeta.tags && articleMeta.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="author" content={articleMeta?.author || siteName} />
      <meta name="publisher" content={publisherInfo.name} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${siteName}`} />
      <meta name="language" content={lang} />
      <meta name="revisit-after" content="1 day" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geo Tags for Indian News */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="geo.placename" content="India" />

      {/* News specific meta tags */}
      {isArticle && (
        <>
          <meta name="news_keywords" content={allKeywords.slice(0, 10).join(', ')} />
          <meta name="syndication-source" content={canonicalUrl} />
          <meta name="original-source" content={canonicalUrl} />
        </>
      )}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://i.ibb.co" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {generateStructuredData()}
      </script>
    </Helmet>
  );
};

export default SEOHead;
