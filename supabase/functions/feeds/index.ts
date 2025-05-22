
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  date: string;
  author: string;
  image_url: string;
  created_at?: string;
}

serve(async (req: Request) => {
  // Get the path from the URL
  const url = new URL(req.url);
  const path = url.pathname;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get the hostname to use in feed URLs
    const host = req.headers.get('host') || 'timesroman.in';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    if (path === '/rss.xml') {
      // Generate RSS feed
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (error) {
        throw error;
      }
      
      const articles: Article[] = data || [];
      
      // Generate RSS XML
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
          <enclosure url="${article.image_url}" type="image/jpeg" />
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

      return new Response(rss, {
        headers: {
          ...headers,
          'Content-Type': 'application/rss+xml',
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
      });
    } 
    else if (path === '/article.xml') {
      // Generate News sitemap
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
        
      if (error) {
        throw error;
      }
      
      const articles: Article[] = data || [];
      
      // Generate sitemap XML
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

      return new Response(sitemap, {
        headers: {
          ...headers,
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
      });
    }
    
    // Default 404 response for unknown paths
    return new Response('Not found', { 
      status: 404, 
      headers: { ...headers, 'Content-Type': 'text/plain' } 
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { ...headers, 'Content-Type': 'application/json' } 
    });
  }
});
