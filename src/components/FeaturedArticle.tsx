
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';

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

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  // Map category to color class
  const getCategoryClass = () => {
    switch (article.category.toLowerCase()) {
      case 'technology': return 'category-tech bg-blue-600';
      case 'business': return 'category-business bg-green-600';
      case 'health': return 'category-health bg-purple-600';
      case 'entertainment': return 'category-entertainment bg-pink-600';
      case 'sports': return 'category-sports bg-orange-600';
      case 'politics': return 'category-politics bg-red-600';
      case 'world news': return 'category-world bg-sky-600';
      case 'us-news': return 'category-us bg-red-600';
      case 'india-news': return 'category-india bg-amber-600';
      case 'latest-news': return 'category-latest bg-blue-700';
      default: return 'bg-blue-600';
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-lg hover-scale" role="article">
      <Link to={`/article/${article.id}`} className="block" aria-label={`Read featured article: ${article.title}`}>
        {/* Image with gradient overlay */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            width="1200"
            height="675"
            fetchPriority="high"
            loading="eager"
            srcSet={`${article.image_url} 1200w,
                     ${article.image_url.replace(/(\?.*)?$/, '?w=800')} 800w, 
                     ${article.image_url.replace(/(\?.*)?$/, '?w=400')} 400w`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        </div>
        
        {/* Content positioned over the image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
          <span className={`inline-block rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ${getCategoryClass()}`}>
            {article.category}
          </span>
          <h2 className="mt-2 font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white group-hover:text-blue-200 transition-colors duration-300">
            {article.title}
          </h2>
          <p className="mt-2 hidden md:block text-sm text-gray-200 group-hover:text-white transition-colors duration-300">{article.excerpt}</p>
          <div className="mt-3 flex items-center gap-4">
            <time dateTime={article.date} className="flex items-center text-gray-300 text-xs">
              <Clock className="mr-1 h-3 w-3" aria-hidden="true" />
              <span>{article.date}</span>
            </time>
            <div className="flex items-center text-gray-300 text-xs">
              <BookOpen className="mr-1 h-3 w-3" aria-hidden="true" />
              <span>4 min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default FeaturedArticle;
