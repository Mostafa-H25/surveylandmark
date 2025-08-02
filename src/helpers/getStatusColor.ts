export const getProjectStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 hover:bg-green-200 text-green-700";
    case "in_progress":
      return "bg-blue-100 hover:bg-blue-200 text-blue-700";
    case "planning":
      return "bg-yellow-100 hover:bg-yellow-200 text-yellow-700";
    case "on_hold":
      return "bg-red-100 hover:bg-red-200 text-red-700";
    default:
      return "bg-gray-100 hover:bg-gray-200 text-gray-700";
  }
};
