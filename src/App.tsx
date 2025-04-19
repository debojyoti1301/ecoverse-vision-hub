import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PathDetectionPage from "./pages/PathDetectionPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UploadModal from "./components/UploadModal";
import { AppProvider, useAppContext } from "./context/AppContext";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isModalOpen, toggleModal, isSidebarOpen, toggleSidebar, addPost } = useAppContext();
  
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className="flex-1 mt-16 md:ml-64">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/path-detection" element={<PathDetectionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      
      <UploadModal 
        isOpen={isModalOpen} 
        onClose={toggleModal} 
        onUpload={addPost} 
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
