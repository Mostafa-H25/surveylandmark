import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function updateAssignedProjectsToUsersApi(
  data: { projectIds: string[] },
  userId: string,
) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  await axiosInstance.patch(API_PATHS.USER.ASSIGN_PROJECTS(userId), data, {
    headers: { "Content-Type": "application/json" },
  });
}
