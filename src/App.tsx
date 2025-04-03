import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import ScrollToTop from './components/ScrollToTop';
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Coaches from "./pages/Coaches";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route index element={<Index />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* Remove position prop from Toaster */}
        <Toaster />
        {/* Keep position for Sonner if it accepts it */}
        <Sonner position="top-center" richColors />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;