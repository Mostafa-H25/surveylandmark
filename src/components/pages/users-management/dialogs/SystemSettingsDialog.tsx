import type { Dispatch, SetStateAction } from "react";

import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

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
              onClick={() => setIsSystemSettingsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Setting Updated",
                  description: "System setting has been updated",
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
