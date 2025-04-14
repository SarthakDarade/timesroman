
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  excerpt,
  category,
  date,
  imageUrl,
  className = '',
}) => {
  return (
    <div className={`group overflow-hidden rounded-lg shadow hover:shadow-md transition-all ${className}`}>
      <Link to={`/article/${id}`} className="block">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="inline-block text-xs font-medium uppercase tracking-wider text-blue-600">
              {category}
            </span>
            <div className="flex items-center text-gray-500 text-xs">
              <Clock className="mr-1 h-3 w-3" />
              <span>{date}</span>
            </div>
          </div>
          <h3 className="mb-2 font-serif text-lg font-semibold leading-snug tracking-tight text-gray-900 group-hover:text-blue-600">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600">{excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
