
import { supabase } from '@/integrations/supabase/client';

export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  created_at?: string;
}

export const fetchLatestArticles = async (limit = 50): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching latest articles:', error);
      return [];
    }
    
    return data.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category,
      date: article.date,
      author: article.author,
      imageUrl: article.image_url,
      created_at: article.created_at
    }));
  } catch (error) {
    console.error('Error in fetchLatestArticles:', error);
    return [];
  }
};

export const generateRssFeed = async (): Promise<string> => {
  const articles = await fetchLatestArticles(50);
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://timesroman.in';
  
  const rssItems = articles.map(article => {
    const articleUrl = `${baseUrl}/article/${article.id}`;
    const pubDate = article.created_at 
      ? new Date(article.created_at).toUTCString() 
      : new Date().toUTCString();
    
    return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid>${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <category>${article.category}</category>
      <author>${article.author}</author>
      <enclosure url="${article.imageUrl}" type="image/jpeg" />
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>Times Roman News</title>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <link>${baseUrl}</link>
    <description>Breaking News in India: Read Latest News on Sports, Business, Entertainment, World News and Political News</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>https://i.ibb.co/Z6ffRH7K/Timesromancir-logo.png</url>
      <title>Times Roman News</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return rss;
};

export const generateArticleXml = async (): Promise<string> => {
  const articles = await fetchLatestArticles(100);
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://timesroman.in';
  
  const articleItems = articles.map(article => {
    const articleUrl = `${baseUrl}/article/${article.id}`;
    const pubDate = article.created_at 
      ? new Date(article.created_at).toUTCString() 
      : new Date().toUTCString();
    
    return `
    <url>
      <loc>${articleUrl}</loc>
      <lastmod>${pubDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
      <news:news>
        <news:publication>
          <news:name>Times Roman</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${pubDate}</news:publication_date>
        <news:title><![CDATA[${article.title}]]></news:title>
        <news:keywords>${article.category}</news:keywords>
      </news:news>
    </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${articleItems}
</urlset>`;

  return sitemap;
};
