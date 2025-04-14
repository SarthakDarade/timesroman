
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface FeaturedArticleProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  id,
  title,
  excerpt,
  category,
  date,
  imageUrl,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Link to={`/article/${id}`} className="block">
        {/* Image with gradient overlay */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        {/* Content positioned over the image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <span className="inline-block rounded-sm bg-blue-600 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {category}
          </span>
          <h2 className="mt-2 font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white">
            {title}
          </h2>
          <p className="mt-2 hidden md:block text-sm text-gray-200">{excerpt}</p>
          <div className="mt-3 flex items-center text-gray-300 text-xs">
            <Clock className="mr-1 h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedArticle;
