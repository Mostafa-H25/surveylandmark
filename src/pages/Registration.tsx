import { useState } from "react";

import { Eye, EyeClosed } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
// import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { emailPattern, phonePattern } from "@/constants/regex";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { signupApi } from "@/api/user/sign-up.ts.api";
import { defaultErrorToast } from "@/helpers/defaultErrorToast";
import { ROUTES } from "@/constants/routes";

const Registration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useAuthStore((state) => state.token);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await signupApi(data, id);
      toast.success("User Created", {
        description: `User account has been created successfully.`,
        richColors: true,
      });
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      console.error(error);
      defaultErrorToast((error as Error).message);
    }
    setIsSubmitting(false);
  };

  if (token) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-4 px-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blue-600">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-blue-600/20">
              <img
                src="/landmark-icon.jpg"
                alt="logo"
                className="size-full rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl text-gray-900">Welcome To</CardTitle>
            <div className="mt-2">
              <h1 className="flex items-center justify-center gap-2 text-2xl text-blue-600">
                <span className="font-bold">LANDMARK</span>
                <span>Projects</span>
              </h1>
              <p className="text-base text-gray-600">
                Precision Surveys, Building tomorrow
              </p>
            </div>
          </div>
          <CardDescription>
            Enter your credentials to access the management system
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Username field is required.",
                validate: {
                  isEmpty: (value) => validateEmptyAfterTrim(value, "Email"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Username</Label>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Enter your username"
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
              name="phone"
              control={control}
              rules={{
                required: "Phone Number field is required.",
                pattern: {
                  value: phonePattern,
                  message: "This is not a valid phone number.",
                },
                validate: {
                  isEmpty: (value) =>
                    validateEmptyAfterTrim(value, "Phone Number"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="space-y-4">
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
                        type={isVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className={cn("border", { "border-red-500": error })}
                        required
                      />
                      <div
                        onMouseUp={() => setIsVisible(false)}
                        onMouseDown={() => setIsVisible(true)}
                        className="absolute top-1/2 right-3 size-5 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      >
                        {isVisible ? <Eye /> : <EyeClosed />}
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
                        type={isVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className={cn("border", { "border-red-500": error })}
                        required
                      />
                      <div
                        onMouseUp={() => setIsVisible(false)}
                        onMouseDown={() => setIsVisible(true)}
                        className="absolute top-1/2 right-3 size-5 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      >
                        {isVisible ? <Eye /> : <EyeClosed />}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col px-8">
          <p className="w-full text-center text-base text-gray-600">
            <span>Already have an account?&nbsp;</span>
            <Link
              to={ROUTES.SIGN_IN}
              className="text-blue-600 underline-offset-2 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Registration;
