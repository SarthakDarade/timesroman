
export const generateArticleKeywords = (title: string, content: string, category: string): string[] => {
  const keywords: string[] = [];
  
  // Add category-based keywords
  const categoryKeywords: Record<string, string[]> = {
    'politics': ['indian politics', 'political news', 'government', 'parliament', 'election'],
    'technology': ['tech news', 'innovation', 'startup', 'digital india', 'technology trends'],
    'business': ['business news', 'economy', 'finance', 'market', 'corporate'],
    'entertainment': ['bollywood', 'celebrity', 'movies', 'entertainment news', 'film industry'],
    'sports': ['sports news', 'cricket', 'football', 'olympics', 'indian sports'],
    'health': ['health news', 'medical', 'healthcare', 'wellness', 'medicine'],
    'world news': ['international news', 'global news', 'world affairs', 'foreign policy'],
    'india news': ['india news', 'indian news', 'domestic news', 'national news'],
    'us news': ['us news', 'america', 'united states', 'american news'],
    'latest news': ['breaking news', 'latest updates', 'current affairs', 'news today']
  };
  
  const catKey = category.toLowerCase();
  if (categoryKeywords[catKey]) {
    keywords.push(...categoryKeywords[catKey]);
  }
  
  // Extract keywords from title (remove common words)
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
  const titleWords = title.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 2 && !commonWords.includes(word));
  
  keywords.push(...titleWords.slice(0, 5));
  
  return [...new Set(keywords)]; // Remove duplicates
};

export const generateBreadcrumbs = (pathname: string, title?: string) => {
  const breadcrumbs = [{ name: 'Home', url: '/' }];
  
  const pathSegments = pathname.split('/').filter(Boolean);
  
  pathSegments.forEach((segment, index) => {
    const url = '/' + pathSegments.slice(0, index + 1).join('/');
    
    if (segment === 'category') {
      breadcrumbs.push({ name: 'Categories', url: '/category' });
    } else if (segment === 'article') {
      breadcrumbs.push({ name: 'Articles', url: '/articles' });
    } else if (segment === 'search') {
      breadcrumbs.push({ name: 'Search', url: '/search' });
    } else if (index === pathSegments.length - 1 && title) {
      // Last segment with title
      breadcrumbs.push({ name: title, url });
    } else {
      // Convert slug to readable name
      const name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      breadcrumbs.push({ name, url });
    }
  });
  
  return breadcrumbs;
};

export const optimizeImageUrl = (url: string, width?: number, height?: number): string => {
  if (!url) return url;
  
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('q', '80');
    
    return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
  }
  
  return url;
};

export const getReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

export const generateMetaDescription = (excerpt: string, content: string, title: string): string => {
  let description = excerpt || '';
  
  // If no excerpt, extract from content
  if (!description && content) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    description = tempDiv.textContent || tempDiv.innerText || '';
  }
  
  // Ensure minimum length for SEO
  if (description.length < 120) {
    description = `${description} Read the latest ${title.toLowerCase()} updates on Times Roman - India's trusted news source.`.substring(0, 160);
  }
  
  // Ensure maximum length
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
};
