import { deleteUserApi } from "@/api/user/delete-user.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { User } from "@/types/interfaces";
import type { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

const USERS_QUERY_KEY = "users";

type Props = {
  user: User;
  isDeleteUserOpen: boolean;
  setIsDeleteUserOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteUserDialog = ({
  user,
  isDeleteUserOpen,
  setIsDeleteUserOpen,
}: Props) => {
  const queryClient = useQueryClient();
  const handleConfirmDelete = async () => {
    try {
      await deleteUserApi(user.id);
      toast.success("User Deleted", {
        description: `User has been deleted successfully`,
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      setIsDeleteUserOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("User Delete Failed", {
        description: `User delete failed, please try again.`,
        richColors: true,
      });
    }
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
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsDeleteUserOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            className="cursor-pointer text-white"
          >
            Delete User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
