import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, isLoading } = useAuth();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-4 px-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <Building2 className="h-8 w-8 text-white" />
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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col px-8">
          <p className="w-full text-center text-base text-gray-600">
            <span>Don't have an account?&nbsp;</span>
            <Link
              to="/sign-up"
              className="text-blue-600 underline-offset-2 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <div className="mt-6 rounded-lg bg-gray-50">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Demo Accounts:
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <strong>Super Admin:</strong> superadmin@landmark.com
              </p>
              <p>
                <strong>Admin:</strong> admin@landmark.com
              </p>
              <p>
                <strong>Member:</strong> member@landmark.com
              </p>
              <p>
                <strong>Password:</strong> password123
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
