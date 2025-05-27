
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Auth = () => {
  const { loading, signInWithGoogle, signInWithFacebook, signInWithTwitter, signInWithLinkedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authTab, setAuthTab] = useState("signin");
  
  // Get the page they were trying to visit
  const from = location.state?.from?.pathname || "/";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleAuthProvider = async (provider: string) => {
    try {
      switch(provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'facebook':
          await signInWithFacebook();
          break;
        case 'twitter':
          await signInWithTwitter();
          break;
        case 'linkedin':
          await signInWithLinkedIn();
          break;
        default:
          console.error("Unknown provider:", provider);
      }
      // Navigation is handled by the auth state change listener
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <motion.section 
          className="container mx-auto max-w-md px-4 py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mb-10 text-center" variants={itemVariants}>
            <h1 className="font-serif text-4xl font-bold">
              Welcome to Times Roman
            </h1>
            <p className="mt-3 text-gray-600">
              {authTab === "signin" 
                ? "Sign in to access personalized news content" 
                : "Join Times Roman for the best news experience"}
            </p>
          </motion.div>
          
          <Tabs defaultValue="signin" value={authTab} onValueChange={setAuthTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <motion.div 
              className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg"
              variants={itemVariants}
            >
              <TabsContent value="signin" className="mt-0 space-y-6">
                <h2 className="text-center text-xl font-semibold">Sign in with</h2>
                
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('google')}
                    disabled={loading}
                  >
                    <FcGoogle className="h-6 w-6" />
                    <span>Continue with Google</span>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-blue-50 text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleAuthProvider('facebook')}
                    disabled={loading}
                  >
                    <FaFacebook className="h-6 w-6" />
                    <span>Continue with Facebook</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-blue-200 hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleAuthProvider('linkedin')}
                    disabled={loading}
                  >
                    <FaLinkedin className="h-6 w-6" />
                    <span>Continue with LinkedIn</span>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('twitter')}
                    disabled={loading}
                  >
                    <FaXTwitter className="h-6 w-6" />
                    <span>Continue with X</span>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0 space-y-6">
                <h2 className="text-center text-xl font-semibold">Create account with</h2>
                
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('google')}
                    disabled={loading}
                  >
                    <FcGoogle className="h-6 w-6" />
                    <span>Sign up with Google</span>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-blue-50 text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleAuthProvider('facebook')}
                    disabled={loading}
                  >
                    <FaFacebook className="h-6 w-6" />
                    <span>Sign up with Facebook</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-blue-200 hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleAuthProvider('linkedin')}
                    disabled={loading}
                  >
                    <FaLinkedin className="h-6 w-6" />
                    <span>Sign up with LinkedIn</span>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('twitter')}
                    disabled={loading}
                  >
                    <FaXTwitter className="h-6 w-6" />
                    <span>Sign up with X</span>
                  </Button>
                </div>
              </TabsContent>
            </motion.div>
            
            <motion.div 
              className="mt-8 text-center text-sm text-gray-600"
              variants={itemVariants}
            >
              <p>
                Times Roman uses secure authentication powered by us.
                We never store your password.
              </p>
              <p className="mt-4">
                By continuing, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </motion.div>
          </Tabs>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
