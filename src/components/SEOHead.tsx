
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
    
  // Create comprehensive JSON-LD structured data
  const generateStructuredData = () => {
    // Base website structured data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      alternateName: 'Times Roman News',
      url: baseUrl,
      description: enhancedDescription,
      inLanguage: lang,
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
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: publisherInfo.logo,
          width: 600,
          height: 60
        }
      }
    };
    
    // Organization data with enhanced information
    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: publisherInfo.name,
      alternateName: 'Times Roman News',
      url: baseUrl,
      description: 'Next-generation AI-powered news platform delivering fresh, unbiased perspectives on current events.',
      foundingDate: '2024',
      logo: {
        '@type': 'ImageObject',
        url: publisherInfo.logo,
        width: 600,
        height: 60,
        caption: 'Times Roman Logo'
      },
      sameAs: [
        'https://x.com/timesroman_in',
        'https://www.linkedin.com/company/times-roman/',
        'https://www.instagram.com/timesroman.in/',
        'https://whatsapp.com/channel/0029VbApDCe6GcG9wAYtkN0p'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'contact@timesroman.in',
        url: `${baseUrl}/contact`
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      }
    };
    
    // Breadcrumb data for better navigation understanding
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl
        }
      ]
    };

    // Create the final array with proper typing
    const structuredDataArray: Record<string, any>[] = [];
    
    // Add basic data
    structuredDataArray.push(websiteData);
    structuredDataArray.push(organizationData);

    // Add category to breadcrumb if it's an article
    if (isArticle && articleMeta?.category) {
      breadcrumbData.itemListElement.push({
        '@type': 'ListItem',
        position: 2,
        name: articleMeta.category,
        item: `${baseUrl}/category/${articleMeta.category.toLowerCase().replace(/\s+/g, '-')}`
      });
      
      breadcrumbData.itemListElement.push({
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: canonicalUrl
      });
    }
    
    structuredDataArray.push(breadcrumbData);
    
    // Article structured data (only if this is an article page)
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
          height: 630,
          caption: title
        },
        datePublished: articleMeta.publishedTime || new Date().toISOString(),
        dateModified: articleMeta.modifiedTime || articleMeta.publishedTime || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: articleMeta.author || 'Times Roman Editorial Team',
          jobTitle: 'Journalist',
          worksFor: {
            '@type': 'Organization',
            name: publisherInfo.name
          }
        },
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: publisherInfo.name,
          url: baseUrl,
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
        wordCount: articleMeta.content?.split(' ').length || 0,
        inLanguage: lang,
        copyrightHolder: {
          '@type': 'Organization',
          name: publisherInfo.name
        },
        copyrightYear: new Date().getFullYear(),
        isAccessibleForFree: true,
        genre: 'news'
      };
      
      structuredDataArray.push(articleData);
    }
    
    // Safely stringify the data to avoid Symbol conversion issues
    try {
      // Clean the data to remove any potential Symbol values
      const cleanData = JSON.parse(JSON.stringify(structuredDataArray, (key, value) => {
        if (typeof value === 'symbol') {
          return value.toString();
        }
        return value;
      }));
      
      return JSON.stringify(cleanData);
    } catch (error) {
      console.error('Error stringifying structured data:', error);
      // Return a minimal fallback structured data
      return JSON.stringify([{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: baseUrl,
        description: enhancedDescription || 'Times Roman News'
      }]);
    }
  };

  // Generate the structured data string
  const structuredDataString = generateStructuredData();

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
      
      {/* JSON-LD structured data - using dangerouslySetInnerHTML to avoid React processing */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      />
    </Helmet>
  );
};

export default SEOHead;
