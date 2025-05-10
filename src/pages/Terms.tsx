
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  const lastUpdated = "May 10, 2025";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Terms sections for quick navigation
  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'eligibility', title: '2. Eligibility' },
    { id: 'accounts', title: '3. User Accounts' },
    { id: 'subscription', title: '4. Subscription and Billing' },
    { id: 'content', title: '5. Content' },
    { id: 'intellectual', title: '6. Intellectual Property' },
    { id: 'liability', title: '7. Limitation of Liability' },
    { id: 'disclaimer', title: '8. Disclaimer' },
    { id: 'governing-law', title: '9. Governing Law' },
    { id: 'changes', title: '10. Changes to Terms' },
    { id: 'contact', title: '11. Contact Us' },
  ];
  
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Terms of Service - Times Roman</title>
        <meta name="description" content="Terms of Service for Times Roman - The rules and guidelines for using our platform and services." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-2 font-serif text-4xl font-bold md:text-5xl">Terms of Service</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-12">
              {/* Sidebar Navigation */}
              <div className="md:col-span-3">
                <div className="sticky top-24">
                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <h3 className="mb-4 border-b border-gray-200 pb-2 font-medium">Quick Navigation</h3>
                    <nav>
                      <ul className="space-y-2">
                        {sections.map(section => (
                          <li key={section.id}>
                            <button
                              onClick={() => scrollToSection(section.id)}
                              className={`w-full rounded px-3 py-2 text-left text-sm transition hover:bg-gray-100 ${
                                activeSection === section.id ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-700'
                              }`}
                            >
                              {section.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                  
                  <div className="mt-6 rounded-lg bg-blue-50 p-5 shadow-sm">
                    <h3 className="mb-2 font-medium text-blue-800">Have Questions?</h3>
                    <p className="text-sm text-blue-700">
                      For questions about our Terms of Service, please contact our legal team.
                    </p>
                    <a 
                      href="/contact"
                      className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Contact Us
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-9">
                <div className="rounded-lg bg-white p-8 shadow-sm">
                  <div className="prose prose-lg max-w-none">
                    <section>
                      <p>
                        Welcome to Times Roman. Please read these Terms of Service ("Terms") carefully as they contain important information regarding your legal rights, remedies, and obligations. By accessing or using the Times Roman website, mobile applications, or any other features or services offered by Times Roman (collectively, the "Services"), you agree to be bound by these Terms.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="acceptance" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">1. Acceptance of Terms</h2>
                      <div className="rounded-lg bg-gray-50 p-6">
                        <p>
                          By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use our Services.
                        </p>
                        <p className="mt-4">
                          We may revise these Terms at any time by updating this page. You are expected to check this page from time to time to take notice of any changes we make, as they are binding on you. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes.
                        </p>
                      </div>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="eligibility" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">2. Eligibility</h2>
                      <p>
                        You must be at least 18 years of age to use our Services. By using our Services, you represent and warrant that you have the legal capacity to enter into a binding agreement with Times Roman and are not barred from using the Services under the laws of your country of residence.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="accounts" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">3. User Accounts</h2>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Account Security</h4>
                          <p className="text-sm text-gray-600">
                            When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.
                          </p>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Account Termination</h4>
                          <p className="text-sm text-gray-600">
                            We reserve the right to disable any user account at any time in our sole discretion, for any or no reason, including if, in our opinion, you have violated these Terms.
                          </p>
                        </div>
                      </div>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="subscription" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">4. Subscription and Billing</h2>
                      <p>
                        Some parts of our Services are offered on a subscription basis. By subscribing to our Services, you agree to pay the applicable fees as they become due. Subscription fees are non-refundable except as expressly stated in these Terms or as required by applicable law.
                      </p>
                      <p className="mt-4">
                        We may change our subscription fees from time to time, but we will provide you with advance notice of any fee changes. If you do not agree with a fee change, you may cancel your subscription before the change takes effect.
                      </p>
                      
                      <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Plan</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Billing Cycle</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Cancellation Policy</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap px-6 py-4">Basic</td>
                              <td className="whitespace-nowrap px-6 py-4">Monthly</td>
                              <td className="px-6 py-4">Anytime before next billing cycle</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-6 py-4">Premium</td>
                              <td className="whitespace-nowrap px-6 py-4">Monthly/Annual</td>
                              <td className="px-6 py-4">Anytime before next billing cycle</td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-6 py-4">Enterprise</td>
                              <td className="whitespace-nowrap px-6 py-4">Annual</td>
                              <td className="px-6 py-4">As specified in contract</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="content" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">5. Content</h2>
                      <p>
                        Our Services may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Services, including its legality, reliability, and appropriateness.
                      </p>
                      <p className="mt-4">
                        By posting Content on or through the Services, you represent and warrant that:
                      </p>
                      <ul className="list-inside list-disc space-y-1 pl-6">
                        <li>The Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms.</li>
                        <li>The posting of your Content on or through the Services does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.</li>
                      </ul>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="intellectual" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">6. Intellectual Property</h2>
                      <p>
                        The Services and their original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Times Roman and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
                      </p>
                      <p className="mt-4">
                        Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Times Roman.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="liability" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">7. Limitation of Liability</h2>
                      <p>
                        In no event shall Times Roman, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                      </p>
                      <ul className="list-inside list-disc space-y-1 pl-6">
                        <li>your access to or use of or inability to access or use the Services;</li>
                        <li>any conduct or content of any third party on the Services;</li>
                        <li>any content obtained from the Services; and</li>
                        <li>unauthorized access, use, or alteration of your transmissions or content.</li>
                      </ul>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="disclaimer" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">8. Disclaimer</h2>
                      <div className="rounded-lg bg-gray-50 p-6">
                        <p>
                          Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                        </p>
                      </div>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="governing-law" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">9. Governing Law</h2>
                      <p>
                        These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="changes" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">10. Changes to Terms</h2>
                      <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, please stop using the Services.
                      </p>
                      
                      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-700">
                        <h4 className="font-medium">Important Notice</h4>
                        <p className="mt-2 text-sm">
                          We will notify registered users of any material changes to these Terms via email or notification when accessing the Services. The date at the top of this page indicates when these Terms were last updated.
                        </p>
                      </div>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="contact" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">11. Contact Us</h2>
                      <p>
                        If you have any questions about these Terms, please contact us at:
                      </p>
                      <div className="mt-4 rounded-lg bg-gray-50 p-6">
                        <p className="font-medium">Times Roman Legal Department</p>
                        <p>
                          Email: legal@timesroman.com<br />
                          Phone: +1 (555) 123-4567<br />
                          Address: 123 News Avenue, New York, NY 10001, United States
                        </p>
                      </div>
                    </section>
                  </div>
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

export default Terms;
