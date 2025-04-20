
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturedArticle from '../components/FeaturedArticle';
import CategorySection from '../components/CategorySection';
import ArticleCard from '../components/ArticleCard';
import { supabase } from '@/integrations/supabase/client';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  author?: string;
  imageUrl: string;
  readTime?: string;
}

const Index = () => {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [politicsArticles, setPoliticsArticles] = useState<Article[]>([]);
  const [technologyArticles, setTechnologyArticles] = useState<Article[]>([]);
  const [businessArticles, setBusinessArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = 'Times Roman | Latest News and Articles';
    
    // Fetch all articles
    const fetchArticles = async () => {
      setLoading(true);
      
      try {
        // Fetch all articles
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching articles:', error);
          return;
        }
        
        // Format articles
        const articles = data.map(article => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt || article.content?.substring(0, 120) || '',
          content: article.content,
          category: article.category,
          date: article.date,
          author: article.author,
          imageUrl: article.image_url,
          readTime: article.read_time
        }));
        
        // Set featured article (first one for now, but could be filtered by a "featured" flag)
        setFeaturedArticle(articles[0] || null);
        
        // Set latest articles (excluding featured)
        const latest = articles.slice(1, 5);
        setLatestArticles(latest);
        
        // Filter by categories
        setPoliticsArticles(articles.filter(a => a.category.toLowerCase() === 'politics').slice(0, 3));
        setTechnologyArticles(articles.filter(a => a.category.toLowerCase() === 'technology').slice(0, 3));
        setBusinessArticles(articles.filter(a => a.category.toLowerCase() === 'business').slice(0, 3));
        
        // If we don't have enough articles for a category, use mock data
        if (politicsArticles.length === 0) {
          setPoliticsArticles([
            {
              id: 'pol-mock-1',
              title: 'New Legislation Aims to Reform Tech Regulation',
              excerpt: 'Bipartisan effort introduces comprehensive bill addressing data privacy and platform accountability.',
              category: 'Politics',
              date: 'April 13, 2025',
              imageUrl: 'https://backend-live-coc.cfr.org/cdn/ff/9h1bEeqMIcPt85Qy2xkKs-EOZC57eEbb9Iq5xf5YZ3s/1734714256/public/publications/global-memos/2024-09-22T182830Z_837432971_RC2U5AAIH84C_RTRMADP_3_UN-SUMMIT%201%20%281%29.jpg?auto=format&fit=crop&q=80',
            }
          ]);
        }
        
        if (technologyArticles.length === 0) {
          setTechnologyArticles([
            {
              id: 'tech-mock-1',
              title: 'Revolutionary Quantum Computing Breakthrough Announced',
              excerpt: 'Scientists achieve stable quantum entanglement at room temperature, bringing practical quantum computing closer to reality.',
              category: 'Technology',
              date: 'April 14, 2025',
              imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
            }
          ]);
        }
        
        if (businessArticles.length === 0) {
          setBusinessArticles([
            {
              id: 'bus-mock-1',
              title: 'Sustainable Startups Attract Record Venture Capital',
              excerpt: 'Green tech companies secure unprecedented funding as investors prioritize environmental impact.',
              category: 'Business',
              date: 'April 14, 2025',
              imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  // Fallback featured article when loading or no data
  const fallbackFeaturedArticle = {
    id: 'featured-1',
    title: 'AI Revolution in Journalism: How Machine Learning is Reshaping News Media',
    excerpt: 'Machine learning algorithms are transforming how news is gathered, analyzed and presented to audiences worldwide.',
    category: 'Technology',
    date: 'April 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Featured Article */}
        <section className="container mx-auto px-4 py-6 md:py-8">
          {loading ? (
            <div className="aspect-[16/9] w-full animate-pulse bg-gray-200 rounded-lg"></div>
          ) : (
            <FeaturedArticle {...(featuredArticle || fallbackFeaturedArticle)} />
          )}
        </section>
        
        {/* Latest News Section */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 font-serif text-2xl font-bold">Latest News</h2>
            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[16/10] w-full bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded mt-4"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Category Sections */}
        <CategorySection
          title="Politics"
          categoryPath="/category/politics"
          articles={politicsArticles}
          loading={loading}
        />
        
        <div className="bg-gray-50">
          <CategorySection
            title="Technology"
            categoryPath="/category/technology"
            articles={technologyArticles}
            loading={loading}
          />
        </div>
        
        <CategorySection
          title="Business"
          categoryPath="/category/business"
          articles={businessArticles}
          loading={loading}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
