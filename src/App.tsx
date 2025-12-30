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
import EventOwnerAuth from "./pages/EventOwnerAuth";
import EventOwnerDashboard from "./pages/EventOwnerDashboard";
import AddEvent from "./pages/AddEvent";
import MyEvents from "./pages/MyEvents";
import EditEvent from "./pages/EditEvent";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";

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
            <Route path="/event-owner/auth" element={<EventOwnerAuth />} />
            <Route path="/event-owner/dashboard" element={<EventOwnerDashboard />} />
            <Route path="/event-owner/add-event" element={<AddEvent />} />
            <Route path="/event-owner/my-events" element={<MyEvents />} />
            <Route path="/event-owner/edit-event/:eventId" element={<EditEvent />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MyEventsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
