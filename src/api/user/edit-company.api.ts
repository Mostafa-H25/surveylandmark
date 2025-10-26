import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";
import type { Company } from "@/types/interfaces";

export async function editCompanyApi(data: Company) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  await axiosInstance.patch(API_PATHS.USER.COMPANY.UPDATE, data, {
    headers: { "Content-Type": "application/json" },
  });
}
