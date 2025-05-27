
import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// Lazy load ArticleCard
const ArticleCard = lazy(() => import('./ArticleCard'));

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

interface CategorySectionProps {
  title: string;
  articles: Article[];
  categoryId?: string;
  loading?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  articles,
  categoryId,
  loading = false,
}) => {
  // Get gradient background based on title
  const getGradientClass = () => {
    const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');
    
    switch (normalizedTitle) {
      case 'technology': return 'bg-gradient-to-r from-purple-50 to-indigo-50';
      case 'business': return 'bg-gradient-to-r from-emerald-50 to-teal-50';
      case 'politics': return 'bg-gradient-to-r from-indigo-50 to-blue-50';
      case 'health': return 'bg-gradient-to-r from-orange-50 to-amber-50';
      case 'science': return 'bg-gradient-to-r from-cyan-50 to-sky-50';
      case 'entertainment': return 'bg-gradient-to-r from-pink-50 to-rose-50';
      case 'world-news': return 'bg-gradient-to-r from-blue-50 to-sky-50';
      case 'us-news': return 'bg-gradient-to-r from-red-50 to-orange-50';
      case 'india-news': return 'bg-gradient-to-r from-amber-50 to-orange-50';
      case 'sports-news': return 'bg-gradient-to-r from-green-50 to-emerald-50';
      case 'cricket': return 'bg-gradient-to-r from-green-50 to-teal-50';
      case 'government-news': return 'bg-gradient-to-r from-slate-50 to-gray-50';
      case 'press-releases': return 'bg-gradient-to-r from-gray-50 to-slate-50';
      case 'latest-news': return 'bg-gradient-to-r from-blue-50 to-blue-100';
      case 'technology-news': return 'bg-gradient-to-r from-indigo-50 to-purple-50';
      case 'business-news': return 'bg-gradient-to-r from-teal-50 to-emerald-50';
      case 'entertainment-news': return 'bg-gradient-to-r from-rose-50 to-pink-50';
      case 'lifestyle': return 'bg-gradient-to-r from-violet-50 to-purple-50';
      default: return 'bg-gray-50';
    }
  };

  // Get border color for section header
  const getBorderColor = () => {
    const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');
    
    switch (normalizedTitle) {
      case 'technology': return 'after:bg-purple-600';
      case 'business': return 'after:bg-emerald-600';
      case 'politics': return 'after:bg-indigo-600';
      case 'health': return 'after:bg-orange-600';
      case 'science': return 'after:bg-cyan-600';
      case 'entertainment': return 'after:bg-pink-600';
      case 'world-news': return 'after:bg-blue-600';
      case 'us-news': return 'after:bg-red-600';
      case 'india-news': return 'after:bg-amber-600';
      case 'sports-news': return 'after:bg-green-600';
      case 'cricket': return 'after:bg-teal-600';
      case 'government-news': return 'after:bg-slate-600';
      case 'press-releases': return 'after:bg-gray-600';
      case 'latest-news': return 'after:bg-blue-600';
      case 'technology-news': return 'after:bg-indigo-600';
      case 'business-news': return 'after:bg-teal-600';
      case 'entertainment-news': return 'after:bg-rose-600';
      case 'lifestyle': return 'after:bg-violet-600';
      default: return 'after:bg-blue-600';
    }
  };

  const categoryPath = `/category/${categoryId || title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section className={`py-8 md:py-12 ${getGradientClass()}`}>
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 flex items-center justify-between flex-wrap animate-[fadeIn_0.5s_ease-in-out]">
          <h2 className={`font-serif text-2xl md:text-3xl font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 ${getBorderColor()}`}>
            {title}
          </h2>
          <Link to={categoryPath} className="mt-2 md:mt-0">
            <Button variant="default" size="sm" className="text-sm bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <div 
                key={`loading-${index}`} 
                className="animate-pulse rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-[16/10] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual articles
            <>
              <Suspense fallback={<div className="col-span-full flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>}>
                {articles.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="animate-[fadeIn_0.5s_ease-in-out]" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </Suspense>
              {articles.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No articles in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
