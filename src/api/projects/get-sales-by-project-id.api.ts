import { API_PATHS } from "@/constants/api-routes";
import { SalesSectionsEnum } from "@/constants/defaults";
import { getAxiosInstance } from "@/lib/api-client";
import type { DepartmentType } from "@/types/default";
import type { DateRange } from "react-day-picker";

type Meta = {
  pagination?: { page: number; limit: number };
  range: DateRange | undefined;
};

export async function getSalesByProjectIdApi(
  projectId: string,
  department: DepartmentType,
  section?: string,
  meta?: Meta,
) {
  const isIncomes = SalesSectionsEnum.INCOMES === section;

  const params = {
    kind: department,
    sub: section,
    page: meta?.pagination?.page,
    limit: meta?.pagination?.limit,
    from: isIncomes ? meta?.range?.from : undefined,
    to: isIncomes ? meta?.range?.to : undefined,
  };

  const axiosInstance = getAxiosInstance({ authenticated: true });

  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_SALES(projectId),
    { params },
  );

  return response.data;
}
