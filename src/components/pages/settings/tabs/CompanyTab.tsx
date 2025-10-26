import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

import { Building } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getCompanyApi } from "@/api/user/get-company";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { emailPattern, phonePattern } from "@/constants/regex";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { editCompanyApi } from "@/api/user/edit-company";

const CompanyTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    companyName: "",
    email: "",
    phone: "",
    taxId: "",
    address: "",
    website: "",
    registrationNumber: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const fetchCompany = async () => {
    try {
      const result = await getCompanyApi();
      reset({
        companyName: result.data.companyName,
        email: result.data.email,
        phone: formatPhoneNumber(result.data.phone),
        taxId: result.data.taxId,
        address: result.data.address,
        website: result.data.website,
        registrationNumber: result.data.registrationNumber,
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await editCompanyApi(data);
      toast.success("Settings saved", {
        description: `Your company info has been updated successfully.`,
        richColors: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("Settings Update Failed", {
        description: `Company info update failed, please try again.`,
        richColors: true,
      });
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <TabsContent value="company" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="size-5 text-blue-600" />
            Company Information
          </CardTitle>
          <CardDescription>
            Manage your company details and registration information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="companyName"
                control={control}
                rules={{
                  required: "Company name field is required.",
                  validate: {
                    isEmpty: (value) =>
                      validateEmptyAfterTrim(value, "Company name"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Company Name</Label>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Enter your company name"
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
                name="taxId"
                control={control}
                rules={{
                  required: "Tax ID field is required.",
                  validate: {
                    isEmpty: (value) => validateEmptyAfterTrim(value, "Tax ID"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Tax ID</Label>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Enter your tax id"
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
                name="address"
                control={control}
                rules={{
                  required: "Address field is required.",
                  validate: {
                    isEmpty: (value) =>
                      validateEmptyAfterTrim(value, "Address"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Address</Label>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Enter your tax id"
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
                  required: "Phone field is required.",
                  pattern: {
                    value: phonePattern,
                    message: "This is not a valid phone number.",
                  },
                  validate: {
                    isEmpty: (value) => validateEmptyAfterTrim(value, "Phone"),
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
                        placeholder="Enter your phone"
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
                    <div className="space-y-2">
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
                name="website"
                control={control}
                rules={{
                  required: "Website field is required.",

                  validate: {
                    isEmpty: (value) =>
                      validateEmptyAfterTrim(value, "Website"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Website</Label>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
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
                name="registrationNumber"
                control={control}
                rules={{
                  required: "Registration number field is required.",

                  validate: {
                    isEmpty: (value) =>
                      validateEmptyAfterTrim(value, "Registration number"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Registration Number</Label>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Enter your registration number"
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
            </div>
            <Button
              type="submit"
              className="flex w-52 cursor-pointer justify-center self-end bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              ) : (
                <span>Save Company Information</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CompanyTab;
