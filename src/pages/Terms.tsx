
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  const lastUpdated = "May 10, 2025";
  
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Terms of Service - Times Roman</title>
        <meta name="description" content="Terms of Service for Times Roman - The rules and guidelines for using our platform and services." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mb-2 font-serif text-4xl font-bold md:text-5xl">Terms of Service</h1>
          <p className="mb-8 text-gray-600">Last updated: {lastUpdated}</p>
          
          <div className="prose prose-lg max-w-none">
            <section>
              <p>
                Welcome to Times Roman. Please read these Terms of Service ("Terms") carefully as they contain important information regarding your legal rights, remedies, and obligations. By accessing or using the Times Roman website, mobile applications, or any other features or services offered by Times Roman (collectively, the "Services"), you agree to be bound by these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use our Services.
              </p>
              <p>
                We may revise these Terms at any time by updating this page. You are expected to check this page from time to time to take notice of any changes we make, as they are binding on you. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">2. Eligibility</h2>
              <p>
                You must be at least 18 years of age to use our Services. By using our Services, you represent and warrant that you have the legal capacity to enter into a binding agreement with Times Roman and are not barred from using the Services under the laws of your country of residence.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account.
              </p>
              <p>
                If you suspect any unauthorized use of your account, you must notify us immediately. We reserve the right to disable any user account at any time in our sole discretion, for any or no reason, including if, in our opinion, you have violated these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">4. Subscription and Billing</h2>
              <p>
                Some parts of our Services are offered on a subscription basis. By subscribing to our Services, you agree to pay the applicable fees as they become due. Subscription fees are non-refundable except as expressly stated in these Terms or as required by applicable law.
              </p>
              <p>
                We may change our subscription fees from time to time, but we will provide you with advance notice of any fee changes. If you do not agree with a fee change, you may cancel your subscription before the change takes effect.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">5. Content</h2>
              <p>
                Our Services may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Services, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting Content on or through the Services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6">
                <li>The Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms.</li>
                <li>The posting of your Content on or through the Services does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">6. Intellectual Property</h2>
              <p>
                The Services and their original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Times Roman and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Times Roman.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">7. Limitation of Liability</h2>
              <p>
                In no event shall Times Roman, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6">
                <li>your access to or use of or inability to access or use the Services;</li>
                <li>any conduct or content of any third party on the Services;</li>
                <li>any content obtained from the Services; and</li>
                <li>unauthorized access, use, or alteration of your transmissions or content.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">8. Disclaimer</h2>
              <p>
                Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">10. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, please stop using the Services.
              </p>
            </section>
            
            <section>
              <h2 className="font-serif text-2xl font-semibold">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@timesroman.com<br />
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

export default Terms;
