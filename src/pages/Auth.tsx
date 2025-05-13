
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Auth = () => {
  const { loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page they were trying to visit
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Navigation is handled by the auth state change listener
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="container mx-auto max-w-md px-4 py-16">
          <div className="mb-10 text-center">
            <h1 className="font-serif text-3xl font-bold">
              Welcome to Times Roman
            </h1>
            <p className="mt-3 text-gray-600">
              Sign in to access personalized news content and features
            </p>
          </div>
          
          {/* Google Sign In Button */}
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-center text-xl font-semibold">Sign in with Google</h2>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 py-6 text-base"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <FcGoogle className="h-6 w-6" />
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              Apple Sign In Coming Soon
            </p>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              By continuing, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Times Roman uses secure authentication powered by Google.
              We never store your password.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
