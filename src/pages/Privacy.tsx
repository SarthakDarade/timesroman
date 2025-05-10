
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy: React.FC = () => {
  const lastUpdated = "May 10, 2025";
  
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Privacy Policy - Times Roman</title>
        <meta name="description" content="Privacy Policy for Times Roman - How we collect, use, and protect your personal information." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mb-2 font-serif text-4xl font-bold md:text-5xl">Privacy Policy</h1>
          <p className="mb-8 text-gray-600">Last updated: {lastUpdated}</p>
          
          <div className="prose prose-lg max-w-none">
            <section>
              <p>
                At Times Roman, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">Information We Collect</h2>
              
              <h3 className="font-serif text-xl font-medium">Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you register on the website, express interest in obtaining information about us or our products and services, or otherwise contact us. The personal information we collect may include:
              </p>
              <ul className="list-disc pl-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Mailing address</li>
                <li>Phone number</li>
                <li>Account login credentials</li>
                <li>Billing information</li>
              </ul>
              
              <h3 className="font-serif text-xl font-medium">Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Device information</li>
                <li>Usage data (pages visited, time spent, etc.)</li>
                <li>Referral sources</li>
              </ul>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6">
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
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">Third-Party Services</h2>
              <p>
                We may use third-party services such as Google Analytics, advertising networks, and social media platforms that collect, monitor, and analyze data to improve our service. These third parties have their own privacy policies addressing how they use such information.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@timesroman.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 News Avenue, New York, NY 10001, United States
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
