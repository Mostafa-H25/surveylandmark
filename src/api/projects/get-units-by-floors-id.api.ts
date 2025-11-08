import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function getUnitsByFloorIdApi(
  projectId: string,
  buildingId: string,
  floorId: string,
) {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_ALL_UNITS(projectId, buildingId, floorId),
  );

  return response.data;
}
