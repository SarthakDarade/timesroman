
import express, { Request, Response } from 'express';
import { generateRssFeed, generateArticleXml } from './rss';

const router = express.Router();

// RSS Feed endpoint
router.get('/rss.xml', async (req: Request, res: Response) => {
  try {
    const rssFeed = await generateRssFeed();
    res.setHeader('Content-Type', 'application/rss+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(rssFeed);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).send('Error generating RSS feed');
  }
});

// Google News sitemap endpoint
router.get('/article.xml', async (req: Request, res: Response) => {
  try {
    const articleXml = await generateArticleXml();
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(articleXml);
  } catch (error) {
    console.error('Error generating article sitemap:', error);
    res.status(500).send('Error generating article sitemap');
  }
});

export default router;
