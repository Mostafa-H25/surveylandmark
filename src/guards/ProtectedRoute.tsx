import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";
import { Layout } from "../layouts/Layout";
import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Check role permissions
  if (requiredRole) {
    if (!isRequiredRoleOrHigher(requiredRole, user?.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Layout>{children}</Layout>;
};
