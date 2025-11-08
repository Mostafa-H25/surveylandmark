import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function getFloorsByBuildingIdApi(
  projectId: string,
  buildingId: string,
) {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_ALL_FLOORS(projectId, buildingId),
  );

  return response.data;
}
