
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturedArticle from '../components/FeaturedArticle';
import CategorySection from '../components/CategorySection';
import ArticleCard from '../components/ArticleCard';

const mockFeaturedArticle = {
  id: 'featured-1',
  title: 'AI Revolution in Journalism: How Machine Learning is Reshaping News Media',
  excerpt: 'Machine learning algorithms are transforming how news is gathered, analyzed and presented to audiences worldwide.',
  category: 'Technology',
  date: 'April 14, 2025',
  imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
};

const mockPoliticsArticles = [
  {
    id: 'pol-1',
    title: 'Global Summit Addresses Climate Policy Reforms',
    excerpt: 'World leaders convene to discuss ambitious new targets for carbon emissions reduction by 2030.',
    category: 'Politics',
    date: 'April 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1618477202872-5cfd2bede46e?auto=format&fit=crop&q=80',
  },
  {
    id: 'pol-2',
    title: 'New Legislation Aims to Reform Tech Regulation',
    excerpt: 'Bipartisan effort introduces comprehensive bill addressing data privacy and platform accountability.',
    category: 'Politics',
    date: 'April 13, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1575320854760-bfffc858c21c?auto=format&fit=crop&q=80',
  },
  {
    id: 'pol-3',
    title: 'Election Results Reshape Regional Power Balance',
    excerpt: 'Surprising outcomes in recent elections signal major policy shifts ahead for the region.',
    category: 'Politics',
    date: 'April 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80',
  },
];

const mockTechArticles = [
  {
    id: 'tech-1',
    title: 'Revolutionary Quantum Computing Breakthrough Announced',
    excerpt: 'Scientists achieve stable quantum entanglement at room temperature, bringing practical quantum computing closer to reality.',
    category: 'Technology',
    date: 'April 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
  },
  {
    id: 'tech-2',
    title: 'New AR Glasses Redefine Mixed Reality Experience',
    excerpt: 'Latest augmented reality wearable promises seamless integration of digital and physical worlds.',
    category: 'Technology',
    date: 'April 13, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&q=80',
  },
  {
    id: 'tech-3',
    title: 'Machine Learning Model Predicts Protein Structures with 98% Accuracy',
    excerpt: 'Breakthrough algorithm could revolutionize drug discovery and disease treatment approaches.',
    category: 'Technology',
    date: 'April 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
  },
];

const mockBusinessArticles = [
  {
    id: 'bus-1',
    title: 'Sustainable Startups Attract Record Venture Capital',
    excerpt: 'Green tech companies secure unprecedented funding as investors prioritize environmental impact.',
    category: 'Business',
    date: 'April 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
  },
  {
    id: 'bus-2',
    title: 'Global Markets Respond to Central Bank Digital Currency Plans',
    excerpt: 'Financial markets adjust as major economies announce timeline for CBDC implementation.',
    category: 'Business',
    date: 'April 13, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80',
  },
  {
    id: 'bus-3',
    title: 'Supply Chain Innovation Forum Highlights Automation Solutions',
    excerpt: 'Industry leaders showcase AI-powered logistics systems designed to prevent future disruptions.',
    category: 'Business',
    date: 'April 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80',
  },
];

const mockLatestArticles = [
  {
    id: 'latest-1',
    title: 'Revolutionary Cancer Treatment Shows Promise in Clinical Trials',
    excerpt: 'New immunotherapy approach demonstrates 80% effectiveness against previously resistant cancer types.',
    category: 'Health',
    date: 'April 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80',
  },
  {
    id: 'latest-2',
    title: 'Ocean Cleanup Project Removes 50 Tons of Plastic in Single Month',
    excerpt: 'Innovative collection system exceeds expectations, marking major progress in marine conservation efforts.',
    category: 'Science',
    date: 'April 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&q=80',
  },
  {
    id: 'latest-3',
    title: 'Virtual Reality Festival Draws Record Online Attendance',
    excerpt: 'Groundbreaking digital event showcases next generation of immersive entertainment and social interaction.',
    category: 'Entertainment',
    date: 'April 13, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80',
  },
  {
    id: 'latest-4',
    title: 'Renewable Energy Now Cheapest Form of Electricity in 90% of Global Markets',
    excerpt: 'Solar and wind power costs continue to fall, accelerating transition away from fossil fuels.',
    category: 'Science',
    date: 'April 13, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1587129902861-cc708bc2c56b?auto=format&fit=crop&q=80',
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Featured Article */}
        <section className="container mx-auto px-4 py-6 md:py-8">
          <FeaturedArticle {...mockFeaturedArticle} />
        </section>
        
        {/* Latest News Section */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 font-serif text-2xl font-bold">Latest News</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {mockLatestArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Category Sections */}
        <CategorySection
          title="Politics"
          categoryPath="/category/politics"
          articles={mockPoliticsArticles}
        />
        
        <div className="bg-gray-50">
          <CategorySection
            title="Technology"
            categoryPath="/category/technology"
            articles={mockTechArticles}
          />
        </div>
        
        <CategorySection
          title="Business"
          categoryPath="/category/business"
          articles={mockBusinessArticles}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
