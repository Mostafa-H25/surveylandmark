import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function logoutApi() {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  await axiosInstance.post(API_PATHS.USER.LOGOUT);
}
