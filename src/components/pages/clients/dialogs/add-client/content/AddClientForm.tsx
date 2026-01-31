import { addClientApi } from "@/api/clients/add-client.api";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailPattern, phonePattern } from "@/constants/regex";
import { defaultErrorToast } from "@/helpers/defaultErrorToast";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type Dispatch, type SetStateAction } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ADD_CLIENT_MUTATION_SCOPE = "client-creation";

type Props = { setIsAddClientOpen: Dispatch<SetStateAction<boolean>> };

const AddClientForm = ({ setIsAddClientOpen }: Props) => {
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    company: "",
  };
  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: typeof defaultValues) => addClientApi(data),
    scope: { id: ADD_CLIENT_MUTATION_SCOPE },
    onSuccess: (_, variable) => {
      toast.success("Client Added", {
        description: `${variable.name} from ${variable.company} has been added successfully.`,
        richColors: true,
      });
      reset();
      setIsAddClientOpen(false);
    },
    onError: (error) => {
      console.error(error);
      defaultErrorToast(
        axios.isAxiosError(error)
          ? error?.response?.data?.error
          : error.message,
      );
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    mutate(data);
  };
  const onClose = () => {
    reset();
    setIsAddClientOpen(false);
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogDescription>
          Enter the client information below to create a new client profile.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Name field is required.",
            validate: {
              isEmpty: (value) => validateEmptyAfterTrim(value, "Name"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Full Name</Label>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Enter client's name"
                  className={cn("m-0 border", { "border-red-500": error })}
                  required
                />
              </div>
              {error && (
                <span className="text-xs text-red-500">{error?.message}</span>
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
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Enter client's email"
                  className={cn("m-0 border", { "border-red-500": error })}
                  required
                />
              </div>
              {error && (
                <span className="text-xs text-red-500">{error?.message}</span>
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
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Phone</Label>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Enter client's phone"
                  className={cn("m-0 border", { "border-red-500": error })}
                  required
                />
              </div>
              {error && (
                <span className="text-xs text-red-500">{error?.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name="company"
          control={control}
          rules={{
            required: "Company Name field is required.",
            validate: {
              isEmpty: (value) => validateEmptyAfterTrim(value, "Company Name"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Company Name</Label>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Enter client's company"
                  className={cn("m-0 border", { "border-red-500": error })}
                  required
                />
              </div>
              {error && (
                <span className="text-xs text-red-500">{error?.message}</span>
              )}
            </div>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className={"w-24 cursor-pointer bg-blue-600 hover:bg-blue-700"}
          >
            {isPending ? (
              <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
            ) : (
              <span>Add Client</span>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default AddClientForm;
