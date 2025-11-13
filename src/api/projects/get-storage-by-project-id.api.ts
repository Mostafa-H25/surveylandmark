import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function getStorageByProjectIdApi(
  projectId: string,
  // department: DepartmentType,
) {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_STORAGE(projectId),
  );

  return response.data;
}
