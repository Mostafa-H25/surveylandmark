import type { Dispatch, SetStateAction } from "react";

import { Edit, Shield } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { permissionsData } from "@/assets/data";
import { TabsContent } from "@/components/ui/tabs";
import { roleHierarchy, UserManagementTabsEnum } from "@/constants/defaults";
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

type Props = {
  setSelectedPermissionId: Dispatch<SetStateAction<number>>;
  setIsEditPermissionsOpen: Dispatch<SetStateAction<boolean>>;
};

const PermissionsTab = ({
  setSelectedPermissionId,
  setIsEditPermissionsOpen,
}: Props) => {
  const handleEditPermissions = (permissionId: number) => {
    setSelectedPermissionId(permissionId);
    setIsEditPermissionsOpen(true);
  };
  return (
    <TabsContent
      value={UserManagementTabsEnum.PERMISSIONS}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Permissions Management
          </CardTitle>
          <CardDescription>
            Configure role-based access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Can Edit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissionsData.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <Badge
                      className={cn(
                        permission?.role
                          ? roleHierarchy[permission?.role]?.color
                          : "bg-gray-500 text-gray-700",
                      )}
                    >
                      {permission.role.replaceAll("_", " ").toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {permission.module}
                  </TableCell>
                  <TableCell>{permission.access}</TableCell>
                  <TableCell>
                    <Badge
                      variant={permission.canEdit ? "default" : "secondary"}
                    >
                      {permission.canEdit ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPermissions(permission.id)}
                    >
                      <Edit className="mr-1 size-3" />
                      Edit
                    </Button>
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

export default PermissionsTab;
