import { getAllClientsApi } from "@/api/clients/get-all-clients.api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { projectStatus } from "@/constants/defaults";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";

const CLIENTS_QUERY_KEY = "clients";

const ProjectInformation = () => {
  const { control } = useFormContext();

  const { data: clients, isPending } = useQuery({
    queryKey: [CLIENTS_QUERY_KEY],
    queryFn: () => getAllClientsApi(),
    select: useCallback((data: ClientQueryResponse) => {
      return data.data.map((option) => ({
        id: option.client.id,
        name: option.client.name,
      }));
    }, []),
  });

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-2 text-2xl font-semibold text-gray-900">
        Project Information
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Basic details about the project
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            name="client"
            control={control}
            rules={{
              required: "Client field is required.",
              validate: {
                isEmpty: (value) => validateEmptyAfterTrim(value, "Client"),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Client
                  </Label>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id={field.name} className="capitalize">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {isPending && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                        </div>
                      )}
                      {clients?.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                          className="capitalize"
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {error && (
                  <span className="text-xs text-red-500">{error?.message}</span>
                )}
              </div>
            )}
          />
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
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Name
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="Enter project's name"
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
            name="status"
            control={control}
            rules={{ required: "Status field is required." }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </Label>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id={field.name} className="capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatus.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="capitalize"
                        >
                          {status.replaceAll("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {error && (
                  <span className="text-xs text-red-500">{error?.message}</span>
                )}
              </div>
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          rules={{
            required: "Description field is required.",
            validate: {
              isEmpty: (value) => validateEmptyAfterTrim(value, "Description"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Project description..."
                  rows={6}
                />
              </div>
              {error && (
                <span className="text-xs text-red-500">{error?.message}</span>
              )}
            </div>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            name="totalBudget"
            control={control}
            rules={{
              required: "Total budget field is required.",
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Budget
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    placeholder="0"
                  />
                </div>
                {error && (
                  <span className="text-xs text-red-500">{error?.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: "Start date field is required.",
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </Label>
                  <Input {...field} id={field.name} type="date" />
                </div>
                {error && (
                  <span className="text-xs text-red-500">{error?.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "End date field is required.",
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </Label>
                  <Input {...field} id={field.name} type="date" />
                </div>
                {error && (
                  <span className="text-xs text-red-500">{error?.message}</span>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;

type ClientQueryResponse = {
  message: string;
  success: boolean;
  data: {
    client: {
      id: string;
      name: string;
      email: string;
      phone: string;
      company: string;
      joinDate: string | null;
    };
    projects: {
      count: number;
      totalBudget: number;
      details: {
        id: string;
        name: string;
        budget: number;
        status: string;
        startDate: string | null;
        endDate: string | null;
        projectManager: {
          id: string;
          name: string;
          title: string;
        };
        progressPercentage: number;
      }[];
    };
  }[];
};
