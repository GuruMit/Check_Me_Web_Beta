
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/app/context/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  allowedRoles = []
}) => {
  const { user, isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is empty or user's role is in the allowedRoles, render children
  if (allowedRoles.length === 0 || (user && allowedRoles.includes(user.role))) {
    return <>{children}</>;
  }

  // If user's role is not allowed, redirect to unauthorized page
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
