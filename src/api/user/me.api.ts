import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function meApi() {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  const response = await axiosInstance.get(API_PATHS.USER.ME, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
