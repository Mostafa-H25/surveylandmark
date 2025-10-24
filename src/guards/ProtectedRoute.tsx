import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";
import type { UserRole } from "@/types/default";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { meApi } from "@/api/user/me.api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const removeToken = useAuthStore((state) => state.removeToken);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const result = await meApi();
      setUser({ name: result.name, email: result.email, role: result.role });
    } catch (error) {
      console.error(error);
      removeToken();
    }
  };
  useEffect(() => {
    if (token) fetchUser();
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square size-32 h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token) {
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
