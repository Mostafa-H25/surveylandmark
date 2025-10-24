import type { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { userPermissions } from "@/constants/defaults";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type Props = {
  isEditPermissionsOpen: boolean;
  setIsEditPermissionsOpen: Dispatch<SetStateAction<boolean>>;
};

const EditUserPermissionsDialog = ({
  isEditPermissionsOpen,
  setIsEditPermissionsOpen,
}: Props) => {
  const handlePermissionUpdate = () => {
    toast.success("Permissions Updated", {
      description: "Role permissions have been updated",
      richColors: true,
    });
    setIsEditPermissionsOpen(false);
  };

  return (
    <Dialog
      open={isEditPermissionsOpen}
      onOpenChange={setIsEditPermissionsOpen}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Permissions</DialogTitle>
          <DialogDescription>
            Modify role permissions and access levels
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Access Level</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                {userPermissions.map((permission) => (
                  <SelectItem
                    key={permission}
                    value={permission}
                    className="capitalize"
                  >
                    {permission.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="canEdit" />
            <label htmlFor="canEdit" className="text-sm">
              Can Edit
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditPermissionsOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePermissionUpdate}>Update Permissions</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserPermissionsDialog;
