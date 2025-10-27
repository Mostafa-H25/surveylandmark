import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type UpdateMessageArgs = {
  id: string;
  isRead?: boolean;
};

export async function markMessageAsReadApi(data: UpdateMessageArgs) {
  const { id, ...body } = data;
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.patch(
    API_PATHS.MESSAGES.UPDATE(id),
    body,
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}
