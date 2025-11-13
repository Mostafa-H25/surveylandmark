import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type Filters = {
  buildingId?: string;
  floorId?: string;
  unitId?: string;
};

const defaultFilters: Filters = {
  buildingId: undefined,
  floorId: undefined,
  unitId: undefined,
};

export async function getDepartmentsByProjectIdApi(
  id: string,
  filters: Filters = defaultFilters,
) {
  const encodedParams = new URLSearchParams();
  Object.entries(filters).forEach(([Key, value]) => {
    if (value) encodedParams.append(Key, value);
  });

  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_DEPARTMENT_GENERAL(id),
    { params: encodedParams },
  );

  return response.data;
}
