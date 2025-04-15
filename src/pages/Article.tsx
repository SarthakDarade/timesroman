
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticlePage from '../components/ArticlePage';
import ArticleCard from '../components/ArticleCard';
import ReadingProgressBar from '../components/ReadingProgressBar';
import { mockArticles, mockRelatedArticles } from '../utils/mockData';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const article = id && mockArticles[id as keyof typeof mockArticles];
  
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgressBar />
      <Navbar />
      
      <main className="flex-1">
        <ArticlePage {...article} />
        
        {/* Related Articles Section */}
        <section className="bg-gray-50 py-12 animate-[fadeIn_1s_ease-in-out]">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 font-serif text-2xl font-bold">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {mockRelatedArticles.map((article) => (
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
