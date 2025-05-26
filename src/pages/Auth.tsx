
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page they were trying to visit
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (isSignUp) {
      if (!fullName.trim()) {
        setError('Full name is required');
        return false;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password, {
          full_name: fullName
        });
        toast.success('Account created successfully! Please check your email to verify your account.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
        toast.success('Signed in successfully!');
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred during authentication');
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = (mode: 'signin' | 'signup') => {
    setIsSignUp(mode === 'signup');
    resetForm();
  };

  return (
    <>
      <SEOHead
        title={isSignUp ? 'Sign Up - Times Roman' : 'Sign In - Times Roman'}
        description={isSignUp ? 'Create your Times Roman account to save articles, customize your feed, and access premium features.' : 'Sign in to your Times Roman account to access saved articles and personalized content.'}
        canonical={`/auth`}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Back to home link */}
            <div className="text-center">
              <Link 
                to="/" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Times Roman
              </Link>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">
                  Welcome to Times Roman
                </CardTitle>
                <CardDescription>
                  {isSignUp 
                    ? 'Create your account to get started' 
                    : 'Sign in to access your personalized news experience'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs value={isSignUp ? 'signup' : 'signin'} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger 
                      value="signin" 
                      onClick={() => switchMode('signin')}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup" 
                      onClick={() => switchMode('signup')}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6">
                    {error && (
                      <Alert className="mb-4 border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {isSignUp && (
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-sm font-medium">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="fullName"
                              type="text"
                              placeholder="Enter your full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="pl-10"
                              required={isSignUp}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {isSignUp && (
                          <p className="text-xs text-gray-500">
                            Password must be at least 6 characters long
                          </p>
                        )}
                      </div>
                      
                      {isSignUp && (
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="pl-10 pr-10"
                              required={isSignUp}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                      </Button>
                    </form>
                  </div>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-600">
                  {isSignUp ? (
                    <p>
                      By creating an account, you agree to our{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-800 underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                        Privacy Policy
                      </Link>
                    </p>
                  ) : (
                    <p>
                      Don't have an account?{' '}
                      <button
                        onClick={() => switchMode('signup')}
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        Sign up here
                      </button>
                    </p>
                  )}
                </div>
                
                {!isSignUp && (
                  <div className="text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}
              </CardFooter>
            </Card>
            
            {/* Additional info */}
            <div className="text-center text-xs text-gray-500">
              <p>
                Secure authentication powered by Supabase.{' '}
                <Link to="/disclaimer" className="underline hover:text-gray-700">
                  Learn more about our AI content
                </Link>
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Auth;
