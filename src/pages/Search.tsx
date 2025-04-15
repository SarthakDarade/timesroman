
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';

// Import mock articles from Article.tsx
import { mockArticles, mockRelatedArticles } from '../utils/mockData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    // Set page title
    document.title = `Search results for "${query}" | Times Roman`;

    // Search logic
    if (query) {
      const allArticles = [...Object.values(mockArticles), ...mockRelatedArticles];
      
      const filtered = allArticles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) || 
        (article.content && article.content.toLowerCase().includes(query.toLowerCase())) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(query.toLowerCase()))
      );
      
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="container mx-auto flex-1 px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>
        
        {query && results.length === 0 && (
          <div className="rounded-lg bg-gray-50 p-6 text-center">
            <p className="text-gray-600">No results found for "{query}"</p>
            <p className="mt-2 text-sm text-gray-500">Try different keywords or browse our categories</p>
          </div>
        )}
        
        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <ArticleCard 
                key={article.id}
                id={article.id}
                title={article.title}
                excerpt={article.excerpt || article.content?.substring(0, 120)}
                category={article.category}
                date={article.date}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
