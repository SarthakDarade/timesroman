
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Auth = () => {
  const { loading, signInWithGoogle, signInWithTwitter, signInWithLinkedIn, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authTab, setAuthTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const from = location.state?.from?.pathname || "/";

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
        case 'twitter':
          await signInWithTwitter();
          break;
        case 'linkedin':
          await signInWithLinkedIn();
          break;
        default:
          console.error("Unknown provider:", provider);
      }
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Email sign in error:', error);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error('Email sign up error:', error);
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
                <h2 className="text-center text-xl font-semibold">Sign in to your account</h2>
                
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base"
                    disabled={loading}
                  >
                    Sign In
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('google')}
                    disabled={loading}
                    type="button"
                  >
                    <FcGoogle className="h-6 w-6" />
                    <span>Continue with Google</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-blue-200 hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleAuthProvider('linkedin')}
                    disabled={loading}
                    type="button"
                  >
                    <FaLinkedin className="h-6 w-6" />
                    <span>Continue with LinkedIn</span>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('twitter')}
                    disabled={loading}
                    type="button"
                  >
                    <FaXTwitter className="h-6 w-6" />
                    <span>Continue with X</span>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0 space-y-6">
                <h2 className="text-center text-xl font-semibold">Create your account</h2>
                
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password (min 6 characters)"
                      required
                      minLength={6}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base"
                    disabled={loading}
                  >
                    Create Account
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or sign up with</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('google')}
                    disabled={loading}
                    type="button"
                  >
                    <FcGoogle className="h-6 w-6" />
                    <span>Sign up with Google</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-blue-200 hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleAuthProvider('linkedin')}
                    disabled={loading}
                    type="button"
                  >
                    <FaLinkedin className="h-6 w-6" />
                    <span>Sign up with LinkedIn</span>
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleAuthProvider('twitter')}
                    disabled={loading}
                    type="button"
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
                Times Roman uses secure authentication. We never store your password.
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
