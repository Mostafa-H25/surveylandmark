import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type LoginArgs = {
  email: string;
  password: string;
  // keepAlive: boolean;
};
export async function loginApi(data: LoginArgs) {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post(
    API_PATHS.USER.LOGIN,
    { email: data.email, password: data.password },
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}
