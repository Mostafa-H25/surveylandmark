import type { Dispatch, SetStateAction } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { userRoles, UserRolesEnum } from "@/constants/defaults";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { emailPattern } from "@/constants/regex";
import { useMutation } from "@tanstack/react-query";
import { inviteUserApi } from "@/api/user/invite-user.api";
import { toast } from "sonner";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";

const USER_MUTATION_SCOPE = "user_invitation";

type Props = {
  setUserInvitationDialogOpen?: Dispatch<SetStateAction<boolean>>;
};

const UserForm = ({ setUserInvitationDialogOpen }: Props) => {
  const user = useAuthStore((state) => state.user);
  const defaultValues = {
    name: "",
    email: "",
    role: UserRolesEnum.MEMBER,
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation<void, Error, typeof defaultValues>({
    mutationFn: (data) => inviteUserApi(data),
    scope: { id: USER_MUTATION_SCOPE },
    onSuccess: (_data, variables) => {
      toast.success("User Invited", {
        description: `User ${variables.name} has been invited successfully.`,
        richColors: true,
      });
      setUserInvitationDialogOpen?.(false);
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("User Invite Failed", {
        description:
          error.message || "User invitation failed, please try again.",
        richColors: true,
      });
    },
  });
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Name field is required.",
          validate: {
            isEmpty: (value) => validateEmptyAfterTrim(value, "Name"),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div>
              <Label htmlFor={field.name}>Full Name</Label>
              <Input
                {...field}
                id={field.name}
                placeholder="Enter full name"
                className={cn("border", { "border-red-500": error })}
                required
              />
            </div>
            {error && (
              <span className="text-sm text-red-500">{error?.message}</span>
            )}
          </div>
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email field is required.",
          pattern: {
            value: emailPattern,
            message: "This is not a valid email.",
          },
          validate: {
            isEmpty: (value) => validateEmptyAfterTrim(value, "Email"),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="Enter email address"
                className={cn("border", { "border-red-500": error })}
                required
              />
            </div>
            {error && (
              <span className="text-sm text-red-500">{error?.message}</span>
            )}
          </div>
        )}
      />
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
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => {
                    if (
                      user?.role !== UserRolesEnum.SUPER_ADMIN &&
                      role === UserRolesEnum.SUPER_ADMIN
                    )
                      return null;

                    return (
                      <SelectItem
                        key={role}
                        value={role}
                        className="capitalize"
                      >
                        {formatCamelCaseToText(role)}
                      </SelectItem>
                    );
                  })}
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
        {setUserInvitationDialogOpen && (
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => setUserInvitationDialogOpen(false)}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className={`${setUserInvitationDialogOpen ? "w-32" : "w-full"} cursor-pointer`}
        >
          {isPending ? (
            <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
          ) : (
            <span>Send Invitation</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
