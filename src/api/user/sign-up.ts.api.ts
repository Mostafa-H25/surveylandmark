import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type Signup = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export async function signupApi(data: Signup, token: string) {
  const axiosInstance = getAxiosInstance();
  await axiosInstance.post(API_PATHS.USER.SIGN_UP(token), data, {
    headers: { "Content-Type": "application/json" },
  });
}
