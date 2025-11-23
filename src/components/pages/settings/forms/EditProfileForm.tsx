import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Controller,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { FormUser } from "@/types/interfaces";
import { cn } from "@/lib/utils";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { phonePattern } from "@/constants/regex";
import { editProfileApi } from "@/api/user/edit-profile.api";
import { useQueryClient } from "@tanstack/react-query";

const ME_QUERY_KEY = "me";

type Props = {
  setIsUpdateProfileOpen: Dispatch<SetStateAction<boolean>>;
};

const EditProfileForm = ({ setIsUpdateProfileOpen }: Props) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useFormContext<FormUser>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormUser> = async (data) => {
    setIsSubmitting(true);
    try {
      await editProfileApi(data);
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
      toast.success("Profile Updated", {
        description: `${data.name} has been added successfully.`,
        richColors: true,
      });

      setIsUpdateProfileOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Profile Update Failed", {
        description: "User invitation failed, please try again.",
        richColors: true,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Name field is required.",
          validate: {
            isEmpty: (value) => validateEmptyAfterTrim(value, "Full name"),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="space-y-2">
              <Label htmlFor={field.name}>Full Name</Label>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your full name"
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
        name="phone"
        control={control}
        rules={{
          required: "Phone Number field is required.",
          pattern: {
            value: phonePattern,
            message: "This is not a valid phone number.",
          },
          validate: {
            isEmpty: (value) => validateEmptyAfterTrim(value, "Phone Number"),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="space-y-2">
              <Label htmlFor={field.name}>Phone</Label>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your phone number"
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
        name="location"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="space-y-2">
              <Label htmlFor={field.name}>Location</Label>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your location"
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
        name="department"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="space-y-2">
              <Label htmlFor={field.name}>Department</Label>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your department"
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

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => setIsUpdateProfileOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex w-32 cursor-pointer justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-100"
        >
          {isSubmitting ? (
            <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
          ) : (
            <span>Save Changes</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
