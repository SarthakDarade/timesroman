
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { generateBreadcrumbs } from '@/utils/seoHelpers';

const Disclaimer = () => {
  const disclaimerBreadcrumbs = generateBreadcrumbs('/disclaimer', 'Disclaimer');

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead 
        title="Disclaimer | Times Roman"
        description="Important disclaimers for Times Roman news website including AI content usage, image attribution, and editorial policies."
        canonical="https://timesroman.in/disclaimer"
        breadcrumbs={disclaimerBreadcrumbs}
        keywords={['disclaimer', 'terms', 'ai content', 'image attribution', 'editorial policy']}
      />
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8 sm:mb-12 text-center">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Disclaimer
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Important information about our content, AI usage, and editorial policies
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="prose prose-lg max-w-none">
                {/* General Disclaimer */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">General Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                    this Company excludes all representations, warranties, undertakings, and guarantees relating to this website 
                    and its contents, or which is or may be provided by any affiliates or any other third party, including in 
                    relation to any inaccuracies or omissions in this website and/or the Company's literature.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    All content on Times Roman is for informational purposes only. We strive to provide accurate and up-to-date 
                    information, but we make no representations or warranties of any kind about the completeness, accuracy, 
                    reliability, suitability, or availability of the website or the information contained on the website.
                  </p>
                </section>

                {/* AI Content Warning */}
                <section className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Generated Content Notice</h2>
                  <div className="space-y-4 text-gray-700">
                    <p className="font-semibold text-blue-800">
                      ⚠️ Important: Some content on this website may be generated or enhanced using Artificial Intelligence (AI) technology.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>AI-generated content is clearly marked when identifiable</li>
                      <li>All AI-generated content is reviewed by human editors before publication</li>
                      <li>We use AI to assist with content creation, translation, and summarization</li>
                      <li>AI may be used to enhance readability and correct grammatical errors</li>
                      <li>Editorial oversight ensures factual accuracy and journalistic standards</li>
                    </ul>
                    <p>
                      While we maintain strict editorial standards, readers should exercise their own judgment 
                      when interpreting any content and cross-reference important information with primary sources.
                    </p>
                  </div>
                </section>

                {/* Image Attribution */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Image Attribution & Copyright</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Times Roman respects intellectual property rights and strives to properly attribute all images used on our website.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Image Sources:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Unsplash:</strong> High-quality stock photos provided under the Unsplash License</li>
                      <li><strong>Original Photography:</strong> Images taken by our editorial team</li>
                      <li><strong>Licensed Stock:</strong> Images purchased from authorized stock photo providers</li>
                      <li><strong>Press Releases:</strong> Images provided by companies and organizations for editorial use</li>
                      <li><strong>Public Domain:</strong> Images that are free from copyright restrictions</li>
                    </ul>
                    <p className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                      <strong>Copyright Notice:</strong> If you believe any image on our website infringes your copyright, 
                      please contact us immediately at <a href="mailto:copyright@timesroman.in" className="text-blue-600 hover:underline">copyright@timesroman.in</a> 
                      with details of the image and proof of ownership. We will investigate and remove any infringing content promptly.
                    </p>
                  </div>
                </section>

                {/* Editorial Policy */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Editorial Policy</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Times Roman is committed to maintaining high standards of journalism and editorial integrity.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We strive for accuracy, fairness, and impartiality in our reporting</li>
                      <li>Sources are verified and cross-checked when possible</li>
                      <li>Corrections and updates are made promptly when errors are identified</li>
                      <li>We distinguish between news reporting and opinion content</li>
                      <li>Conflicts of interest are disclosed when relevant</li>
                    </ul>
                  </div>
                </section>

                {/* External Links */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">External Links</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our website may contain links to external websites. These links are provided for convenience and 
                    informational purposes only. Times Roman does not endorse, control, or assume responsibility for 
                    the content, privacy policies, or practices of any third-party websites. Users access external 
                    links at their own risk.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    In no event shall Times Roman, its owners, employees, or contributors be liable for any direct, 
                    indirect, incidental, special, or consequential damages arising out of or in any way connected 
                    with the use of this website or with the delay or inability to use this website, or for any 
                    information obtained through this website, whether based on contract, tort, strict liability, 
                    or otherwise.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this disclaimer or our editorial policies, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> <a href="mailto:legal@timesroman.in" className="text-blue-600 hover:underline">legal@timesroman.in</a></p>
                    <p><strong>Editorial:</strong> <a href="mailto:editor@timesroman.in" className="text-blue-600 hover:underline">editor@timesroman.in</a></p>
                    <p><strong>Copyright Issues:</strong> <a href="mailto:copyright@timesroman.in" className="text-blue-600 hover:underline">copyright@timesroman.in</a></p>
                  </div>
                </section>

                {/* Last Updated */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;
