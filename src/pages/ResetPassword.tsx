import { resetPasswordApi } from "@/api/auth/reset-password.api";
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
import { Eye, EyeClosed, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const defaultValues = {
    forgetCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    setIsLoading(true);
    try {
      await resetPasswordApi({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        forgetCode: data.forgetCode,
      });
      reset();
      toast.success("Password Updated", {
        description: "Password updated successfully!",
        richColors: true,
      });
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      console.error(error);
      toast.error("Reset Password Failed", {
        description: (error as Error)?.message || "Invalid email or password",
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
              name="forgetCode"
              control={control}
              rules={{
                required: "Code field is required.",

                validate: {
                  isEmpty: (value) => validateEmptyAfterTrim(value, "Code"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>
                      <span>Code&nbsp;</span>
                      <sup>
                        <MessageCircleQuestion className="peer inline-flex size-3 cursor-pointer text-gray-500" />
                        <span className="invisible rounded bg-black/5 px-2 py-1 text-xs italic peer-hover:visible">
                          * Check email for reset code.
                        </span>
                      </sup>
                    </Label>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Enter sent code"
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
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password field is required.",
                minLength: {
                  value: 8,
                  message: "Password field must be 8 characters or more.",
                },
                validate: {
                  isEmpty: (value) => validateEmptyAfterTrim(value, "Password"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Password</Label>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className={cn("border", { "border-red-500": error })}
                        required
                      />
                      <div
                        onMouseUp={() => setPasswordIsVisible(false)}
                        onMouseDown={() => setPasswordIsVisible(true)}
                        className="absolute top-1/2 right-3 size-5 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      >
                        {isPasswordVisible ? <Eye /> : <EyeClosed />}
                      </div>
                    </div>
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
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password field is required.",
                minLength: {
                  value: 8,
                  message: "Password field must be 8 characters or more.",
                },
                validate: {
                  isPassword: (value, formValues) =>
                    value === formValues.password || "Passwords do not match.",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Confirm Password</Label>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className={cn("border", { "border-red-500": error })}
                        required
                      />
                      <div
                        onMouseUp={() => setIsConfirmPasswordVisible(false)}
                        onMouseDown={() => setIsConfirmPasswordVisible(true)}
                        className="absolute top-1/2 right-3 size-5 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      >
                        {isConfirmPasswordVisible ? <Eye /> : <EyeClosed />}
                      </div>
                    </div>
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
                <span>Reset</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
