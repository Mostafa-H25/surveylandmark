import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/shared/UserCard";
import { useAuthStore } from "@/lib/store/use-auth-store";
import Projects from "@/components/pages/dashboard/Projects";
import {
  roleHierarchy,
  // UserRolesEnum
} from "@/constants/defaults";
import QuickActions from "@/components/pages/dashboard/QuickActions";
import RevenueTrendChart from "@/components/charts/RevenueTrendChart";
import EnhancedStats from "@/components/pages/dashboard/EnhancedStats";
import ProjectStatusChart from "@/components/charts/ProjectStatusChart";
// import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";
import MonthlyProgressChart from "@/components/charts/MonthlyProgressChart";
import DepartmentOverviewChart from "@/components/charts/DepartmentOverviewChart";
import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
// import AddUserDialog from "@/components/shared/dialogs/AddUserDialog";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Here's an overview of your construction
            management system.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/messages")}
            variant={"ghost"}
            className="rounded-full p-2 text-blue-500 hover:bg-blue-100"
          >
            <Bell className="size-8" />
          </Button>
          <UserCard />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Welcome back, {user?.name}!
          </CardTitle>
          <CardDescription>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold text-white uppercase",
                user?.role
                  ? roleHierarchy[user?.role]?.color
                  : "bg-gray-500 text-gray-700",
              )}
            >
              {user?.role ? formatCamelCaseToText(user?.role) : user?.role}
            </span>
          </CardDescription>
        </CardHeader>
        {/* {isRequiredRoleOrHigher(UserRolesEnum.ADMIN, user?.role) && (
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Start by inviting team members to collaborate on survey projects.
            </p>
            <AddUserDialog />
            <Button
              onClick={() => navigate("/invite-team-members")}
              className="bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="size-5" />
              Invite Team Members
            </Button>
          </CardContent>
        )} */}
      </Card>
      <EnhancedStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MonthlyProgressChart />
        <ProjectStatusChart />
        <RevenueTrendChart />
        <DepartmentOverviewChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Projects />
        <QuickActions />
      </div>

      {/* <Alerts /> */}
    </div>
  );
};

export default Dashboard;
