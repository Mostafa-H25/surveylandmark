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
import {
  Controller,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { emailPattern } from "@/constants/regex";
import type { AuthUser } from "@/types/interfaces";

type Props = {
  isSubmitting: boolean;
  onSubmit: SubmitHandler<AuthUser>;
  setUserFormOpen: Dispatch<SetStateAction<boolean>>;
};

const UserForm = ({ isSubmitting, setUserFormOpen, onSubmit }: Props) => {
  const { control, handleSubmit } = useFormContext<AuthUser>();
  const user = useAuthStore((state) => state.user);

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
              <Select {...field}>
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
                        {role.replaceAll("_", " ")}
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
        <Button
          type="button"
          variant="outline"
          onClick={() => setUserFormOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="w-18">
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

export default UserForm;
