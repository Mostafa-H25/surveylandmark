import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type ForgotPasswordArgs = {
  email: string;
};
export async function forgotPasswordApi(data: ForgotPasswordArgs) {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post(
    API_PATHS.USER.FORGOT_PASSWORD,
    data,
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}
