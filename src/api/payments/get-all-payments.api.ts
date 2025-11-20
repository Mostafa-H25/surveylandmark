import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type Meta = {
  pagination?: { page: number; limit: number };
  filters?: { search?: string; status?: string };
};

export async function getAllPaymentsApi(meta?: Meta) {
  const params = {
    page: meta?.pagination?.page,
    limit: meta?.pagination?.limit,
    search: meta?.filters?.search,
    status: meta?.filters?.status,
  };
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(API_PATHS.PAYMENTS.GET_ALL, {
    params,
  });

  return response.data;
}
