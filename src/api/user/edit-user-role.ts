import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";
import type { UserPermission, UserRole } from "@/types/default";

export async function editUserRoleApi(
  userId: string,
  data: {
    role: UserRole;
    permission: UserPermission;
  },
) {
  const axiosInstance = getAxiosInstance({ authenticated: true });

  await axiosInstance.patch(`${API_PATHS.USER.UPDATE}/${userId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
}
