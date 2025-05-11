
import React from 'react';
import { Helmet } from 'react-helmet';
import { MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>About Us - Times Roman</title>
        <meta name="description" content="Learn more about Times Roman news platform, our mission, values and the team behind the platform." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">About Times Roman</h1>
              <p className="text-lg text-gray-700 md:text-xl">
                Delivering timely, accurate, and comprehensive news coverage since 2025.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-serif text-3xl font-semibold">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  Times Roman was founded in 2025 with a mission to provide unbiased, fact-based news coverage in a world increasingly divided by polarized media. We believe in the power of informed citizens to make better decisions for society when they have access to reliable information.
                </p>
                
                <p>
                  Our team consists of seasoned journalists, technology experts, and media professionals who are committed to the highest standards of journalistic integrity. We've grown from a small digital publication to a trusted news source read by millions around the world.
                </p>
                
                <div className="my-8 overflow-hidden rounded-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="Newsroom" 
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-serif text-3xl font-semibold">Our Mission & Values</h2>
              
              <div className="mb-12 prose prose-lg max-w-none">
                <p>
                  At Times Roman, our mission is to deliver timely, accurate, and comprehensive news coverage that empowers readers to understand the world around them. We strive to:
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 font-serif text-xl font-medium text-blue-600">Truth</h3>
                  <p className="text-gray-600">We present diverse perspectives on important issues and separate fact from opinion clearly in our reporting.</p>
                </div>
                
                <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 font-serif text-xl font-medium text-blue-600">Accountability</h3>
                  <p className="text-gray-600">We hold power to account through investigative journalism that illuminates truth and demands transparency.</p>
                </div>
                
                <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 font-serif text-xl font-medium text-blue-600">Accessibility</h3>
                  <p className="text-gray-600">We make complex topics accessible to a general audience without sacrificing depth or accuracy.</p>
                </div>
                
                <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 font-serif text-xl font-medium text-blue-600">Innovation</h3>
                  <p className="text-gray-600">We utilize technology to enhance the news experience and reach audiences where they are.</p>
                </div>
                
                <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 font-serif text-xl font-medium text-blue-600">Independence</h3>
                  <p className="text-gray-600">Our reporting is free from political bias and commercial influence. We follow the facts wherever they lead.</p>
                </div>
                
                <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 font-serif text-xl font-medium text-blue-600">Accuracy</h3>
                  <p className="text-gray-600">We verify information from multiple sources before publication and promptly correct any errors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Founders Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-serif text-3xl font-semibold">Our Founders</h2>
              
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="overflow-hidden">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img 
                      src="https://i.ibb.co/sdD46GSt/IMG-20240708-WA0002.jpg&auto=format&fit=crop&w=800&q=80" 
                      alt="Sarthak Darade" 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-medium">Sarthak Darade</h3>
                    <p className="mb-4 text-blue-600">Co-Founder & Editor-in-Chief</p>
                    <p className="text-gray-600">
                      Is is a passionate software developer and visionary innovator behind Times Roman. With a strong foundation in technology and a deep interest in AI-powered automation, Sarthak founded Times Roman with the mission to revolutionize how news is curated, delivered, and consumed.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                      alt="Sarah Chen" 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-medium">Sarah Chen</h3>
                    <p className="mb-4 text-blue-600">Co-Founder & Chief Technology Officer</p>
                    <p className="text-gray-600">
                      With a PhD in Computer Science from MIT and experience leading technology teams at major tech companies, Sarah brings cutting-edge technology expertise to revolutionize how news is delivered and consumed.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-serif text-3xl font-semibold">Our Team</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  Times Roman employs journalists, editors, and media professionals from diverse backgrounds, bringing a wealth of experience and perspectives to our coverage. Our team includes Pulitzer Prize winners, technology innovators, and experts in various fields.
                </p>
                
                <p className="mt-6">
                  We're always looking for talented individuals to join our team. If you're passionate about journalism and technology, please visit our careers page or contact us directly.
                </p>
                
                <div className="mt-8 flex justify-center">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <MapPin className="h-5 w-5" />
                    Contact Us
                  </a>
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

export default About;
