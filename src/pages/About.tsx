
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>About Us - Times Roman</title>
        <meta name="description" content="Learn more about Times Roman news platform and our mission." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mb-8 font-serif text-4xl font-bold md:text-5xl">About Us</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl font-semibold">Our Story</h2>
            <p>
              Times Roman was founded in 2023 with a mission to provide unbiased, fact-based news coverage in a world increasingly divided by polarized media. We believe in the power of informed citizens to make better decisions for society when they have access to reliable information.
            </p>
            
            <p>
              Our team consists of seasoned journalists, technology experts, and media professionals who are committed to the highest standards of journalistic integrity.
            </p>
            
            <h2 className="mt-8 font-serif text-2xl font-semibold">Our Mission</h2>
            <p>
              At Times Roman, our mission is to deliver timely, accurate, and comprehensive news coverage that empowers readers to understand the world around them. We strive to:
            </p>
            
            <ul className="list-disc pl-6">
              <li>Present diverse perspectives on important issues</li>
              <li>Separate fact from opinion clearly in our reporting</li>
              <li>Hold power to account through investigative journalism</li>
              <li>Make complex topics accessible to a general audience</li>
              <li>Utilize technology to enhance the news experience</li>
            </ul>
            
            <h2 className="mt-8 font-serif text-2xl font-semibold">Our Values</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
                <h3 className="mb-2 font-serif text-xl font-medium">Accuracy</h3>
                <p>We verify information from multiple sources before publication and promptly correct any errors.</p>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
                <h3 className="mb-2 font-serif text-xl font-medium">Independence</h3>
                <p>Our reporting is free from political bias and commercial influence. We follow the facts wherever they lead.</p>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
                <h3 className="mb-2 font-serif text-xl font-medium">Innovation</h3>
                <p>We embrace technology to create engaging, informative news experiences for our readers.</p>
              </div>
            </div>
            
            <h2 className="mt-8 font-serif text-2xl font-semibold">Our Team</h2>
            <p>
              Times Roman employs journalists, editors, and media professionals from diverse backgrounds, bringing a wealth of experience and perspectives to our coverage.
            </p>
            
            <p className="mt-6">
              We're always looking for talented individuals to join our team. If you're passionate about journalism and technology, please visit our careers page.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
