import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import FileUploadSection from "@/components/pages/new-project/FileUploadSection";
import ProjectInformation from "@/components/pages/new-project/ProjectInformation";
import { toast } from "sonner";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addProjectApi } from "@/api/projects/add-project.api";
import { PROJECT_STATUS_ENUM } from "@/constants/defaults";
import { defaultErrorToast } from "@/helpers/defaultErrorToast";
import { ROUTES } from "@/constants/routes";

const PROJECT_MUTATION_SCOPE = "project_creation";

const NewProject = () => {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const clientIdFromUrl = urlSearchParams.get("client") || "";
  const defaultValues = {
    name: "",
    client: clientIdFromUrl,
    status: PROJECT_STATUS_ENUM.PLANNING,
    description: "",
    totalBudget: 0,
    startDate: "",
    endDate: "",
    file: null as File | null,
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { handleSubmit, reset } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: typeof defaultValues) => addProjectApi(data),
    scope: { id: PROJECT_MUTATION_SCOPE },
    onSuccess: (data, variables) => {
      toast.success("Project Added", {
        description: `${variables.name} has been added successfully.`,
        richColors: true,
      });
      reset();
      navigate(ROUTES.PROJECT(data.projectId));
    },
    onError: (error) => {
      console.error(error);
      defaultErrorToast(error.message);
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <header className="rounded-md border border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="cursor-pointer rounded-md p-1 hover:bg-gray-100"
            >
              <ArrowLeft className="size-5 text-gray-600" />
            </button>
            <h1 className="cursor-pointer text-xl font-semibold text-gray-900">
              Create New Project
            </h1>
          </div>
        </header>
        <FileUploadSection isLoading={isPending} />
        <ProjectInformation />

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="w-32 cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? (
              <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
            ) : (
              <span>Create Project</span>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewProject;
