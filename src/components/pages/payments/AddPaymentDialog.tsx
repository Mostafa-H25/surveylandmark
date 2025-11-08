import { useCallback, useState } from "react";
import { Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllClientsApi } from "@/api/clients/get-all-clients.api";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { addPaymentApi } from "@/api/payments/add-payment.api";

const CLIENTS_QUERY_KEY = "clients";
const PAYMENTS_QUERY_KEY = "payments";
const ADD_PAYMENT_MUTATION_SCOPE = "payment-creation";

export function AddPaymentDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [projectOptions, setProjectOptions] = useState<
    { id: string; name: string }[] | null
  >(null);

  const defaultValues = {
    clientId: "",
    projectId: "",
    amount: 0,
    dueDate: "",
  };
  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const { data: clients, isFetching } = useQuery({
    queryKey: [CLIENTS_QUERY_KEY],
    queryFn: () => getAllClientsApi(),
    select: useCallback((data: ClientQueryResponse) => {
      return data.data.map((option) => ({
        id: option.client.id,
        name: option.client.name,
        email: option.client.email,
        phone: option.client.phone,
        company: option.client.company,
        joinDate: option.client.joinDate,

        projectsCount: option.projects.count,
        totalBudget: option.projects.totalBudget,

        projects: option.projects.details.map((project) => ({
          id: project.id,
          name: project.name,
          budget: project.budget,
          status: project.status,
          startDate: project.startDate,
          endDate: project.endDate,
        })),
      }));
    }, []),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: typeof defaultValues) => addPaymentApi(data),
    scope: { id: ADD_PAYMENT_MUTATION_SCOPE },
    onSuccess: () => {
      toast.success("Payment Added", {
        description: `Payment has been added successfully.`,
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
      reset();
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error", {
        description: "An error occurred. Please try again!",
        richColors: true,
      });
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
          <DollarSign className="mr-2 size-4" />
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
          <DialogDescription>
            Create a new payment entry for tracking client payments and project
            deadlines.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Controller
              name="clientId"
              control={control}
              rules={{ required: "Client field is required." }}
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
                      onValueChange={(value) => {
                        if (!clients) return;
                        field.onChange(value);
                        const projects =
                          clients
                            .find((client) => client.id === value)
                            ?.projects.map((project) => ({
                              id: project.id,
                              name: project.name,
                            })) ?? [];
                        setProjectOptions(projects);
                      }}
                    >
                      <SelectTrigger id={field.name} className="capitalize">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {isFetching && !clients && (
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
                    <span className="text-xs text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="projectId"
              control={control}
              rules={{ required: "Project field is required." }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project
                    </Label>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id={field.name} className="capitalize">
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                      <SelectContent>
                        {isFetching && !clients && (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                          </div>
                        )}
                        {!projectOptions && (
                          <p className="flex h-8 items-center justify-center text-xs text-gray-600">
                            Please select client to display project options.
                          </p>
                        )}
                        {!projectOptions?.length && (
                          <p className="flex h-8 items-center justify-center text-xs text-gray-600">
                            Client doesn't have projects.
                          </p>
                        )}
                        {projectOptions?.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={project.id.toString()}
                            className="capitalize"
                          >
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {error && (
                    <span className="text-xs text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="amount"
              control={control}
              rules={{ required: "Payment amount field is required." }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payment Amount
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter payment amount"
                        className={cn("m-0 border pl-10", {
                          "border-red-500": error,
                        })}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  {error && (
                    <span className="text-xs text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="dueDate"
              control={control}
              rules={{
                required: "Due date field is required.",
                validate: {
                  isEmpty: (value) => validateEmptyAfterTrim(value, "Due date"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Due Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter payment date"
                        type="date"
                        className={cn("m-0 border pl-10", {
                          "border-red-500": error,
                        })}
                        required
                      />
                    </div>
                  </div>
                  {error && (
                    <span className="text-xs text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="w-32 cursor-pointer bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? (
                <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              ) : (
                <span>Add Payment</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
