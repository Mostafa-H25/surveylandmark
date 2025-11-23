import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";
type Meta = {
  pagination?: { page: number; limit: number };
  filters?: { search?: string };
};

export async function getAllMessagesApi(meta?: Meta) {
  const params = {
    page: meta?.pagination?.page,
    limit: meta?.pagination?.limit,
    search: meta?.filters?.search,
  };
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(API_PATHS.MESSAGES.GET_ALL, {
    params,
  });

  return response.data;
}
