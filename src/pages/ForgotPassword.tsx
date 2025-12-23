import { forgotPasswordApi } from "@/api/auth/forgot-password.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailPattern } from "@/constants/regex";
import { ROUTES } from "@/constants/routes";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    email: "",
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    setIsLoading(true);
    try {
      await forgotPasswordApi({ email: data.email });
      reset();
      toast.success("Email Sent", {
        description: "Please check your email to reset your password!",
        richColors: true,
      });
      navigate(ROUTES.RESET_PASSWORD);
    } catch (error) {
      console.error(error);
      toast.error("Reset Failed", {
        description: (error as Error)?.message || "Invalid email",
        richColors: true,
      });
    }

    setIsLoading(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-4 px-8 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-blue-600/20">
            <img
              src="/landmark-icon.jpg"
              alt="logo"
              className="size-full rounded-full object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-3xl text-gray-900">
              Forgot Password
            </CardTitle>
          </div>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Controller
              name="email"
              control={control}
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
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="Enter your email"
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
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
