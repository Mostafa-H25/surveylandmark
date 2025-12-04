import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function exportProjectByIdApi(id: string) {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(API_PATHS.PROJECTS.EXPORT(id));

  return response.data;
}
