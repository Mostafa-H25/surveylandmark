import { toast } from "sonner";

export const defaultErrorToast = (message: string) => {
  toast.error("Error", {
    description: message || "An error occurred. Please try again!",
    richColors: true,
  });
};
