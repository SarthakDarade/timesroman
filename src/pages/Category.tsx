
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { Button } from '@/components/ui/button';

// Mock category articles data
const mockCategoryArticles = {
  politics: [
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
    {
      id: 'pol-4',
      title: 'Trade Agreement Negotiations Enter Final Phase',
      excerpt: 'Representatives from twelve nations work to finalize terms of landmark economic partnership.',
      category: 'Politics',
      date: 'April 11, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80',
    },
    {
      id: 'pol-5',
      title: 'Constitutional Court Rules on Voting Rights Case',
      excerpt: 'Landmark decision expands access to polls through digital verification systems.',
      category: 'Politics',
      date: 'April 10, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1577824543053-3bb96b5d7347?auto=format&fit=crop&q=80',
    },
    {
      id: 'pol-6',
      title: 'UN Security Council Addresses Regional Tensions',
      excerpt: 'Emergency session convened as diplomatic efforts intensify to prevent escalation.',
      category: 'Politics',
      date: 'April 9, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1604855365934-07d654f5b1dd?auto=format&fit=crop&q=80',
    },
  ],
  technology: [
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
      id: 'featured-1',
      title: 'AI Revolution in Journalism: How Machine Learning is Reshaping News Media',
      excerpt: 'Machine learning algorithms are transforming how news is gathered, analyzed and presented to audiences worldwide.',
      category: 'Technology',
      date: 'April 14, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
    },
    {
      id: 'tech-3',
      title: 'Machine Learning Model Predicts Protein Structures with 98% Accuracy',
      excerpt: 'Breakthrough algorithm could revolutionize drug discovery and disease treatment approaches.',
      category: 'Technology',
      date: 'April 12, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
    },
    {
      id: 'tech-4',
      title: 'Neuromorphic Computing Chip Mimics Human Brain Function',
      excerpt: 'New processor architecture promises dramatic efficiency gains for AI applications.',
      category: 'Technology',
      date: 'April 11, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1561883088-039e53143d73?auto=format&fit=crop&q=80',
    },
    {
      id: 'tech-5',
      title: 'Blockchain Protocol Achieves Carbon-Negative Status',
      excerpt: 'Innovative consensus mechanism reduces energy consumption while funding reforestation projects.',
      category: 'Technology',
      date: 'April 10, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80',
    },
  ],
  business: [
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
    {
      id: 'bus-4',
      title: 'Retail Giants Embrace Hybrid Shopping Experience',
      excerpt: 'Major brands integrate digital technologies into physical stores to create seamless customer journeys.',
      category: 'Business',
      date: 'April 11, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80',
    },
    {
      id: 'bus-5',
      title: 'Labor Market Shifts as Remote Work Becomes Standard',
      excerpt: 'Companies redesign compensation packages and work policies to attract global talent.',
      category: 'Business',
      date: 'April 10, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80',
    },
  ],
  science: [
    {
      id: 'sci-1',
      title: 'Ocean Cleanup Project Removes 50 Tons of Plastic in Single Month',
      excerpt: 'Innovative collection system exceeds expectations, marking major progress in marine conservation efforts.',
      category: 'Science',
      date: 'April 14, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&q=80',
    },
    {
      id: 'sci-2',
      title: 'Renewable Energy Now Cheapest Form of Electricity in 90% of Global Markets',
      excerpt: 'Solar and wind power costs continue to fall, accelerating transition away from fossil fuels.',
      category: 'Science',
      date: 'April 13, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1587129902861-cc708bc2c56b?auto=format&fit=crop&q=80',
    },
    {
      id: 'sci-3',
      title: 'New Species of Deep-Sea Organisms Discovered',
      excerpt: 'Expedition to hydrothermal vents reveals unprecedented biodiversity and evolutionary adaptations.',
      category: 'Science',
      date: 'April 12, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80',
    },
    {
      id: 'sci-4',
      title: 'Cosmic Rays Provide New Insights into Dark Matter',
      excerpt: 'High-altitude observatory detects unusual particle patterns that could explain gravitational anomalies.',
      category: 'Science',
      date: 'April 11, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1537420327992-d6e192287183?auto=format&fit=crop&q=80',
    },
  ],
  health: [
    {
      id: 'health-1',
      title: 'Revolutionary Cancer Treatment Shows Promise in Clinical Trials',
      excerpt: 'New immunotherapy approach demonstrates 80% effectiveness against previously resistant cancer types.',
      category: 'Health',
      date: 'April 14, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80',
    },
    {
      id: 'health-2',
      title: 'Mental Health Platform Combines AI Therapy with Human Support',
      excerpt: 'Hybrid approach to treatment shows significant improvement in accessibility and patient outcomes.',
      category: 'Health',
      date: 'April 13, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    },
    {
      id: 'health-3',
      title: 'Global Initiative Tackles Healthcare Inequality',
      excerpt: 'Coalition launches ambitious program to ensure medical technology reaches underserved communities.',
      category: 'Health',
      date: 'April 12, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1631815587646-b84a323b8821?auto=format&fit=crop&q=80',
    },
  ],
  entertainment: [
    {
      id: 'ent-1',
      title: 'Virtual Reality Festival Draws Record Online Attendance',
      excerpt: 'Groundbreaking digital event showcases next generation of immersive entertainment and social interaction.',
      category: 'Entertainment',
      date: 'April 13, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80',
    },
    {
      id: 'ent-2',
      title: 'AI-Generated Film Wins International Award',
      excerpt: 'Short film created using generative algorithms receives critical acclaim for storytelling innovation.',
      category: 'Entertainment',
      date: 'April 12, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?auto=format&fit=crop&q=80',
    },
    {
      id: 'ent-3',
      title: 'Interactive Narrative Series Lets Viewers Shape Story Evolution',
      excerpt: 'New streaming format combines collective decision-making with dynamic plot generation.',
      category: 'Entertainment',
      date: 'April 11, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80',
    },
  ],
};

const categoryTitles: Record<string, string> = {
  politics: "Politics",
  technology: "Technology",
  business: "Business",
  science: "Science",
  health: "Health",
  entertainment: "Entertainment",
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const normalizedCategoryId = categoryId?.toLowerCase() || '';
  const articles = normalizedCategoryId 
    ? mockCategoryArticles[normalizedCategoryId as keyof typeof mockCategoryArticles] || []
    : [];
  
  const categoryTitle = categoryId ? categoryTitles[normalizedCategoryId] || categoryId : '';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <h1 className="font-serif text-3xl font-bold md:text-4xl">{categoryTitle}</h1>
            <p className="mt-2 text-gray-600">Latest news and updates in {categoryTitle.toLowerCase()}</p>
          </header>
          
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-bold">No articles found</h2>
              <p className="mt-2 text-gray-600">There are no articles in this category yet.</p>
            </div>
          )}
          
          {articles.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More Articles</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
