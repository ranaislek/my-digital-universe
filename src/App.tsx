import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./components/AuthProvider";
import AdminToolbar from "./components/admin/AdminToolbar";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import ThoughtsPage from "./pages/ThoughtsPage";
import JourneyPage from "./pages/JourneyPage";
import ContactPage from "./pages/ContactPage";
import BlogPostPage from "./pages/BlogPostPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";

const queryClient = new QueryClient();

// Create a wrapper component to inject the AdminToolbar and Analytics
const RootWrapper = () => (
  <>
    <AdminToolbar />
    <Outlet />
    <Analytics />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootWrapper />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Index /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/portfolio", element: <PortfolioPage /> },
          { path: "/project/:slug", element: <ProjectPage /> },
          { path: "/thoughts", element: <ThoughtsPage /> },
          { path: "/journey", element: <JourneyPage /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/blog/:slug", element: <BlogPostPage /> },
          { path: "*", element: <NotFound /> },
        ]
      },
      {
        path: "/admin",
        element: <AdminPage />
      }
    ]
  }
]);

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
