
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticlePage from '../components/ArticlePage';
import ArticleCard from '../components/ArticleCard';
import ReadingProgressBar from '../components/ReadingProgressBar';
import SEOHead from '../components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { generateBreadcrumbs, generateArticleKeywords, generateMetaDescription, optimizeImageUrl } from '@/utils/seoHelpers';

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
  author_image?: string;
  author_bio?: string;
  read_time?: string;
  likes?: number;
}

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const hasIncrementedView = useRef(false);

  // Construct the current URL safely
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        console.log('Fetching article with ID:', id);
        
        // Fetch the main article
        const { data: articleData, error: articleError } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single();

        if (articleError) {
          console.error('Error fetching article:', articleError);
          setLoading(false);
          return;
        }

        setArticle(articleData);

        // Increment view count only once per session
        if (articleData && !hasIncrementedView.current) {
          hasIncrementedView.current = true;
          const { error: updateError } = await supabase
            .from('articles')
            .update({ views: (articleData.views || 0) + 1 })
            .eq('id', id);

          if (updateError) {
            console.error('Error updating view count:', updateError);
          }
        }

        // Fetch related articles from the same category
        if (articleData?.category) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('articles')
            .select('*')
            .eq('category', articleData.category)
            .neq('id', id)
            .order('created_at', { ascending: false })
            .limit(4);

          if (relatedError) {
            console.error('Error fetching related articles:', relatedError);
          } else {
            setRelatedArticles(relatedData || []);
          }
        }
      } catch (error) {
        console.error('Error in fetchArticle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEOHead 
          title="Loading Article | Times Roman" 
          description="Loading the latest news article from Times Roman."
          noIndex={true}
        />
        <Navbar />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEOHead 
          title="Article Not Found | Times Roman" 
          description="The article you're looking for doesn't exist or has been removed from Times Roman news."
          noIndex={true}
        />
        <Navbar />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="text-2xl font-bold">Article not found</h1>
            <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              aria-label="Back to homepage"
            >
              Back to Homepage
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Enhanced SEO data for article page
  const articleDescription = generateMetaDescription(
    article.excerpt || '', 
    article.content || '', 
    article.title
  );
  
  const articleKeywords = generateArticleKeywords(
    article.title, 
    article.content || '', 
    article.category
  );
  
  const articleBreadcrumbs = generateBreadcrumbs(location.pathname, article.title);
  
  const optimizedImageUrl = optimizeImageUrl(article.image_url, 1200, 630);
  
  // Strip HTML tags from content for SEO
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  
  const articleContent = stripHtml(article.content || '');

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead 
        title={`${article.title} | Times Roman`}
        description={articleDescription}
        ogImage={optimizedImageUrl}
        ogType="article"
        canonical={currentUrl}
        isArticle={true}
        articleMeta={{
          publishedTime: article.created_at,
          modifiedTime: article.updated_at,
          author: article.author,
          category: article.category,
          content: articleContent,
          tags: articleKeywords
        }}
        publisherInfo={{
          name: 'Times Roman',
          logo: 'https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png',
          url: 'https://timesroman.in'
        }}
        breadcrumbs={articleBreadcrumbs}
        keywords={articleKeywords}
      />
      <ReadingProgressBar />
      <Navbar />
      
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-3">
            <ArticlePage 
              id={article.id}
              title={article.title}
              content={article.content || ''}
              category={article.category}
              date={article.date}
              author={article.author}
              authorImage={article.author_image}
              authorBio={article.author_bio}
              imageUrl={article.image_url}
              readTime={article.read_time || '3 min'}
              views={article.views}
              likes={article.likes || 0}
            />
          </div>
          
          {/* Related Articles Sidebar */}
          {relatedArticles.length > 0 && (
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-xl font-bold mb-4">Related Articles</h2>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <ArticleCard
                      key={relatedArticle.id}
                      id={relatedArticle.id}
                      title={relatedArticle.title}
                      excerpt={relatedArticle.excerpt}
                      category={relatedArticle.category}
                      date={relatedArticle.date}
                      imageUrl={relatedArticle.image_url}
                      views={relatedArticle.views}
                      className="compact"
                    />
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
