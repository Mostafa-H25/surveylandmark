import type { Dispatch, SetStateAction } from "react";

import { UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { roleHierarchy, UserManagementTabsEnum } from "@/constants/defaults";
import type { UserRole } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  joinDate: string;
  projects: string[];
  financialLimit?: number;
}

type Props = {
  users: User[];
  setSelectedUserId: Dispatch<SetStateAction<string>>;
  setIsAssignProjectOpen: Dispatch<SetStateAction<boolean>>;
  handleEditUser: (userId: string) => void;
};

const RolesTab = ({
  users,
  setSelectedUserId,
  setIsAssignProjectOpen,
  handleEditUser,
}: Props) => {
  const handleAssignProject = (userId: string) => {
    setSelectedUserId(userId);
    setIsAssignProjectOpen(true);
  };

  return (
    <TabsContent value={UserManagementTabsEnum.ROLES} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            Role & Project Assignment
          </CardTitle>
          <CardDescription>Assign roles and projects to users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Assigned Projects</TableHead>
                <TableHead>Financial Limit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        user?.role
                          ? roleHierarchy[user?.role]?.color
                          : "bg-gray-500 text-gray-700",
                      )}
                    >
                      {user.role.replaceAll("_", " ").toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.projects.map((project, index) => (
                        <span
                          key={index}
                          className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.financialLimit
                      ? `$${user.financialLimit.toLocaleString()}`
                      : "No limit set"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAssignProject(user.id)}
                      >
                        Assign Project
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user.id)}
                      >
                        Edit Role
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default RolesTab;
