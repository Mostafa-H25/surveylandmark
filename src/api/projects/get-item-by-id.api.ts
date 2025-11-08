import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function getItemByIdApi(projectId: string, memberId: string) {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_ITEM(projectId, memberId),
  );

  return response.data;
}
