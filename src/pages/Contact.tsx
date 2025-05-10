
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Send, MapPin, Phone, Mail, AtSign, MessageSquare, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import MapComponent from '@/components/MapComponent';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you shortly.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Contact Us - Times Roman</title>
        <meta name="description" content="Get in touch with the Times Roman team for inquiries, feedback, or partnership opportunities." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">Contact Us</h1>
              <p className="text-lg text-gray-700 md:text-xl">
                We'd love to hear from you! Get in touch with our team for any inquiries or feedback.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Contact Information */}
              <div className="order-2 md:order-1">
                <h2 className="mb-8 font-serif text-3xl font-semibold">How to Reach Us</h2>
                
                <div className="mb-10 space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Our Location</h3>
                      <p className="text-gray-600">
                        Solapur<br />
                        Maharashtra, PC - 413304<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Phone</h3>
                      <p className="text-gray-600">
                        Main Office: +91 (218) 635-9265<br />
                        News Tips: +91 (218) 635-9265
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Email</h3>
                      <p className="text-gray-600">
                        General Inquiries: info@timesroman.in<br />
                        News Tips: tips@timesroman.in<br />
                        Advertising: ads@timesroman.in
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Map */}
                <div className="mt-10">
                  <h3 className="mb-4 text-xl font-medium">Find Us</h3>
                  <MapComponent 
                    address="Solapur, Maharashtra" 
                    className="h-[300px] w-full shadow-md"
                  />
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="order-1 md:order-2">
                <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
                  <h2 className="mb-6 font-serif text-2xl font-semibold">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <AtSign className="h-5 w-5" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        rows={6}
                        className="resize-none"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center text-sm text-gray-500">
                    We typically respond to messages within 1-2 business days.
                  </div>
                </div>
                
                <div className="mt-8 rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-2 text-lg font-medium text-blue-800">Press Inquiries</h3>
                  <p className="text-blue-700">
                    For press-related inquiries, please contact our media relations team at press@timesroman.com or call +91 (218) 635-9265.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
