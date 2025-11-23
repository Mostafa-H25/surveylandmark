import { type Dispatch, type SetStateAction } from "react";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/interfaces";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { editUserRoleApi } from "@/api/user/edit-user-role.api";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { userRoles } from "@/constants/defaults";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultErrorToast } from "@/helpers/defaultErrorToast";

const UPDATE_USER_ROLE_MUTATION_KEY = "update-user-role";
const USERS_QUERY_KEY = "users";

type Props = {
  user: User;
  setIsEditUserRolesPermissionsOpen: Dispatch<SetStateAction<boolean>>;
};

const UserRolesPermissionsForm = ({
  user,
  setIsEditUserRolesPermissionsOpen,
}: Props) => {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);

  const defaultValues = {
    role: user?.role || "",
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: typeof defaultValues) => editUserRoleApi(data, user.id),
    scope: { id: UPDATE_USER_ROLE_MUTATION_KEY },
    onSuccess: () => {
      toast.success("User's role updated.", {
        description: `${user.name} role has been updated successfully.`,
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      setIsEditUserRolesPermissionsOpen(false);
      reset();
    },
    onError: (error) => {
      console.error(error);
      defaultErrorToast(error.message);
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    mutate(data);
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
                        !isRequiredRoleOrHigher(role, currentUser?.role) ||
                        currentUser?.email === user.email
                      }
                      className="capitalize"
                    >
                      {formatCamelCaseToText(role)}
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
          className="cursor-pointer"
          onClick={() => setIsEditUserRolesPermissionsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="w-20 cursor-pointer"
        >
          {isPending ? (
            <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserRolesPermissionsForm;
