import { useCallback, useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditUserRolesPermissionsDialog from "@/components/pages/users-management/dialogs/EditUserRolesPermissionsDialog";
import {
  roleHierarchy,
  userManagementTabs,
  UserManagementTabsEnum,
  userRoles,
  UserRolesEnum,
  UserStatusEnum,
} from "@/constants/defaults";
import DeleteUserDialog from "@/components/pages/users-management/dialogs/DeleteUserDialog";
import AssignProjectToUserDialog from "@/components/pages/users-management/dialogs/AssignProjectToUserDialog";
import AddUserDialog from "@/components/shared/dialogs/AddUserDialog";
import { getAllUsersApi } from "@/api/user/get-all-users.api";
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
import { Input } from "@/components/ui/input";
import {
  Building2,
  CircleSlash,
  EllipsisVertical,
  Pencil,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store/use-auth-store";
import type { User } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { formatDate } from "@/helpers/formatDate";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { UserPermission, UserRole, UserStatus } from "@/types/default";
import { useDebounce } from "@/hooks/use-debounce";
import Paginator from "@/components/shared/Paginator";

const USERS_QUERY_KEY = "users";

const UsersManagement = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [isEditUserRolesPermissionsOpen, setIsEditUserRolesPermissionsOpen] =
    useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [usersCount, setUserCount] = useState<number>(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const debouncedSearchTerm = useDebounce(searchTerm);
  const debouncedRole = useDebounce(selectedRole);

  const { data: users, isFetching } = useQuery({
    queryKey: [
      USERS_QUERY_KEY,
      paginator.page,
      debouncedSearchTerm,
      debouncedRole,
    ],
    queryFn: () =>
      getAllUsersApi({
        pagination: { page: paginator.page, limit: paginator.limit },
        filters: {
          search: debouncedSearchTerm,
          role: debouncedRole === "all" ? undefined : debouncedRole,
        },
      }),
    select: useCallback((data: UsersQueryResponse) => {
      return data.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        permissions: user.permmisions,
        canEdit: user.canEdit,
        status: user.status,
        title: user.title,
        createdAt: user.createdAt,
        projects: user.projects,
      }));
    }, []),
  });

  useEffect(() => {
    if (users) {
      setUserCount(users.length);
    }
  }, [users]);

  const handleAssignProject = (userId: string) => {
    if (!users) return;
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUser(user);
      setIsAssignProjectOpen(true);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (!users) return;
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUser(user);
      setIsDeleteUserOpen(true);
    }
  };

  const handleEditUserRolesPermissions = (userId: string) => {
    if (!users) return;
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUser(user);
      setIsEditUserRolesPermissionsOpen(true);
    }
  };

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
          {isEditUserRolesPermissionsOpen && (
            <EditUserRolesPermissionsDialog
              isEditUserRolesPermissionsOpen={isEditUserRolesPermissionsOpen}
              setIsEditUserRolesPermissionsOpen={
                setIsEditUserRolesPermissionsOpen
              }
              user={user}
            />
          )}
          <DeleteUserDialog
            isDeleteUserOpen={isDeleteUserOpen}
            setIsDeleteUserOpen={setIsDeleteUserOpen}
            user={user}
          />

          {isAssignProjectOpen && (
            <AssignProjectToUserDialog
              isAssignProjectOpen={isAssignProjectOpen}
              setIsAssignProjectOpen={setIsAssignProjectOpen}
              user={user}
            />
          )}
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
                  <SelectTrigger className="w-full capitalize sm:w-48">
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
                        {formatCamelCaseToText(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

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
                <TableBody>
                  {isFetching && !users && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        <div className="flex h-full w-full items-center justify-center p-8">
                          <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {!isFetching && !users?.length && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        <Empty>
                          <EmptyHeader>
                            <EmptyMedia variant="icon">
                              <CircleSlash color="#4a5565 " />
                            </EmptyMedia>
                            <EmptyTitle>No data</EmptyTitle>
                            <EmptyDescription>No data found</EmptyDescription>
                          </EmptyHeader>
                          <EmptyContent></EmptyContent>
                        </Empty>
                      </TableCell>
                    </TableRow>
                  )}
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                            <span className="text-sm font-medium text-blue-600">
                              {user.name
                                .split(" ")
                                .map((n) => n[0].toUpperCase())
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
                          {formatCamelCaseToText(user.role).toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.permissions || <p className="text-center">-</p>}
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
                          {user.projects?.slice(0, 2)?.map((project) => (
                            <span
                              key={project.id}
                              className="mr-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 capitalize"
                            >
                              {project.name}
                            </span>
                          ))}
                          {user.projects?.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{user.projects.length - 2} more
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
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
                              {user?.role !== UserRolesEnum.SUPER_ADMIN &&
                                user.email !== currentUser?.email && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleEditUserRolesPermissions(user.id)
                                    }
                                    className="hover:bg-gray-100"
                                  >
                                    <Pencil className="size-4" />
                                    Edit Role
                                  </DropdownMenuItem>
                                )}
                              {user?.role !== UserRolesEnum.SUPER_ADMIN &&
                                user.email !== currentUser?.email && (
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-red-600 hover:bg-red-100 hover:text-red-700"
                                  >
                                    <Trash2 className="size-4 text-red-600 hover:text-red-700" />
                                    <span className="text-red-600 hover:text-red-700">
                                      Delete
                                    </span>
                                  </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Paginator paginator={paginator} setPaginator={setPaginator} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersManagement;

type UsersQueryResponse = {
  total: number;
  users: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    permmisions: UserPermission;
    canEdit: boolean;
    status: UserStatus;
    title: string;
    createdAt: string;
    projects: {
      id: string;
      name: string;
      status: string;
    }[];
  }[];
};
