import { useState } from "react";

import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileForm from "../forms/EditProfileForm";
import { FormProvider, useForm } from "react-hook-form";
import type { FormUser, UserProfile } from "@/types/interfaces";

type Props = {
  user: UserProfile | null;
};

const EditProfileSettingsDialog = ({ user }: Props) => {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  const defaultValues: FormUser = {
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    department: user?.department || "",
  };
  const form = useForm({ defaultValues, mode: "onBlur" });

  const handleEditProfile = () => setIsUpdateProfileOpen(true);

  return (
    <Dialog open={isUpdateProfileOpen} onOpenChange={setIsUpdateProfileOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleEditProfile}
          className="w-32 cursor-pointer self-end bg-blue-600 hover:bg-blue-700"
        >
          <SquarePen className="size-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <EditProfileForm setIsUpdateProfileOpen={setIsUpdateProfileOpen} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileSettingsDialog;
