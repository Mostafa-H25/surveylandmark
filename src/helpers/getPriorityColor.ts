import { MESSAGE_PRIORITY_ENUM } from "@/constants/defaults";

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case MESSAGE_PRIORITY_ENUM.CRITICAL:
      return "bg-red-100 hover:bg-red-50 text-red-700";
    case MESSAGE_PRIORITY_ENUM.HIGH:
      return "bg-orange-100 hover:bg-orange-50 text-orange-700";
    case MESSAGE_PRIORITY_ENUM.NORMAL:
      return "bg-yellow-100 hover:bg-yellow-50 text-yellow-700";
    case MESSAGE_PRIORITY_ENUM.LOW:
      return "bg-green-100 hover:bg-green-50 text-green-700";
  }
};
