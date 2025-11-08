import { useState } from "react";

import { Building2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
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

const Registration = () => {
  const token = useAuthStore((state) => state.token);
  const [isLoading] = useState(false);

  const defaultValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<typeof defaultValues> = async () => {
    // if (true) {
    //   toast({
    //     title: "Login successful",
    //     description: "Welcome back!",
    //   });
    // } else {
    //   toast({
    //     title: "Login failed",
    //     description: "Invalid email or password",
    //     variant: "destructive",
    //   });
    // }
  };

  if (token) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-4 px-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blue-600">
            <Building2 className="size-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl text-gray-900">Welcome To</CardTitle>
            <div className="mt-2">
              <h1 className="text-2xl text-blue-600">Survey LANDMARK</h1>
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
                    <Label htmlFor={field.name}>Password</Label>
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
            <Button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col px-8">
          <p className="w-full text-center text-base text-gray-600">
            <span>Already have an account?&nbsp;</span>
            <Link
              to="/sign-in"
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
