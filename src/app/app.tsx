// import { Toaster } from "@/components/ui/Toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/Tooltips";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/auth-context";
// import ProtectedRoute from "./route/protected-route";

// // Pages
// import ManagersPage from "./pages/managers/ManagersPage";
// import CreateManagerPage from "./pages/managers/CreateManagerPage";
// import GestionnaireCoursDashboard from "./pages/gestionnaireCours/GestionnaireCoursDashboard";
// import LoginPage from "./userLogin/page";
// // import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
// // import NotFound from "./pages/NotFound";
// import Dashboard from "./pages/Dashboard";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             {/* Public routes */}
//             <Route path="/login" element={<LoginPage />} />
//             {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
            
//             {/* Protected route that redirects based on role */}
//             <Route 
//               path="/" 
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/dashboard" 
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               } 
//             />
            
//             {/* Admin routes */}
//             <Route 
//               path="/managers" 
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <ManagersPage />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/managers/create" 
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <CreateManagerPage />
//                 </ProtectedRoute>
//               } 
//             />
            
//             {/* Gestionnaire de Cours routes */}
//             <Route 
//               path="/cours-dashboard" 
//               element={
//                 <ProtectedRoute allowedRoles={["gestionnaire_cours"]}>
//                   <GestionnaireCoursDashboard />
//                 </ProtectedRoute>
//               } 
//             />
            
//             {/* Catch-all route */}
//             {/* <Route path="*" element={<NotFound />} /> */}
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </AuthProvider>
//   </QueryClientProvider>
// );

// export default App;