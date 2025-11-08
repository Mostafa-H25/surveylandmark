import { API_PATHS } from "@/constants/api-routes";
import { ConstructionSectionsEnum } from "@/constants/defaults";
import { getAxiosInstance } from "@/lib/api-client";
import type { DepartmentType, PaymentType } from "@/types/default";

export async function getDepartmentSectionByProjectIdApi(
  projectId: string,
  department: DepartmentType,
  section?: string,
  subSection?: PaymentType,
) {
  const paymentsSubSection =
    section === ConstructionSectionsEnum.PAYMENTS ? subSection : null;
  const params = section ? { kind: section, sub: paymentsSubSection } : null;
  const axiosInstance = getAxiosInstance({ authenticated: true });
  const response = await axiosInstance.get(
    API_PATHS.PROJECTS.GET_DEPARTMENT(projectId, department),
    { params },
  );

  return response.data;
}
