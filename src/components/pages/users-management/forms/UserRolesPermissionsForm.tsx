import { type Dispatch, type SetStateAction, useState } from "react";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/interfaces";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { editUserRoleApi } from "@/api/user/edit-user-role";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { userPermissions, userRoles } from "@/constants/defaults";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";

type Props = {
  user: User;
  onSuccess: () => void;
  setIsEditUserRolesPermissionsOpen: Dispatch<SetStateAction<boolean>>;
};

const UserRolesPermissionsForm = ({
  user,
  onSuccess,
  setIsEditUserRolesPermissionsOpen,
}: Props) => {
  const { toast } = useToast();
  const currentUser = useAuthStore((state) => state.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    id: user.id,
    role: user?.role || "",
    permission: user?.permmisions || "",
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    setIsSubmitting(true);
    const { id, ...rest } = data;
    console.log(data);
    try {
      await editUserRoleApi(id, rest);
      toast({
        title: "User Updated",
        description: "User information has been updated successfully",
      });
      onSuccess();
      reset();
      setIsEditUserRolesPermissionsOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "User Update Failed",
        description: "User data update failed, please try again.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={control}
        name="role"
        rules={{
          required: "Role field is required.",
          validate: {
            isEmpty: (value) => validateEmptyAfterTrim(value, "Role"),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div>
              <Label htmlFor={field.name}>Role</Label>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem
                      key={role}
                      value={role}
                      disabled={
                        !isRequiredRoleOrHigher(role, user?.role) ||
                        currentUser?.id === user.id
                      }
                      className="capitalize"
                    >
                      {role.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <span className="text-sm text-red-500">{error?.message}</span>
            )}
          </div>
        )}
      />
      <Controller
        control={control}
        name="permission"
        rules={{
          required: "Permission field is required.",
          validate: {
            isEmpty: (value) => validateEmptyAfterTrim(value, "Permission"),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div>
              <Label htmlFor={field.name}>Access Level</Label>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  {userPermissions.map((permission) => (
                    <SelectItem
                      key={permission}
                      value={permission}
                      disabled={currentUser?.id === user.id}
                      className="capitalize"
                    >
                      {permission.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <span className="text-sm text-red-500">{error?.message}</span>
            )}
          </div>
        )}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsEditUserRolesPermissionsOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="w-20">
          {isSubmitting ? (
            <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
          ) : (
            <>Submit</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserRolesPermissionsForm;
