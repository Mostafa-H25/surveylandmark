import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";
import type { FormUser } from "@/types/interfaces";

export async function editProfileApi(data: FormUser) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  await axiosInstance.patch(API_PATHS.USER.PROFILE.UPDATE, data, {
    headers: { "Content-Type": "application/json" },
  });
}
