import { useState } from "react";

import { Plus } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { UserRolesEnum } from "@/constants/defaults";

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
  const { toast } = useToast();

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: UserRolesEnum.MEMBER,
    financialLimit: "",
  });

  const handleAddUser = () => {
    setIsAddUserOpen(true);
  };

  const handleSubmitNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "User Created",
      description: `User ${newUser.name} has been created successfully`,
    });
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "member",
      financialLimit: "",
    });
  };

  return (
    <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleAddUser}
          className="bg-blue-600 font-semibold text-white hover:bg-blue-700"
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
        <UserForm
          user={newUser}
          setUser={setNewUser}
          setUserFormOpen={setIsAddUserOpen}
          handleSubmit={handleSubmitNewUser}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
