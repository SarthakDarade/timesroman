
import React from 'react';
import { Helmet } from 'react-helmet';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you shortly.");
    // In a real app, this would send the form data to a backend
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Contact Us - Times Roman</title>
        <meta name="description" content="Get in touch with the Times Roman team for inquiries, feedback, or partnership opportunities." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mb-8 font-serif text-4xl font-bold md:text-5xl">Contact Us</h1>
          
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="prose prose-lg max-w-none">
                <p>
                  We value your feedback and inquiries. Whether you have a question, suggestion, or business opportunity, our team is ready to assist you.
                </p>
                
                <p>
                  Please fill out the form and we'll get back to you as soon as possible, typically within 1-2 business days.
                </p>
              </div>
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-medium">Our Location</h3>
                    <p className="text-gray-600">
                      123 News Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="text-gray-600">
                      Main Office: +1 (555) 123-4567<br />
                      News Tips: +1 (555) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600">
                      General Inquiries: info@timesroman.com<br />
                      News Tips: tips@timesroman.com<br />
                      Advertising: ads@timesroman.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
