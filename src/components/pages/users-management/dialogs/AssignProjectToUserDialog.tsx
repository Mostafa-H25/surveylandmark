import { availableProjectsData } from "@/assets/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  isAssignProjectOpen: boolean;
  setIsAssignProjectOpen: Dispatch<SetStateAction<boolean>>;
};

const AssignProjectToUserDialog = ({
  isAssignProjectOpen,
  setIsAssignProjectOpen,
}: Props) => {
  const { toast } = useToast();

  const handleAssignProjectsToUser = () => {
    toast({
      title: "Projects Assigned",
      description: "Projects have been assigned to the user",
    });
    setIsAssignProjectOpen(false);
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
              {availableProjectsData.map((project) => (
                <div key={project} className="flex items-center space-x-2">
                  <input type="checkbox" id={project} />
                  <label htmlFor={project} className="text-sm">
                    {project}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAssignProjectOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAssignProjectsToUser}>
              Assign Projects
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignProjectToUserDialog;
