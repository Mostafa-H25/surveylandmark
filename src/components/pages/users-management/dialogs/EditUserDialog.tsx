import type { Dispatch, SetStateAction } from "react";

import { useToast } from "@/hooks/use-toast";
import { type UserRole } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UserForm from "../forms/UserForm";

type User = {
  name: string;
  email: string;
  role: UserRole;
  financialLimit: string;
};
type Props = {
  isEditUserOpen: boolean;
  setIsEditUserOpen: Dispatch<SetStateAction<boolean>>;
  editUser: User;
  setEditUser: Dispatch<SetStateAction<User>>;
};

const EditUserDialog = ({
  isEditUserOpen,
  setIsEditUserOpen,
  editUser,
  setEditUser,
}: Props) => {
  const { toast } = useToast();

  const handleSubmitEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "User Updated",
      description: "User information has been updated successfully",
    });
    setIsEditUserOpen(false);
    setEditUser({ name: "", email: "", role: "member", financialLimit: "" });
  };

  return (
    <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information and role
          </DialogDescription>
        </DialogHeader>
        <UserForm
          user={editUser}
          setUser={setEditUser}
          setUserFormOpen={setIsEditUserOpen}
          handleSubmit={handleSubmitEditUser}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
