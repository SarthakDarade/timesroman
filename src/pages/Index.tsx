
import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturedArticle from '../components/FeaturedArticle';
import CategorySection from '../components/CategorySection';
import SEOHead from '../components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import { subscribeToArticleChanges } from '@/utils/realtimeHelpers';
import { generateBreadcrumbs } from '@/utils/seoHelpers';

// ... keep existing code (lazy loaded components and interfaces)

const Index = () => {
  // ... keep existing code (state variables and desired categories)

  // ... keep existing code (fetchArticles function)

  useEffect(() => {
    // Initial fetch
    fetchArticles();
    
    // Set up real-time subscription for article changes
    const cleanup = subscribeToArticleChanges((payload) => {
      console.log('Article change detected:', payload);
      fetchArticles();
    });
    
    return () => {
      cleanup();
    };
  }, []);

  // Enhanced SEO data for homepage
  const homepageBreadcrumbs = generateBreadcrumbs('/', 'Home');
  const homepageKeywords = [
    'times roman', 'breaking news india', 'latest news today', 'indian news portal',
    'current affairs', 'news updates', 'political news', 'business news india',
    'technology news', 'entertainment news', 'sports news india', 'world news',
    'hindi news', 'english news india', 'news website', 'online news'
  ];

  // ... keep existing code (fallback featured article)

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead 
        title="Times Roman News - Breaking News, Latest Headlines & Updates from India"
        description="Stay informed with Times Roman: Read the latest breaking news, headlines and updates on politics, business, technology, entertainment, sports, world events and more from India and around the globe."
        isArticle={false}
        publisherInfo={{
          name: 'Times Roman',
          logo: 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png',
          url: 'https://timesroman.in'
        }}
        breadcrumbs={homepageBreadcrumbs}
        keywords={homepageKeywords}
        ogImage="https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png"
      />
      <Navbar />
      
      {/* ... keep existing code (main content) */}
      
      <Footer />
    </div>
  );
};

export default Index;
