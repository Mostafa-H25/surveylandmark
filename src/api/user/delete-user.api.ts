import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function deleteUserApi(userId: string) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  await axiosInstance.delete(API_PATHS.USER.DELETE + `/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
