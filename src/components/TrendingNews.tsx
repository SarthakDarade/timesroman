
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, TrendingUp } from 'lucide-react';

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

interface TrendingNewsProps {
  articles: Article[];
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-red-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <article key={article.id} className="group">
            <Link to={`/article/${article.id}`} className="block">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                </div>
              </div>
              
              <div className="mt-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <div className="flex items-center mt-2 text-xs text-gray-600">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{article.date}</span>
                  <Eye className="h-3 w-3 ml-3 mr-1" />
                  <span>{article.views} views</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TrendingNews;
