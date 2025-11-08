import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "../forms/UserForm";

const AddUserDialog = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleAddUser = () => {
    setIsAddUserOpen(true);
  };

  return (
    <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleAddUser}
          className="cursor-pointer bg-blue-600 font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="mr-3 size-5" />
          Invite Team Members
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new user account</DialogDescription>
        </DialogHeader>
        <UserForm setUserInvitationDialogOpen={setIsAddUserOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
