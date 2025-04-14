
import React, { useEffect, useState } from 'react';
import { Clock, Share2, MessageSquare, Bookmark, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Effect to handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: 'Check out this article on Times Roman',
        url: window.location.href,
      })
      .catch((error) => {
        toast.error('Error sharing article');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Function to bookmark article
  const handleBookmark = () => {
    toast.success('Article bookmarked!');
  };

  // Function to like article
  const handleLike = () => {
    toast.success('You liked this article!');
  };

  // Get category class
  const getCategoryClass = () => {
    switch (category.toLowerCase()) {
      case 'technology': return 'category-tech';
      case 'business': return 'category-business';
      case 'health': return 'category-health';
      case 'entertainment': return 'category-entertainment';
      case 'sports': return 'category-sports';
      default: return 'bg-blue-600';
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <article className="container mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-in-out]">
        {/* Article Header */}
        <header className="mx-auto max-w-3xl">
          <Link 
            to={`/category/${category.toLowerCase()}`}
            className={`inline-block text-sm font-medium uppercase tracking-wider px-3 py-1 rounded-full text-white mb-2 ${getCategoryClass()}`}
          >
            {category}
          </Link>
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl animate-[fadeIn_0.7s_ease-in-out]">
            {title}
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center text-sm text-gray-600 animate-[fadeIn_0.9s_ease-in-out]">
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
          
          <div className="mt-4 flex space-x-2 animate-[fadeIn_1.1s_ease-in-out]">
            <button 
              onClick={handleShare}
              className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </button>
            <button 
              onClick={handleBookmark}
              className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </button>
            <button 
              onClick={handleLike}
              className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="my-8 animate-[fadeIn_1.3s_ease-in-out]">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg shadow-lg">
            <img src={imageUrl} alt={title} className="w-full" />
          </div>
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-3xl">
          <div 
            className="article-content prose prose-lg max-w-none reading-area animate-[fadeIn_1.5s_ease-in-out]" 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          
          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2 animate-[fadeIn_1.7s_ease-in-out]">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 hover:bg-gray-200 transition-all duration-200 hover:scale-105">
              #AI
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 hover:bg-gray-200 transition-all duration-200 hover:scale-105">
              #News
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 hover:bg-gray-200 transition-all duration-200 hover:scale-105">
              #{category}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default ArticlePage;
