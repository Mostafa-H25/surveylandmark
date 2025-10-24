import {
  // useEffect,
  useState,
} from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import EditUserRolesPermissionsDialog from "@/components/pages/users-management/dialogs/EditUserRolesPermissionsDialog";
import {
  // roleHierarchy,
  userManagementTabs,
  UserManagementTabsEnum,
  userRoles,
  // UserRolesEnum,
  // UserStatusEnum,
} from "@/constants/defaults";
// import DeleteUserDialog from "@/components/pages/users-management/dialogs/DeleteUserDialog";
// import AssignProjectToUserDialog from "@/components/pages/users-management/dialogs/AssignProjectToUserDialog";
import AddUserDialog from "@/components/shared/dialogs/AddUserDialog";
// import { getAllUsersApi } from "@/api/user/get-all-users.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  // TableBody,
  // TableCell,
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
import { Input } from "@/components/ui/input";
import {
  // Building2,
  // EllipsisVertical,
  // Pencil,
  Search,
  // Trash2,
  Users,
} from "lucide-react";
// import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useAuthStore } from "@/lib/store/use-auth-store";
import type { User } from "@/types/interfaces";

const UsersManagement = () => {
  // const currentUser = useAuthStore((state) => state.user);
  // const [isEditUserRolesPermissionsOpen, setIsEditUserRolesPermissionsOpen] =
  //   useState(false);
  // const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  // const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);

  const [user] = useState<User | null>(null);

  // const [users, setUsers] = useState<User[]>([]);
  const [usersCount] = useState<number>(0);
  const [isLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // const fetchUsers = async () => {
  //   try {
  //     const res = await getAllUsersApi();
  //     setUsers(res.users);
  //     setUsersCount(res.total);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const filteredUsers = users.filter((user) => {
  //   const matchesSearch =
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesRole = selectedRole === "all" || user.role === selectedRole;
  //   return matchesSearch && matchesRole;
  // });

  // const handleAssignProject = (userId: string) => {
  //   const user = users.find((u) => u.id === userId);
  //   if (user) {
  //     setUser(user);
  //     setIsAssignProjectOpen(true);
  //   }
  // };

  // const handleDeleteUser = (userId: string) => {
  //   const user = users.find((u) => u.id === userId);
  //   if (user) {
  //     setUser(user);
  //     setIsDeleteUserOpen(true);
  //   }
  // };

  // const handleEditUserRolesPermissions = (userId: string) => {
  //   const user = users.find((u) => u.id === userId);
  //   if (user) {
  //     setUser(user);
  //     setIsEditUserRolesPermissionsOpen(true);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square size-32 h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="mt-2 text-gray-600">
            Manage user accounts, permissions, and system settings.
          </p>
        </div>
        <AddUserDialog />
      </div>
      {user && (
        <>
          {/* <EditUserRolesPermissionsDialog
            isEditUserRolesPermissionsOpen={isEditUserRolesPermissionsOpen}
            setIsEditUserRolesPermissionsOpen={
              setIsEditUserRolesPermissionsOpen
            }
            user={user}
            onSuccess={fetchUsers}
          />
          <DeleteUserDialog
            isDeleteUserOpen={isDeleteUserOpen}
            setIsDeleteUserOpen={setIsDeleteUserOpen}
            user={user}
            onSuccess={fetchUsers}
          />

          <AssignProjectToUserDialog
            isAssignProjectOpen={isAssignProjectOpen}
            setIsAssignProjectOpen={setIsAssignProjectOpen}
            user={user}
            onSuccess={fetchUsers}
          /> */}
        </>
      )}

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          {userManagementTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab?.replaceAll("_", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

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
                      <SelectItem
                        key={role}
                        value={role}
                        className="capitalize"
                      >
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
                Users ({usersCount})
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
                    <TableHead>Permission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                {/* <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                            <span className="text-sm font-medium text-blue-600">
                              {u.name
                                .split(" ")
                                .map((n) => n[0].toUpperCase())
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {u.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatPhoneNumber(u.phone)}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            u?.role
                              ? roleHierarchy[u?.role]?.color
                              : "bg-gray-500 text-gray-700",
                          )}
                        >
                          {u.role?.replaceAll("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {u.permmisions || <p className="text-center">-</p>}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            u.status === UserStatusEnum.ACTIVE
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {u.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {u.project?.slice(0, 2)?.map((project) => (
                            <span
                              key={project.id}
                              className="mr-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 capitalize"
                            >
                              {project.name}
                            </span>
                          ))}
                          {u.project?.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{u.project.length - 2} more
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-600">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer rounded-full p-2 hover:bg-gray-500/20">
                              <EllipsisVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleAssignProject(u.id)}
                                className="hover:bg-gray-100"
                              >
                                <Building2 className="size-4" />
                                Assign Projects
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEditUserRolesPermissions(u.id)
                                }
                                className="hover:bg-gray-100"
                              >
                                <Pencil className="size-4" />
                                Edit Role
                              </DropdownMenuItem>
                              {u?.role === UserRolesEnum.SUPER_ADMIN ||
                                (u.id !== currentUser?.id && (
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="text-red-600 hover:bg-red-100 hover:text-red-700"
                                  >
                                    <Trash2 className="size-4 text-red-600 hover:text-red-700" />
                                    <span className="text-red-600 hover:text-red-700">
                                      Delete
                                    </span>
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersManagement;
