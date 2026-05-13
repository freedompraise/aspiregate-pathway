import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const Services = lazy(() => import("./pages/Services.tsx"));
const Destinations = lazy(() => import("./pages/Destinations.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex.tsx"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPost.tsx"));
const BlogCategoryPage = lazy(() => import("./pages/blog/BlogCategory.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const routeFallback = (
  <div
    className="flex min-h-[40vh] items-center justify-center"
    role="status"
    aria-label="Loading page"
  >
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={routeFallback}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/category/:categorySlug" element={<BlogCategoryPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
