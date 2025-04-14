
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
}

interface CategorySectionProps {
  title: string;
  categoryPath: string;
  articles: Article[];
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  categoryPath,
  articles,
}) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold">{title}</h2>
          <Link to={categoryPath}>
            <Button variant="ghost" size="sm" className="text-sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
