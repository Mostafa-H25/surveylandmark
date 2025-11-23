import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";
import type { UserRole } from "@/types/default";

export async function editUserRoleApi(
  data: {
    role: UserRole;
  },
  userId: string,
) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  await axiosInstance.patch(`${API_PATHS.USER.UPDATE}/${userId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
}
