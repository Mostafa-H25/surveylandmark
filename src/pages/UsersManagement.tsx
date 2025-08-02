import { useState } from "react";

import { usersData } from "@/assets/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTab from "@/components/pages/users-management/tabs/UsersTab";
import PermissionsTab from "@/components/pages/users-management/tabs/PermissionsTab";
import AddUserDialog from "@/components/pages/users-management/dialogs/AddUserDialog";
import EditUserDialog from "@/components/pages/users-management/dialogs/EditUserDialog";
import { userManagementTabs, UserRolesEnum } from "@/constants/defaults";
import DeleteUserDialog from "@/components/pages/users-management/dialogs/DeleteUserDialog";
import AssignProjectToUserDialog from "@/components/pages/users-management/dialogs/AssignProjectToUserDialog";
import EditUserPermissionsDialog from "@/components/pages/users-management/dialogs/EditUserPermissionsDialog";

import { type UserRole } from "../contexts/AuthContext";

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

const UsersManagement = () => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);
  const [isEditPermissionsOpen, setIsEditPermissionsOpen] = useState(false);
  // const [isSystemSettingsOpen, setIsSystemSettingsOpen] = useState(false);
  const [, setSelectedUserId] = useState<string>("");
  const [, setSelectedPermissionId] = useState<number>(0);
  // const [, setSelectedSettingId] = useState<number>(0);

  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: UserRolesEnum.MEMBER,
    financialLimit: "",
  });

  const [users] = useState<User[]>(usersData);

  const handleEditUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setEditUser({
        name: user.name,
        email: user.email,
        role: user.role,
        financialLimit: user.financialLimit?.toString() || "",
      });
    }
    setSelectedUserId(userId);
    setIsEditUserOpen(true);
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

      <EditUserDialog
        isEditUserOpen={isEditUserOpen}
        setIsEditUserOpen={setIsEditUserOpen}
        editUser={editUser}
        setEditUser={setEditUser}
      />
      <DeleteUserDialog
        isDeleteUserOpen={isDeleteUserOpen}
        setIsDeleteUserOpen={setIsDeleteUserOpen}
      />

      <AssignProjectToUserDialog
        isAssignProjectOpen={isAssignProjectOpen}
        setIsAssignProjectOpen={setIsAssignProjectOpen}
      />

      <EditUserPermissionsDialog
        isEditPermissionsOpen={isEditPermissionsOpen}
        setIsEditPermissionsOpen={setIsEditPermissionsOpen}
      />

      {/* <SystemSettingsDialog
        isSystemSettingsOpen={isSystemSettingsOpen}
        setIsSystemSettingsOpen={setIsSystemSettingsOpen}
      /> */}

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {userManagementTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab.replaceAll("_", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <UsersTab
          users={users}
          setSelectedUserId={setSelectedUserId}
          setIsAssignProjectOpen={setIsAssignProjectOpen}
          setIsDeleteUserOpen={setIsDeleteUserOpen}
          handleEditUser={handleEditUser}
        />
        {/* <RolesTab
          users={users}
          setSelectedUserId={setSelectedUserId}
          setIsAssignProjectOpen={setIsAssignProjectOpen}
          handleEditUser={handleEditUser}
        /> */}
        <PermissionsTab
          setSelectedPermissionId={setSelectedPermissionId}
          setIsEditPermissionsOpen={setIsEditPermissionsOpen}
        />
        {/* <SystemTab
          setSelectedSettingId={setSelectedSettingId}
          setIsSystemSettingsOpen={setIsSystemSettingsOpen}
        /> */}
      </Tabs>
    </div>
  );
};

export default UsersManagement;
