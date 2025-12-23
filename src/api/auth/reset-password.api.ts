import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type ResetPasswordArgs = {
  email: string;
  password: string;
  confirmPassword: string;
  forgetCode: string;
};
export async function resetPasswordApi(data: ResetPasswordArgs) {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.patch(
    API_PATHS.USER.RESET_PASSWORD,
    data,
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}
