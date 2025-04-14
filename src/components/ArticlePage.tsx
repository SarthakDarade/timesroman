
import React from 'react';
import { Clock, Share2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticlePageProps {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  readTime: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  id,
  title,
  content,
  category,
  date,
  author,
  imageUrl,
  readTime,
}) => {
  return (
    <article className="container mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mx-auto max-w-3xl">
        <Link 
          to={`/category/${category.toLowerCase()}`}
          className="inline-block text-sm font-medium uppercase tracking-wider text-blue-600 mb-2"
        >
          {category}
        </Link>
        <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
          {title}
        </h1>
        
        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-600">
          <div className="mr-4 flex items-center">
            <span className="font-medium">By {author}</span>
          </div>
          <div className="mr-4 flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{readTime} read</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </button>
          <button className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
            <MessageSquare className="mr-1 h-4 w-4" />
            Comment
          </button>
        </div>
      </header>

      {/* Featured Image */}
      <div className="my-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
          <img src={imageUrl} alt={title} className="w-full" />
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-3xl">
        <div 
          className="article-content prose prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        
        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
            #AI
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
            #News
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
            #{category}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
