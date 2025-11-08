import type { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  isSystemSettingsOpen: boolean;
  setIsSystemSettingsOpen: Dispatch<SetStateAction<boolean>>;
};

const SystemSettingsDialog = ({
  isSystemSettingsOpen,
  setIsSystemSettingsOpen,
}: Props) => {
  return (
    <Dialog open={isSystemSettingsOpen} onOpenChange={setIsSystemSettingsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update System Setting</DialogTitle>
          <DialogDescription>Modify system configuration</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Setting Value</Label>
            <Input placeholder="Enter new value" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Optional description" rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsSystemSettingsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => {
                toast.success("Setting Updated", {
                  description: "System setting has been updated",
                  richColors: true,
                });
                setIsSystemSettingsOpen(false);
              }}
            >
              Update Setting
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SystemSettingsDialog;
