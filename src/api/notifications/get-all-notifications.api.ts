import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function getAllNotificationsApi() {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(API_PATHS.NOTIFICATIONS.GET_ALL);

  return response.data;
}
