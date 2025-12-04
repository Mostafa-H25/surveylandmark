import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";
import { UserRolesEnum } from "@/constants/defaults";
import { useAuthStore } from "@/lib/store/use-auth-store";
import AddClientDialogQuickActions from "../clients/dialogs/add-client/AddClientDialogQuickActions";
import { ROUTES } from "@/constants/routes";

const QuickActions = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const isMember = user?.role === UserRolesEnum.MEMBER;

  const handleNewProject = () => {
    navigate(ROUTES.NEW_PROJECT);
  };

  const handleManageUsers = () => {
    navigate(ROUTES.USERS);
  };

  if (isMember) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-normal">
          <Calendar className="size-5 text-blue-600" />
          Quick Actions
        </CardTitle>
        <CardDescription>Frequently used actions and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            onClick={handleNewProject}
            className="h-auto w-full cursor-pointer justify-start p-4 text-left"
            variant="outline"
          >
            <div>
              <div className="font-medium text-gray-900">Add New Project</div>
              <div className="text-sm text-gray-600">
                Create a new construction or sales project
              </div>
            </div>
          </Button>
          <AddClientDialogQuickActions />

          {isRequiredRoleOrHigher(UserRolesEnum.ADMIN, user?.role) && (
            <Button
              onClick={handleManageUsers}
              className="h-auto w-full justify-start p-4 text-left"
              variant="outline"
            >
              <div>
                <div className="font-medium text-gray-900">Manage Users</div>
                <div className="text-sm text-gray-600">
                  Add or edit user accounts
                </div>
              </div>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
