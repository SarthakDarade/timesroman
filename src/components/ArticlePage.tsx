
import React, { useEffect, useState } from 'react';
import { Clock, Share2, MessageSquare, Bookmark, ThumbsUp, BookOpen, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface ArticlePageProps {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  authorImage?: string;
  authorBio?: string;
  imageUrl: string;
  readTime: string;
  views?: number;
  likes?: number;
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  id,
  title,
  content,
  category,
  date,
  author,
  authorImage,
  authorBio,
  imageUrl,
  readTime,
  views: initialViews = Math.floor(Math.random() * 1000) + 500,
  likes: initialLikes = Math.floor(Math.random() * 100),
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(initialViews);
  const { user } = useAuth();
  
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

  // Effect to increment view count only once per session
  useEffect(() => {
    const viewedArticles = JSON.parse(localStorage.getItem('viewedArticles') || '{}');
    
    if (!viewedArticles[id]) {
      // Increment view counter
      setViewCount(prev => prev + 1);
      
      // Mark this article as viewed
      viewedArticles[id] = true;
      localStorage.setItem('viewedArticles', JSON.stringify(viewedArticles));
    }
    
    // Check if article is bookmarked
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '{}');
    setIsBookmarked(!!bookmarkedArticles[id]);
    
    // Check if article is liked
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '{}');
    setIsLiked(!!likedArticles[id]);
  }, [id]);

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
    if (!user) {
      toast.error('Please sign in to bookmark articles');
      return;
    }
    
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '{}');
    
    if (isBookmarked) {
      delete bookmarkedArticles[id];
    } else {
      bookmarkedArticles[id] = true;
    }
    
    localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Bookmark removed!' : 'Article bookmarked!');
  };

  // Function to like article
  const handleLike = () => {
    if (!user) {
      toast.error('Please sign in to like articles');
      return;
    }
    
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '{}');
    
    if (isLiked) {
      delete likedArticles[id];
      setLikeCount(likeCount - 1);
    } else {
      likedArticles[id] = true;
      setLikeCount(likeCount + 1);
    }
    
    localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Like removed' : 'Thanks for your feedback!');
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
  
  // Calculate estimated read time range
  const getReadTimeRange = () => {
    const baseTime = parseInt(readTime.split(' ')[0]);
    return `${baseTime}-${baseTime + 2} min`;
  };

  return (
    <>
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
              <BookOpen className="mr-1 h-4 w-4" />
              <span>{getReadTimeRange()} read</span>
            </div>
            <div className="ml-4 flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              <span>{viewCount} views</span>
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
              className={`flex items-center rounded-full ${isBookmarked ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-200 hover:scale-105`}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-blue-500' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
            <button 
              onClick={handleLike}
              className={`flex items-center rounded-full ${isLiked ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'} px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-200 hover:scale-105`}
            >
              <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
              <span className="mr-1">{isLiked ? 'Liked' : 'Like'}</span>
              <span className="rounded-full bg-gray-200 px-2 py-px text-xs">{likeCount}</span>
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
          
          {/* Author Bio */}
          {authorBio && (
            <div className="mt-12 flex items-start space-x-4 rounded-lg bg-gray-50 p-6 animate-[fadeIn_1.6s_ease-in-out]">
              {authorImage && (
                <Avatar className="h-12 w-12 border-2 border-white">
                  <img src={authorImage} alt={author} className="rounded-full" />
                </Avatar>
              )}
              <div>
                <h3 className="text-lg font-semibold">{author}</h3>
                <p className="text-sm text-gray-600">{authorBio}</p>
              </div>
            </div>
          )}
          
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
