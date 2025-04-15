
// Mock article data
export const mockArticles = {
  'featured-1': {
    id: 'featured-1',
    title: 'AI Revolution in Journalism: How Machine Learning is Reshaping News Media',
    content: `
      <p>In an age where information moves at the speed of light, traditional journalism is being transformed by artificial intelligence and machine learning technologies. These innovations are not just changing how news is delivered but fundamentally altering the entire journalistic process—from gathering and analyzing data to crafting narratives and distributing content.</p>
      
      <h2>Data-Driven Reporting</h2>
      <p>Machine learning algorithms now sift through vast quantities of data, identifying patterns and connections that human journalists might miss. This technology enables reporters to uncover stories hidden within complex datasets, bringing to light trends and issues that would otherwise remain obscure.</p>
      
      <p>"We're seeing an unprecedented ability to process information," says Dr. Elena Rivera, Director of the Media Innovation Lab at Stanford University. "What once took weeks of research can now be accomplished in minutes, allowing journalists to focus on the human elements of storytelling rather than drowning in raw data."</p>
      
      <h2>Automated Content Generation</h2>
      <p>Perhaps most controversially, AI systems are increasingly capable of writing news stories themselves. Natural language processing has advanced to the point where algorithms can produce coherent articles on straightforward topics like financial reports, sports results, and weather updates.</p>
      
      <blockquote>
        "The goal isn't to replace human journalists but to augment their capabilities, freeing them to pursue more complex, nuanced reporting that requires human judgment and creativity."
      </blockquote>
      
      <h2>Personalized News Experiences</h2>
      <p>Content recommendation engines powered by machine learning are revolutionizing how news is consumed. These systems analyze reading habits, interests, and behaviors to deliver highly personalized news feeds. While this enhances user engagement, it also raises concerns about filter bubbles and information silos.</p>
      
      <p>As these technologies continue to evolve, the journalism industry faces both exciting opportunities and profound challenges. The most successful news organizations will be those that thoughtfully integrate AI tools while maintaining their commitment to journalistic principles and human expertise.</p>
      
      <h3>Looking Ahead</h3>
      <p>The future of AI in journalism will likely involve even more sophisticated tools for fact-checking, multi-language translation, and multimodal content creation combining text, audio, and video. As these technologies mature, the boundary between human and machine-generated content may become increasingly blurred, requiring new frameworks for transparency and attribution.</p>
      
      <p>What remains clear is that artificial intelligence is not just another tool in the journalist's kit—it represents a fundamental shift in how information is discovered, processed, and shared with the world.</p>
    `,
    category: 'Technology',
    date: 'April 14, 2025',
    author: 'Sarah Chen',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
    readTime: '5 min',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    authorBio: 'Technology reporter specializing in AI and machine learning trends',
    views: 1250,
    likes: 78,
  },
  'pol-1': {
    id: 'pol-1',
    title: 'Global Summit Addresses Climate Policy Reforms',
    content: `<p>World leaders have convened this week in Geneva for the annual Climate Action Summit, where ambitious new targets for carbon emissions reduction by 2030 were the central focus of discussions.</p>
    
    <p>The three-day conference brought together representatives from 195 countries, along with climate scientists, industry leaders, and environmental activists, all united in addressing what many described as "the defining crisis of our generation."</p>
    
    <h2>New Emissions Targets</h2>
    <p>In what many observers are calling a watershed moment, the summit produced a landmark agreement committing major economies to reduce carbon emissions by 65% compared to 2010 levels by the end of this decade—a significant increase from previous commitments.</p>
    
    <p>"This represents a fundamental shift in global climate ambition," said UN Secretary-General Maya Patel. "For the first time, we're seeing targets that actually align with what the science demands."</p>
    
    <blockquote>
      "We no longer have the luxury of incremental action. The climate crisis demands transformation at unprecedented speed and scale."
    </blockquote>
    
    <h2>Financial Mechanisms</h2>
    <p>A major breakthrough came in the form of a new $500 billion climate finance facility designed to help developing nations transition to renewable energy infrastructure while adapting to already unavoidable climate impacts. This fund will be capitalized primarily by G20 nations, with innovative financing mechanisms including a global carbon pricing framework.</p>
    
    <h2>Industry Commitments</h2>
    <p>The summit also saw unprecedented participation from the private sector, with over 300 multinational corporations signing onto the "Net Zero Accelerator" initiative. This program establishes science-based targets and independent verification mechanisms to ensure corporate climate commitments translate to meaningful action.</p>
    
    <p>While the agreements reached this week represent significant progress, implementation remains the critical challenge. Previous climate accords have often fallen short during the execution phase, a pattern that negotiators have sought to avoid by incorporating robust monitoring mechanisms and binding enforcement provisions.</p>
    
    <p>As delegates return to their respective countries, the real work begins—translating diplomatic achievements into tangible policies that will reshape energy systems, transportation networks, and industrial processes worldwide.</p>`,
    category: 'Politics',
    date: 'April 14, 2025',
    author: 'James Wilson',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
    readTime: '6 min',
    views: 950,
    likes: 53,
  },
  'bus-1': {
    id: 'bus-1',
    title: 'Tech Giants Face New Regulatory Challenges',
    content: `<p>Major technology companies are navigating increasingly complex regulatory landscapes as governments worldwide implement new digital market rules.</p>
    
    <p>The European Union's Digital Markets Act, which took full effect this quarter, has already forced significant changes to platform business models, with similar legislation advancing in countries across Asia and North America.</p>
    
    <h2>Competition Concerns</h2>
    <p>Regulators are particularly focused on ensuring fair competition in digital marketplaces, preventing self-preferencing behaviors, and ensuring third-party developers have equitable access to platform ecosystems.</p>
    
    <p>"We're seeing a global convergence toward more assertive regulatory frameworks," explains Dr. Maya Patel, Director of the Digital Economy Institute. "The era of light-touch regulation for technology platforms appears to be ending."</p>
    
    <h2>Adapting Business Models</h2>
    <p>Companies are responding by restructuring certain business operations, enhancing transparency in algorithmic systems, and expanding interoperability with competing services.</p>
    
    <blockquote>
      "The challenge for tech firms is adapting their business models while preserving innovation and growth. It's a delicate balancing act."
    </blockquote>
    
    <p>Financial markets have responded cautiously, with some technology stocks experiencing volatility as investors assess the long-term implications of these regulatory changes on revenue models and growth prospects.</p>
    
    <p>Industry analysts suggest that while short-term adjustments may be painful for some companies, the new regulatory framework could ultimately create more sustainable digital markets with increased consumer trust and reduced legal uncertainty.</p>`,
    category: 'Business',
    date: 'April 13, 2025',
    author: 'Michael Chang',
    imageUrl: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&q=80',
    readTime: '4 min',
    views: 825,
    likes: 41,
  },
};

// Mock related articles
export const mockRelatedArticles = [
  {
    id: 'related-1',
    title: 'Media Ethics in the Age of AI-Generated Content',
    excerpt: 'As artificial intelligence creates increasingly convincing content, newsrooms grapple with new ethical challenges.',
    category: 'Technology',
    date: 'April 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80',
    views: 780,
    likes: 37,
  },
  {
    id: 'related-2',
    title: 'Public Trust in Algorithmic News Selection Declining',
    excerpt: 'Recent study shows growing skepticism toward news recommendation systems despite improvements in personalization.',
    category: 'Technology',
    date: 'April 10, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    views: 630,
    likes: 29,
  },
  {
    id: 'related-3',
    title: 'Small Newsrooms Embrace AI Tools to Compete with Media Giants',
    excerpt: 'Independent publishers find success using machine learning to enhance reporting capabilities without expanding staff.',
    category: 'Business',
    date: 'April 9, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80',
    views: 540,
    likes: 25,
  },
];
