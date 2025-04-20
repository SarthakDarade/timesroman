import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Google OAuth Configuration
const googleOAuthConfig = {
  clientId: "674049796284-u4jjioha7pgaubavllj8bj2u81vq0kuf.apps.googleusercontent.com",
  clientSecret: "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",
  redirectUri: "https://jdencffimqusolxqbnjw.supabase.co/auth/v1/callback flowName=GeneralOAuthFlow",
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token"
};

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const signupSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const from = location.state?.from?.pathname || "/";

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    try {
      await signIn(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      setAuthError("Failed to sign in. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setAuthError(null);
    try {
      await signUp(data.email, data.password);
      // Consider adding a success message or redirect to verification page
    } catch (error) {
      setAuthError("Failed to create account. Please try again.");
      console.error("Signup error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle({
        clientId: googleOAuthConfig.clientId,
        redirectUri: googleOAuthConfig.redirectUri
      });
      navigate(from, { replace: true });
    } catch (error) {
      setAuthError("Google sign-in failed. Please try again.");
      console.error("Google sign in error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setAuthError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="container mx-auto max-w-md px-4 py-8">
          <div className="mb-6 text-center">
            <h1 className="font-serif text-3xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="mt-2 text-gray-600">
              {isLogin 
                ? "Sign in to access your account" 
                : "Join Times Roman to access exclusive content"
              }
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {authError}
            </div>
          )}
          
          {/* Google Sign In Button */}
          <Button 
            variant="outline" 
            className="w-full mb-4 flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={loading || isGoogleLoading}
          >
            <FcGoogle className="h-5 w-5" />
            {isGoogleLoading 
              ? "Processing..." 
              : isLogin 
                ? "Sign In with Google" 
                : "Sign Up with Google"
            }
          </Button>
          
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
              OR
            </span>
          </div>
          
          {isLogin ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          )}
          
          <div className="mt-6 text-center">
            <button 
              onClick={toggleForm}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"
              }
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
