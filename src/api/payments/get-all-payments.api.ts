import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

export async function getAllPaymentsApi() {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(API_PATHS.PAYMENTS.GET_ALL);

  return response.data;
}
