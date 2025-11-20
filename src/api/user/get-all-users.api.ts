import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type Meta = {
  pagination?: { page: number; limit: number };
  filters?: { search?: string; role?: string };
};

export async function getAllUsersApi(meta?: Meta) {
  const params = {
    page: meta?.pagination?.page,
    limit: meta?.pagination?.limit,
    q: meta?.filters?.search,
    role: meta?.filters?.role,
  };
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(API_PATHS.USER.GET_ALL, { params });

  return response.data;
}
