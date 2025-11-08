import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type UpdatePaymentStatusArgs = {
  projectId: string;
  paymentId: string;
  status: string;
};

export async function updatePaymentStatusApi(data: UpdatePaymentStatusArgs) {
  const { projectId, paymentId, status } = data;
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.patch(
    API_PATHS.PAYMENTS.UPDATE(projectId, paymentId),
    { status },
    { headers: { "Content-Type": "application/json" } },
  );
  return response.data;
}
