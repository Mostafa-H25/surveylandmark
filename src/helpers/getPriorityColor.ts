export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 hover:bg-red-50 text-red-700";
    case "high":
      return "bg-orange-100 hover:bg-orange-50 text-orange-700";
    case "medium":
      return "bg-yellow-100 hover:bg-yellow-50 text-yellow-700";
    default:
      return "bg-green-100 hover:bg-green-50 text-green-700";
  }
};
