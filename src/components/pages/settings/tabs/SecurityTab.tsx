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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { editPasswordApi } from "@/api/user/edit-password.api";

const SecurityTab = () => {
  // TODO: Fetch user preferences to 2-factor auth
  // * will the 2-factor auth be sent with the passwords or will they be separate?

  const { toast } = useToast();
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    // twoFactorAuthentication: false,
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
      toast({
        title: "Settings Updated",
        description: `Your password has been updated successfully.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Settings Update Failed",
        description: `Password update failed, please try again.`,
        variant: "destructive",
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
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)}></form>
          <Controller
            name="currentPassword"
            control={control}
            rules={{
              required: "Current password field is required.",
              minLength: {
                value: 8,
                message: "Current password field must be 8 characters or more.",
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
                  <span className="text-sm text-red-500">{error?.message}</span>
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
                  <span className="text-sm text-red-500">{error?.message}</span>
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
                  value === formValues.newPassword || "Passwords do not match.",
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
                  <span className="text-sm text-red-500">{error?.message}</span>
                )}
              </div>
            )}
          />
          {/* <Controller
            name="twoFactorAuthentication"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor={field.name}>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          /> */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2-factor-auth">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">
                Add an extra layer of security
              </p>
            </div>
            <Switch
              id="2-factor-auth"
              name="2-factor-auth"
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex w-32 justify-center self-end bg-blue-600 hover:bg-blue-700 disabled:bg-blue-100"
          >
            {isSubmitting ? (
              <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
            ) : (
              <>Update Security</>
            )}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SecurityTab;
