
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 mr-2" />
          <h2 className="text-2xl font-bold">Stay Updated</h2>
        </div>
        
        <p className="text-blue-100 mb-6">
          Get the latest news and updates delivered straight to your inbox. 
          Never miss important stories from Times Roman.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                Subscribing...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </div>
            )}
          </button>
        </form>
        
        <p className="text-xs text-blue-100 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
