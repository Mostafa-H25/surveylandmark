import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { abortAxiosInstance } from "./lib/api-client";

import Login from "./pages/Login";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
// import ItemPage from "./pages/ItemPage";
// import Payments from "./pages/Payments";
import Dashboard from "./pages/Dashboard";
// import Standards from "./pages/Standards";
import NewProject from "./pages/NewProject";
// import UnitDetails from "./pages/UnitDetails";
import Registration from "./pages/Registration";
// import MemberProfile from "./pages/MemberProfile";
// import ProjectDetails from "./pages/ProjectDetails";
// import UsersManagement from "./pages/UsersManagement";
// import ContractorProfile from "./pages/ContractorProfile";
import ClientsManagement from "./pages/ClientsManagement";

import { ProtectedRoute } from "./guards/ProtectedRoute";

let previousUrl = "";
let currentUrl = "";

const AppRoutes = () => {
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    if (!previousUrl && !currentUrl) {
      previousUrl = pathname;
      currentUrl = pathname;
    } else {
      previousUrl = currentUrl;
      currentUrl = pathname;
    }

    if (previousUrl !== currentUrl) {
      abortAxiosInstance(previousUrl);
    }
  }, [pathname]);
  return (
    <Routes>
      <Route path="/sign-up" element={<Registration />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/unit/:id"
        element={
          <ProtectedRoute>
            <UnitDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/item/:id"
        element={
          <ProtectedRoute>
            <ItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members/:id"
        element={
          <ProtectedRoute>
            <MemberProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contractors/:id"
        element={
          <ProtectedRoute>
            <ContractorProfile />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="admin">
            <UsersManagement />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <ClientsManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/new"
        element={
          <ProtectedRoute>
            <NewProject />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/project/:projectId"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectId/standards"
        element={
          <ProtectedRoute>
            <Standards />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
