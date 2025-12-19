import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyEventsProvider } from "@/hooks/useMyEvents";
import Index from "./pages/Index";
import States from "./pages/States";
import StateDetail from "./pages/StateDetail";
import Events from "./pages/Events";
import Itinerary from "./pages/Itinerary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MyEventsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/states" element={<States />} />
            <Route path="/state/:stateId" element={<StateDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MyEventsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
