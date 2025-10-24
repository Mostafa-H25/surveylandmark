import { type Dispatch, type SetStateAction, useState } from "react";

import {
  // Building2,
  // Edit,
  // EllipsisVertical,
  // Pencil,
  // Trash2,
  Search,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
  roleHierarchy,
  UserManagementTabsEnum,
  userRoles,
  // UserRolesEnum,
  UserStatusEnum,
} from "@/constants/defaults";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole, UserStatus } from "@/types/default";
// import { useAuthStore } from "@/lib/store/use-auth-store";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  project: { id: string; name: string }[];
}

type Props = {
  users: User[];
  setIsAssignProjectOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteUserOpen: Dispatch<SetStateAction<boolean>>;
  handleEditUser: (userId: string) => void;
};

const UsersTab = ({
  users,
  // setIsAssignProjectOpen,
  // setIsDeleteUserOpen,
  // handleEditUser,
}: Props) => {
  // const currentUser = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // const handleAssignProject = (userId: string) => {
  //   setIsAssignProjectOpen(true);
  // };

  // const handleDeleteUser = (userId: string) => {
  //   setIsDeleteUserOpen(true);
  // };
  return (
    <TabsContent value={UserManagementTabsEnum.USERS} className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {userRoles.map((role) => (
                  <SelectItem key={role} value={role} className="capitalize">
                    {role.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5 text-blue-600" />
            Users ({filteredUsers.length})
          </CardTitle>
          <CardDescription>
            All registered users with their roles and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Projects</TableHead>
                {/* <TableHead>Financial Limit</TableHead> */}
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatPhoneNumber(user.phone)}</TableCell>
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
                    <Badge
                      variant={
                        user.status === UserStatusEnum.ACTIVE
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {user.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {user.project?.slice(0, 2)?.map((project) => (
                        <span
                          key={project.id}
                          className="mr-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 capitalize"
                        >
                          {project.name}
                        </span>
                      ))}
                      {user.project?.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{user.project.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    {user.financialLimit
                      ? `$${user.financialLimit.toLocaleString()}`
                      : "-"}
                  </TableCell> */}
                  <TableCell className="text-sm text-gray-600">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {/* <div className="flex justify-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer rounded-full p-2 hover:bg-gray-500/20">
                          <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleAssignProject(user.id)}
                            className="hover:bg-gray-100"
                          >
                            <Building2 className="size-4" />
                            Assign Projects
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-100">
                            <Pencil className="size-4" />
                            Edit Role
                          </DropdownMenuItem>
                          {currentUser?.role === UserRolesEnum.SUPER_ADMIN &&
                            user.id !== currentUser?.id && (
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:bg-red-100 hover:text-red-700"
                              >
                                <Trash2 className="size-4 text-red-600 hover:text-red-700" />
                                Delete
                              </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div> */}
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

export default UsersTab;
