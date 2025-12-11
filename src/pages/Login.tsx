import { Eye, EyeClosed } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailPattern } from "@/constants/regex";
import { parseBoolean } from "@/helpers/parseBoolean";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginApi } from "@/api/auth/login.api";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";

const Login = () => {
  const navigate = useNavigate();
  const { token, isLoading, setToken, setIsLoading } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);

  const keepAlive = parseBoolean(localStorage.getItem("keepAlive")) ?? false;
  const defaultValues = {
    email: "",
    password: "",
    keepAlive,
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    setIsLoading(true);
    try {
      const result = await loginApi({
        email: data.email,
        password: data.password,
      });
      setToken(result.token);
      reset();
      toast.success("Login Successful", {
        description: "Welcome back!",
        richColors: true,
      });
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
      toast.error("Login Failed", {
        description: (error as Error)?.message || "Invalid email or password",
        richColors: true,
      });
    }

    setIsLoading(false);
  };

  if (token) return <Navigate to={ROUTES.DASHBOARD} replace />;

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
        <CardContent className="flex w-full flex-col items-center gap-4 px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
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
            <Button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="w-full text-center text-sm text-blue-600"
          >
            Forgot Password?
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
