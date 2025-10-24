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
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { inviteUserApi } from "@/api/user/invite-user.api";

const AddUserDialog = () => {
  const { toast } = useToast();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    role: UserRolesEnum.MEMBER,
  };
  const form = useForm({ defaultValues, mode: "onBlur" });

  const handleAddUser = () => {
    setIsAddUserOpen(true);
  };

  const handleSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    setIsSubmitting(true);

    try {
      await inviteUserApi(data);
      toast({
        title: "User Invited",
        description: `User ${data.name} has been invited successfully.`,
      });
      setIsAddUserOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "User Invite Failed",
        description: "User invitation failed, please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
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
        <FormProvider {...form}>
          <UserForm
            setUserFormOpen={setIsAddUserOpen}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
