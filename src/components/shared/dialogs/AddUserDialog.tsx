import { useState } from "react";

import { Plus } from "lucide-react";

import { toast } from "sonner";
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
import { useMutation } from "@tanstack/react-query";

const USER_MUTATION_SCOPE = "user_invitation";

const AddUserDialog = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const defaultValues = {
    name: "",
    email: "",
    role: UserRolesEnum.MEMBER,
  };
  const form = useForm({ defaultValues, mode: "onBlur" });

  const { mutate, isPending } = useMutation<void, Error, typeof defaultValues>({
    mutationFn: (data) => inviteUserApi(data),
    scope: { id: USER_MUTATION_SCOPE },
    onSuccess: (_data, variables) => {
      toast.success("User Invited", {
        description: `User ${variables.name} has been invited successfully.`,
        richColors: true,
      });
      setIsAddUserOpen(false);
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("User Invite Failed", {
        description: "User invitation failed, please try again.",
        richColors: true,
      });
    },
  });

  const handleAddUser = () => {
    setIsAddUserOpen(true);
  };

  const handleSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    mutate(data);
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
            isSubmitting={isPending}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
