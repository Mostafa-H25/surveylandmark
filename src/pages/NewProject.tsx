import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import FileUploadSection from "@/components/pages/new-project/FileUploadSection";
import ProjectInformation from "@/components/pages/new-project/ProjectInformation";
import { toast } from "sonner";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addProjectApi } from "@/api/projects/add-project.api";
import { PROJECT_STATUS_ENUM } from "@/constants/defaults";

const PROJECT_MUTATION_SCOPE = "project_creation";

const NewProject = () => {
  const navigate = useNavigate();
  const defaultValues = {
    name: "",
    client: "",
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
    onSuccess: (data) => {
      toast.success("Project Added", {
        description: `${data.name} has been added successfully.`,
        richColors: true,
      });
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error", {
        description: "An error occurred. Please try again!",
        richColors: true,
      });
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
              onClick={() => navigate("/dashboard")}
              className="rounded-md p-1 hover:bg-gray-100"
            >
              <ArrowLeft className="size-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Create New Project
            </h1>
          </div>
        </header>
        <FileUploadSection />
        <ProjectInformation />

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            onClick={() => navigate("/dashboard")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="w-32 bg-blue-600 hover:bg-blue-700"
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
