import { API_PATHS } from "@/constants/api-routes";
import { getAxiosInstance } from "@/lib/api-client";

type AddProjectArgs = {
  name: string;
  client: string;
  status: string;
  description: string;
  totalBudget: number;
  startDate: string;
  endDate: string;
  file: File | null;
};

export async function addProjectApi(data: AddProjectArgs) {
  if (!data.file) return;
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.postForm(API_PATHS.PROJECTS.ADD, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
