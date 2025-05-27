
import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

// Eagerly loaded components
import Index from "./pages/Index";

// Lazily loaded components
const Article = lazy(() => import("./pages/Article"));
const Category = lazy(() => import("./pages/Category"));
const Search = lazy(() => import("./pages/Search"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Fallback loading component
const PageLoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600">Loading page...</p>
    </div>
  </div>
);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Auth callback component to handle OAuth redirects
const AuthCallback = () => {
  useEffect(() => {
    // The session is automatically handled by Supabase
    window.location.href = '/';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Completing authentication, please wait...</p>
    </div>
  );
};

// Prefetch function to be used with React Query
const prefetchRouteData = () => {
  // This function would prefetch data for routes the user is likely to visit
  // Currently just a stub, but would be expanded based on route data
};

const AppContent = () => {
  // Preload critical routes when idle
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('/article/')) {
            // Preload the Article component when idle
            import("./pages/Article");
          } else if (href && href.startsWith('/category/')) {
            // Preload the Category component when idle
            import("./pages/Category");
          }
        });
        prefetchRouteData();
      });
    }
  }, []);
  
  return (
    <AuthProvider>
      <div className="app-container">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/article/:id" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Article />
              </Suspense>
            } 
          />
          <Route 
            path="/category/:categoryId" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Category />
              </Suspense>
            } 
          />
          <Route 
            path="/search" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Search />
              </Suspense>
            } 
          />
          <Route 
            path="/auth" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Auth />
              </Suspense>
            } 
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <About />
              </Suspense>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Contact />
              </Suspense>
            } 
          />
          <Route 
            path="/privacy" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Privacy />
              </Suspense>
            } 
          />
          <Route 
            path="/terms" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Terms />
              </Suspense>
            } 
          />
          <Route 
            path="/disclaimer" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Disclaimer />
              </Suspense>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoadingFallback />}>
                  <Profile />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route 
            path="*" 
            element={
              <Suspense fallback={<PageLoadingFallback />}>
                <NotFound />
              </Suspense>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
