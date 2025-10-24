import { type Dispatch, type SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UserRolesPermissionsForm from "../forms/UserRolesPermissionsForm";
import type { User } from "@/types/interfaces";

type Props = {
  user: User;
  onSuccess: () => void;
  isEditUserRolesPermissionsOpen: boolean;
  setIsEditUserRolesPermissionsOpen: Dispatch<SetStateAction<boolean>>;
};

const EditUserRolesPermissionsDialog = ({
  user,
  onSuccess,
  isEditUserRolesPermissionsOpen,
  setIsEditUserRolesPermissionsOpen,
}: Props) => {
  return (
    <Dialog
      open={isEditUserRolesPermissionsOpen}
      onOpenChange={setIsEditUserRolesPermissionsOpen}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User Role and Permissions</DialogTitle>
          <DialogDescription>
            Modify role permissions and access levels
          </DialogDescription>
        </DialogHeader>
        <UserRolesPermissionsForm
          user={user}
          onSuccess={onSuccess}
          setIsEditUserRolesPermissionsOpen={setIsEditUserRolesPermissionsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserRolesPermissionsDialog;
