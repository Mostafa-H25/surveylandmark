import { API_PATHS } from "@/constants/api-routes";
import { ItemTabsEnum } from "@/constants/defaults";
import { getAxiosInstance } from "@/lib/api-client";

export async function getItemByIdApi(
  projectId: string,
  itemId: string,
  section: string,
) {
  const sendParams = section !== ItemTabsEnum.OVERVIEW;
  const params = sendParams ? { type: section } : {};
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_ITEM(projectId, itemId),
    { params },
  );

  return response.data;
}
