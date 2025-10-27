import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type SendMessageArgs = {
  to: string;
  body: string;
  subject: string;
  priority: string;
};

export async function sendMessageApi(data: SendMessageArgs) {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post(API_PATHS.MESSAGES.ADD, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
