
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PasswordReset from "./pages/auth/PasswordReset";
import UserProfile from "./pages/auth/UserProfile";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/realisations" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Authentication routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/password-reset" element={<PasswordReset />} />
              
              {/* Protected routes - available to all authenticated users */}
              <Route path="/profile" element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              
              {/* Redirect any other routes to home */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
