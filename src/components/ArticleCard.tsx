import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Eye } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime?: string;
  views?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  excerpt = '',
  category,
  date,
  imageUrl,
  readTime = '3 min',
  views,
  className = '',
  style,
}) => {
  // Map category to color class
  const getCategoryClass = () => {
    switch (category.toLowerCase()) {
      case 'technology': return 'bg-blue-600';
      case 'business': return 'bg-green-600';
      case 'health': return 'bg-purple-600';
      case 'entertainment': return 'bg-pink-600';
      case 'sports': return 'bg-orange-600';
      case 'politics': return 'bg-red-600';
      case 'world news': return 'bg-sky-600';
      case 'us-news': return 'bg-red-600';
      case 'india-news': return 'bg-amber-600';
      case 'sports-news': return 'bg-green-6000';
      case 'cricket': return 'bg-green-600';
      case 'government-news': return 'bg-slate-600';
      case 'press-releases': return 'bg-gray-600';
      case 'latest-news': return 'bg-blue-700';
      case 'technology-news': return 'bg-indigo-700';
      case 'business-news': return 'bg-teal-700';
      case 'entertainment-news': return 'bg-rose-600';
      case 'lifestyle': return 'bg-purple-400';
      case 'crime': return 'bg-red-700';                 
      case 'history': return 'bg-yellow-800';               
      case 'culture': return 'bg-purple-600';                
      case 'social': return 'bg-blue-400';             
      case 'education': return 'bg-indigo-600';        
      case 'travel': return 'bg-teal-500';                  
      case 'space-expo': return 'bg-gray-800';       
      case 'weather': return 'bg-sky-500';                   
      case 'gaming': return 'bg-pink-600';                   
      case 'mumbai': return 'bg-rose-600';                   
      case 'delhi': return 'bg-amber-700';                   
      case 'bangalore': return 'bg-green-700';              
      case 'hyderabad': return 'bg-fuchsia-600';             
      case 'kolkata': return 'bg-lime-700';                 
      case 'chennai': return 'bg-cyan-700';                  
      case 'tv-news': return 'bg-blue-700';                  
      case 'auto': return 'bg-gray-700';                     
      case 'war': return 'bg-red-900';                  
      case 'events': return 'bg-violet-500';                 
      default: return 'bg-blue-600';
    }
  };

  // Random view count for display if not provided
  const displayViews = views !== undefined ? views : Math.floor(Math.random() * 500) + 100;
  
  // Generate low-quality image placeholder
  const blurHash = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDIiPjwvc3ZnPg==';

  return (
    <article 
      className={`group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 article-card-animate h-full flex flex-col ${className}`} 
      style={style}
    >
      <Link to={`/article/${id}`} className="block h-full flex flex-col" aria-label={`Read article: ${title}`}>
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width="400"
            height="250"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80';
            }}
            srcSet={`${imageUrl} 800w, 
                    ${imageUrl.replace(/(\?.*)?$/, '?w=400')} 400w`}
            sizes="(max-width: 768px) 100vw, 400px"
            style={{
              backgroundColor: '#e5e7eb', // Gray placeholder until image loads
              backgroundImage: `url(${blurHash})`,
              backgroundSize: 'cover'
            }}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2 flex items-center justify-between flex-wrap gap-2">
            <span className={`inline-block text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full text-white ${getCategoryClass()}`}>
              {category}
            </span>
            <time className="flex items-center text-gray-600 text-xs" dateTime={date}>
              <Clock className="mr-1 h-3 w-3" aria-hidden="true" />
              <span>{date}</span>
            </time>
          </div>
          <h3 className="mb-2 font-serif text-lg font-semibold leading-snug tracking-tight text-gray-900 group-hover:text-blue-600 text-animate">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600 flex-grow">{excerpt}</p>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center">
              <BookOpen className="mr-1 h-3 w-3" aria-hidden="true" />
              <span>{readTime} read</span>
            </div>
            <div className="flex items-center">
              <Eye className="mr-1 h-3 w-3" aria-hidden="true" />
              <span>{displayViews} views</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
