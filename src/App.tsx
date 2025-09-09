import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import HospitalAuth from "./pages/HospitalAuth";
import RadiologistAuth from "./pages/RadiologistAuth";
import NotFound from "./pages/NotFound";
import DoctorPage from "./pages/DoctorPage";
import CenterPage from "./pages/CenterPage";
import StaffPage from "./pages/StaffPage";
import AdminPage from "./pages/AdminPage";
// import MedicalDashboard from "./components/BackupFiles/MedicalDashboard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/hospital" element={<HospitalAuth />} />
          <Route path="/auth/radiologist" element={<RadiologistAuth />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/center" element={<CenterPage />} />
          <Route path="/technician" element={<StaffPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* <Route path="/medical" element={<MedicalDashboard />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
