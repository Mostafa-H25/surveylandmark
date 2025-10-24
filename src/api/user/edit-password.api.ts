import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type Args = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export async function editPasswordApi(data: Args) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  await axiosInstance.patch(API_PATHS.USER.PROFILE.UPDATE_PASSWORD, data, {
    headers: { "Content-Type": "application/json" },
  });
}
