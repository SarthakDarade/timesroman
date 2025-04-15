
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticlePage from '../components/ArticlePage';
import ArticleCard from '../components/ArticleCard';
import ReadingProgressBar from '../components/ReadingProgressBar';
import { mockArticles, mockRelatedArticles } from '../utils/mockData';
import AuthorAvatar from '../components/AuthorAvatar';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find article in both main and related articles
  const allArticles = { ...mockArticles };
  mockRelatedArticles.forEach(article => {
    allArticles[article.id] = article;
  });
  
  const article = id ? allArticles[id] : null;
  
  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo(0, 0);
    
    // Set page title
    if (article) {
      document.title = `${article.title} | Times Roman`;
    }
    
    return () => {
      document.title = 'Times Roman'; // Reset title on unmount
    };
  }, [article]);

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="text-2xl font-bold">Article not found</h1>
            <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Back to Homepage
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Standardize article format to ensure all required fields exist
  const standardizedArticle = {
    id: article.id,
    title: article.title,
    content: 'content' in article ? article.content : ('excerpt' in article ? `<p>${article.excerpt}</p>` : ''),
    category: article.category,
    date: article.date,
    author: 'author' in article ? article.author : 'Editorial Team',
    authorImage: 'authorImage' in article ? article.authorImage : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    authorBio: 'authorBio' in article ? article.authorBio : 'Times Roman Editorial Team',
    imageUrl: article.imageUrl,
    readTime: 'readTime' in article ? article.readTime : '3 min',
    views: 'views' in article ? article.views : Math.floor(Math.random() * 1000) + 500,
    likes: 'likes' in article ? article.likes : Math.floor(Math.random() * 100),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgressBar />
      <Navbar />
      
      <main className="flex-1">
        <ArticlePage {...standardizedArticle} />
        
        {/* Related Articles Section */}
        <section className="bg-gray-50 py-12 animate-[fadeIn_1s_ease-in-out]">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 font-serif text-2xl font-bold">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {mockRelatedArticles
                .filter(relatedArticle => relatedArticle.id !== id)
                .slice(0, 3)
                .map((article) => (
                  <ArticleCard key={article.id} {...article} className="transform transition-all hover:translate-y-[-8px]" />
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
