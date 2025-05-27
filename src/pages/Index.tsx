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

// Lazy load components for better performance
const TrendingNews = lazy(() => import('../components/TrendingNews'));
const NewsletterSignup = lazy(() => import('../components/NewsletterSignup'));

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  created_at: string;
  updated_at: string;
  views: number;
  date: string;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  const desiredCategories = [
    'politics', 'technology', 'business', 'entertainment', 
    'sports', 'health', 'world news', 'india news', 'us news', 'latest news'
  ];

  const fetchArticles = async () => {
    try {
      console.log('Fetching articles from Supabase...');
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }

      console.log('Articles fetched:', data?.length || 0);
      setArticles(data || []);
    } catch (error) {
      console.error('Error in fetchArticles:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Get featured article (first article or fallback)
  const fallbackFeaturedArticle = {
    id: 'fallback',
    title: 'Welcome to Times Roman',
    excerpt: 'Your trusted source for breaking news, analysis and updates from India and around the world.',
    content: 'Stay informed with the latest news and updates.',
    image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    author: 'Times Roman Team',
    category: 'General',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    views: 0,
    date: new Date().toLocaleDateString()
  };

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
      
      <main className="container mx-auto flex-1 px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading latest news...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Article Section */}
            <section aria-labelledby="featured-news">
              <h2 id="featured-news" className="sr-only">Featured News</h2>
              <FeaturedArticle 
                article={articles[0] || fallbackFeaturedArticle}
              />
            </section>

            {/* Trending News Section */}
            <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded-lg"></div>}>
              <section aria-labelledby="trending-news">
                <TrendingNews articles={articles.slice(1, 5)} />
              </section>
            </Suspense>

            {/* Category Sections */}
            <div className="space-y-12">
              {desiredCategories.map((category) => {
                const categoryArticles = articles.filter(
                  (article) => article.category.toLowerCase() === category.toLowerCase()
                );
                
                if (categoryArticles.length === 0) return null;

                return (
                  <section key={category} aria-labelledby={`${category}-news`}>
                    <CategorySection
                      title={category.charAt(0).toUpperCase() + category.slice(1)}
                      articles={categoryArticles.slice(0, isMobile ? 3 : 6)}
                      categoryId={category}
                    />
                  </section>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100 rounded-lg"></div>}>
              <section aria-labelledby="newsletter-signup">
                <NewsletterSignup />
              </section>
            </Suspense>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
