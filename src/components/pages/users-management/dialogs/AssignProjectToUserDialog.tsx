import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { User } from "@/types/interfaces";
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllClientsApi } from "@/api/clients/get-all-clients.api";
import { Checkbox } from "@/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { updateAssignedProjectsToUsersApi } from "@/api/user/assign-projects-to-user.api";

const USERS_QUERY_KEY = "users";
const CLIENTS_QUERY_KEY = "clients";
const UPDATE_ASSIGNED_PROJECTS_MUTATION_KEY =
  "update-assigned-projects-to-users";

type Props = {
  user: User;
  isAssignProjectOpen: boolean;
  setIsAssignProjectOpen: Dispatch<SetStateAction<boolean>>;
};

const AssignProjectToUserDialog = ({
  user,
  isAssignProjectOpen,
  setIsAssignProjectOpen,
}: Props) => {
  const queryClient = useQueryClient();
  const initialProjects = user.projects.map((project) => project.id);
  const [selectedProjects, setSelectedProjects] = useState(initialProjects);

  const { data: projects, isFetching } = useQuery({
    queryKey: [CLIENTS_QUERY_KEY],
    queryFn: () => getAllClientsApi(),
    select: useCallback((data: ClientQueryResponse) => {
      return data.data.flatMap((option) =>
        option.projects.details?.map((project) => ({
          id: project.id,
          name: project.name,
        })),
      );
    }, []),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { projectIds: string[] }) =>
      updateAssignedProjectsToUsersApi(data, user.id),
    scope: { id: UPDATE_ASSIGNED_PROJECTS_MUTATION_KEY },
    onSuccess: () => {
      toast.success("User's assigned projects updated.", {
        description: `${user.name} assigned projects has been updated successfully.`,
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      setIsAssignProjectOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error", {
        description: "An error occurred. Please try again!",
        richColors: true,
      });
    },
  });

  const onSelect = (checked: CheckedState, projectId: string) =>
    setSelectedProjects((prev) =>
      checked ? [...prev, projectId] : prev.filter((id) => id !== projectId),
    );

  const handleAssignProjectsToUser = () => {
    mutate({ projectIds: selectedProjects });
  };

  return (
    <Dialog open={isAssignProjectOpen} onOpenChange={setIsAssignProjectOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Project</DialogTitle>
          <DialogDescription>Assign projects to this user</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Available Projects</Label>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {isFetching && !projects && (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                </div>
              )}
              {projects?.map((project) => (
                <div key={project.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={project.id}
                    onCheckedChange={(checked) => onSelect(checked, project.id)}
                    checked={selectedProjects.includes(project.id)}
                  />
                  <Label htmlFor={project.id} className="text-sm capitalize">
                    {project.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsAssignProjectOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAssignProjectsToUser} className="w-32">
              {isPending ? (
                <div className="size-4 animate-spin cursor-pointer rounded-full border-r-2 border-blue-300" />
              ) : (
                <span>Assign Projects</span>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignProjectToUserDialog;

type ClientQueryResponse = {
  message: string;
  success: boolean;
  data: {
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
