import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type AddPaymentArgs = {
  clientId: string;
  projectId: string;
  dueDate: string;
  amount: number;
};

export async function addPaymentApi(data: AddPaymentArgs) {
  const { projectId, ...rest } = data;
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post(
    API_PATHS.PAYMENTS.ADD(projectId),
    rest,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
}
