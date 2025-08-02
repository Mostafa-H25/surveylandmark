import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  isDeleteUserOpen: boolean;
  setIsDeleteUserOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteUserDialog = ({ isDeleteUserOpen, setIsDeleteUserOpen }: Props) => {
  const { toast } = useToast();

  const handleConfirmDelete = () => {
    toast({
      title: "User Deleted",
      description: `User has been deleted successfully`,
      variant: "destructive",
    });
    setIsDeleteUserOpen(false);
  };

  return (
    <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            className="text-white"
          >
            Delete User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
