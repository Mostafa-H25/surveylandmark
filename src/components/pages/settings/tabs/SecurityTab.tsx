import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { editPasswordApi } from "@/api/user/edit-password.api";

const SecurityTab = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await editPasswordApi(data);
      reset();
      toast.success("Settings Updated", {
        description: `Your password has been updated successfully.`,
        richColors: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("Settings Update Failed", {
        description: `Password update failed, please try again.`,
        richColors: true,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <TabsContent value="security" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5 text-blue-600" />
            Security
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="currentPassword"
              control={control}
              rules={{
                required: "Current password field is required.",
                minLength: {
                  value: 8,
                  message:
                    "Current password field must be 8 characters or more.",
                },
                validate: {
                  isEmpty: (value) =>
                    validateEmptyAfterTrim(value, "Current password"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Current Password</Label>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="Enter your password"
                      className={cn("border", { "border-red-500": error })}
                      required
                    />
                  </div>
                  {error && (
                    <span className="text-sm text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "New password field is required.",
                minLength: {
                  value: 8,
                  message: "New password field must be 8 characters or more.",
                },
                validate: {
                  isEmpty: (value) =>
                    validateEmptyAfterTrim(value, "New password"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>New Password</Label>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="Enter your new password"
                      className={cn("border", { "border-red-500": error })}
                      required
                    />
                  </div>
                  {error && (
                    <span className="text-sm text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="confirmNewPassword"
              control={control}
              rules={{
                required: "Confirm new password field is required.",
                minLength: {
                  value: 8,
                  message:
                    "Confirm new password field must be 8 characters or more.",
                },
                validate: {
                  isPassword: (value, formValues) =>
                    value === formValues.newPassword ||
                    "Passwords do not match.",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Confirm new password</Label>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="Enter your new password"
                      className={cn("border", { "border-red-500": error })}
                      required
                    />
                  </div>
                  {error && (
                    <span className="text-sm text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex w-32 cursor-pointer justify-center self-end bg-blue-600 hover:bg-blue-700 disabled:bg-blue-100"
            >
              {isSubmitting ? (
                <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              ) : (
                <span>Update Security</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SecurityTab;
