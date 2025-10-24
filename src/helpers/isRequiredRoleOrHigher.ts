import { roleHierarchy, UserRolesEnum } from "@/constants/defaults";
import type { UserRole } from "@/types/default";

export const isRequiredRoleOrHigher = (
  requiredRole: UserRole = UserRolesEnum.MEMBER,
  userRole: UserRole = UserRolesEnum.MEMBER,
): boolean => {
  return roleHierarchy[userRole].value >= roleHierarchy[requiredRole].value;
};
