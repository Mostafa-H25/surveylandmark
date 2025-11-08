import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function getBuildingsByProjectIdApi(id: string) {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_ALL_BUILDINGS(id),
  );

  return response.data;
}
