import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";
import type { UserRole } from "@/types/default";

type InviteUser = {
  name: string;
  email: string;
  role: UserRole;
};

export async function inviteUserApi(data: InviteUser) {
  const axiosInstance = getAxiosInstance({ authenticated: true });
  await axiosInstance.post(API_PATHS.USER.INVITE, data, {
    headers: { "Content-Type": "application/json" },
  });
}
