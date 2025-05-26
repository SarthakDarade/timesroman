
import React from 'react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Disclaimer: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Disclaimer - Times Roman"
        description="Important disclaimer about AI-generated content and image attribution for Times Roman news website."
        canonical="/disclaimer"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
              <p className="text-lg text-gray-600">
                Important information about our content and sources
              </p>
            </header>

            <div className="space-y-8">
              {/* AI Content Disclaimer */}
              <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  AI-Generated Content Notice
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  This website may display AI-generated content. While we strive for accuracy, 
                  AI can sometimes provide incorrect or misleading information. We recommend 
                  verifying important information through multiple sources and exercising 
                  critical thinking when consuming any news content.
                </p>
              </section>

              {/* Image Attribution */}
              <section className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Image Attribution
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All images used in articles are credited to their respective sources and 
                  are included solely to enhance content quality for users. We respect 
                  intellectual property rights and make every effort to use images that 
                  are properly licensed or fall under fair use guidelines.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you believe any image on our website infringes on your copyright, 
                  please contact us immediately and we will remove it promptly.
                </p>
              </section>

              {/* General Disclaimer */}
              <section className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  General Information
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    The information provided on Times Roman is for general informational 
                    purposes only. We make no representations or warranties of any kind, 
                    express or implied, about the completeness, accuracy, reliability, 
                    suitability, or availability of the information.
                  </p>
                  <p>
                    Any reliance you place on such information is strictly at your own risk. 
                    In no event will we be liable for any loss or damage arising from the 
                    use of this website or its content.
                  </p>
                  <p>
                    News content is updated regularly, but Times Roman cannot guarantee 
                    that all information is current or accurate at the time of reading.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this disclaimer or our content policies, 
                  please don't hesitate to{' '}
                  <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                    contact us
                  </a>
                  . We value your feedback and are committed to maintaining transparency 
                  with our readers.
                </p>
              </section>
            </div>

            {/* Last Updated */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </footer>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;
