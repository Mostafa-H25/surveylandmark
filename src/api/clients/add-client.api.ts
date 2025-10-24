import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type AddClientArgs = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

export async function addClientApi(data: AddClientArgs) {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post(API_PATHS.CLIENTS.ADD, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
