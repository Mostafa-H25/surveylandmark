import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { abortAxiosInstance } from "./lib/api-client";

import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import ItemDetails from "./pages/ItemDetails";
import Payments from "./pages/Payments";
import Dashboard from "./pages/Dashboard";
import NewProject from "./pages/NewProject";
import UnitDetails from "./pages/UnitDetails";
import Registration from "./pages/Registration";
import MemberProfile from "./pages/MemberProfile";
import ProjectDetails from "./pages/ProjectDetails";
import UsersManagement from "./pages/UsersManagement";
import ContractorProfile from "./pages/ContractorProfile";
import ClientsManagement from "./pages/ClientsManagement";

import { ProtectedRoute } from "./guards/ProtectedRoute";
import UserInvitation from "./pages/UserInvitation";
import { ROUTES } from "./constants/routes";
import { UserRolesEnum } from "./constants/defaults";

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
      <Route path={ROUTES.SIGN_UP} element={<Registration />} />
      <Route path={ROUTES.SIGN_IN} element={<Login />} />
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.INVITE}
        element={
          <ProtectedRoute>
            <UserInvitation />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.USERS}
        element={
          <ProtectedRoute requiredRole={UserRolesEnum.SUPER_ADMIN}>
            <UsersManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.CLIENTS}
        element={
          <ProtectedRoute>
            <ClientsManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.NEW_PROJECT}
        element={
          <ProtectedRoute>
            <NewProject />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.UNIT()}
        element={
          <ProtectedRoute>
            <UnitDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ITEM()}
        element={
          <ProtectedRoute>
            <ItemDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MEMBER()}
        element={
          <ProtectedRoute>
            <MemberProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.CONTRACTOR()}
        element={
          <ProtectedRoute>
            <ContractorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROJECT()}
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MESSAGES}
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.REPORTS}
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PAYMENTS}
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
