
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy: React.FC = () => {
  const lastUpdated = "May 10, 2025";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Policy sections for quick navigation
  const sections = [
    { id: 'information-collect', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Your Information' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'data-rights', title: 'Your Data Protection Rights' },
    { id: 'policy-changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' },
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
        <title>Privacy Policy - Times Roman</title>
        <meta name="description" content="Privacy Policy for Times Roman - How we collect, use, and protect your personal information." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-2 font-serif text-4xl font-bold md:text-5xl">Privacy Policy</h1>
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
                    <h3 className="mb-2 font-medium text-blue-800">Need Help?</h3>
                    <p className="text-sm text-blue-700">
                      If you have questions about our privacy practices, please contact our privacy team.
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
                        At Times Roman, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="information-collect" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">Information We Collect</h2>
                      
                      <div className="rounded-lg bg-gray-50 p-6">
                        <h3 className="font-serif text-xl font-medium">Personal Information</h3>
                        <p>
                          We may collect personal information that you voluntarily provide to us when you register on the website, express interest in obtaining information about us or our products and services, or otherwise contact us. The personal information we collect may include:
                        </p>
                        <ul className="mt-2 list-inside list-disc space-y-1 pl-6">
                          <li>Name</li>
                          <li>Email address</li>
                          <li>Mailing address</li>
                          <li>Phone number</li>
                          <li>Account login credentials</li>
                          <li>Billing information</li>
                        </ul>
                      </div>
        
                      <div className="mt-6 rounded-lg bg-gray-50 p-6">
                        <h3 className="font-serif text-xl font-medium">Automatically Collected Information</h3>
                        <p>
                          When you visit our website, we may automatically collect certain information about your device, including:
                        </p>
                        <ul className="mt-2 list-inside list-disc space-y-1 pl-6">
                          <li>IP address</li>
                          <li>Browser type</li>
                          <li>Operating system</li>
                          <li>Device information</li>
                          <li>Usage data (pages visited, time spent, etc.)</li>
                          <li>Referral sources</li>
                        </ul>
                      </div>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="information-use" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">How We Use Your Information</h2>
                      <p>
                        We may use the information we collect for various purposes, including:
                      </p>
                      <ul className="list-inside list-disc space-y-1 pl-6">
                        <li>Providing, operating, and maintaining our website</li>
                        <li>Improving, personalizing, and expanding our website</li>
                        <li>Understanding and analyzing how you use our website</li>
                        <li>Developing new products, services, features, and functionality</li>
                        <li>Communicating with you about updates, security alerts, and support</li>
                        <li>Sending you newsletters, marketing or promotional materials</li>
                        <li>Processing transactions</li>
                        <li>Finding and preventing fraud</li>
                      </ul>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="cookies" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">Cookies and Tracking Technologies</h2>
                      <p>
                        We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                      </p>
                      
                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex-1 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Essential Cookies</h4>
                          <p className="text-sm text-gray-600">Necessary for the website to function properly</p>
                        </div>
                        <div className="flex-1 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Analytics Cookies</h4>
                          <p className="text-sm text-gray-600">Help us understand how visitors interact with our site</p>
                        </div>
                        <div className="flex-1 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Marketing Cookies</h4>
                          <p className="text-sm text-gray-600">Used to track visitors across websites</p>
                        </div>
                      </div>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="third-party" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">Third-Party Services</h2>
                      <p>
                        We may use third-party services such as Google Analytics, advertising networks, and social media platforms that collect, monitor, and analyze data to improve our service. These third parties have their own privacy policies addressing how they use such information.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="data-security" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">Data Security</h2>
                      <p>
                        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="data-rights" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">Your Data Protection Rights</h2>
                      <p>
                        Depending on your location, you may have certain rights regarding your personal information, such as:
                      </p>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Right to Access</h4>
                          <p className="text-sm text-gray-600">The right to access personal information we hold about you</p>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Right to Rectification</h4>
                          <p className="text-sm text-gray-600">The right to request correction of inaccurate personal information</p>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Right to Erasure</h4>
                          <p className="text-sm text-gray-600">The right to request deletion of your personal information</p>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Right to Object</h4>
                          <p className="text-sm text-gray-600">The right to object to processing of your personal information</p>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Right to Data Portability</h4>
                          <p className="text-sm text-gray-600">The right to receive your personal data in a structured format</p>
                        </div>
                        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                          <h4 className="font-medium">Right to Withdraw Consent</h4>
                          <p className="text-sm text-gray-600">The right to withdraw consent at any time</p>
                        </div>
                      </div>
                      <p className="mt-4">
                        To exercise any of these rights, please contact us using the information provided in the "Contact Us" section.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="policy-changes" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">Changes to This Privacy Policy</h2>
                      <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                      </p>
                    </section>
                    <br> 
                    
                    </br>
                    <section id="contact" className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold">Contact Us</h2>
                      <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                      </p>
                      <div className="mt-4 rounded-lg bg-gray-50 p-6">
                        <p className="font-medium">Times Roman Privacy Team</p>
                        <p>
                          Email: privacy@timesroman.in<br />
                          Phone: +91 (218) 635-9265<br />
                          Address: Solapur, Maharashtra 413304
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

export default Privacy;
