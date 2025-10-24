import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function editProfileImageApi(data: File) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  const formData = new FormData();
  formData.append("profileImage", data);

  await axiosInstance.patch(API_PATHS.USER.PROFILE.UPDATE_IMG, formData);
}
