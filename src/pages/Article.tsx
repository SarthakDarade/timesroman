
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticlePage from '../components/ArticlePage';
import ArticleCard from '../components/ArticleCard';
import ReadingProgressBar from '../components/ReadingProgressBar';
import SEOHead from '../components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { generateBreadcrumbs, generateArticleKeywords, generateMetaDescription, optimizeImageUrl } from '@/utils/seoHelpers';

// ... keep existing code (interface definition)

const Article = () => {
  // ... keep existing code (state variables and URL logic)
  const location = useLocation();

  // ... keep existing code (useEffect for fetching articles and view count)

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEOHead 
          title="Loading Article | Times Roman" 
          description="Loading the latest news article from Times Roman."
          noIndex={true}
        />
        <Navbar />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEOHead 
          title="Article Not Found | Times Roman" 
          description="The article you're looking for doesn't exist or has been removed from Times Roman news."
          noIndex={true}
        />
        <Navbar />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="text-2xl font-bold">Article not found</h1>
            <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              aria-label="Back to homepage"
            >
              Back to Homepage
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ... keep existing code (standardized article)

  // Enhanced SEO data for article page
  const articleDescription = generateMetaDescription(
    article.excerpt || '', 
    article.content || '', 
    article.title
  );
  
  const articleKeywords = generateArticleKeywords(
    article.title, 
    article.content || '', 
    article.category
  );
  
  const articleBreadcrumbs = generateBreadcrumbs(location.pathname, article.title);
  
  const optimizedImageUrl = optimizeImageUrl(article.imageUrl, 1200, 630);
  
  // ... keep existing code (strip HTML function)

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead 
        title={`${article.title} | Times Roman`}
        description={articleDescription}
        ogImage={optimizedImageUrl}
        ogType="article"
        canonical={currentUrl}
        isArticle={true}
        articleMeta={{
          publishedTime: standardizedArticle.created_at,
          modifiedTime: standardizedArticle.updated_at,
          author: article.author,
          category: article.category,
          content: articleContent,
          tags: articleKeywords
        }}
        publisherInfo={{
          name: 'Times Roman',
          logo: 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png',
          url: 'https://timesroman.in'
        }}
        breadcrumbs={articleBreadcrumbs}
        keywords={articleKeywords}
      />
      <ReadingProgressBar />
      <Navbar />
      
      {/* ... keep existing code (main content) */}
      
      <Footer />
    </div>
  );
};

export default Article;
