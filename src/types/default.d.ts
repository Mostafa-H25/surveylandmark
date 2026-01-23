export type UserRole = "superAdmin" | "admin" | "member";
export type UserPermission = "fullAccess" | "limitedAccess" | "viewOnly";
export type UserStatus = "active" | "inactive";
export type DepartmentType = "construction" | "sales" | "storage";
export type Priority = "urgent" | "normal" | "high";

export type Status = "planning" | "in progress" | "completed" | "onHold";
export type UnitType = "residential" | "administrative" | "commercial";
export type PaymentAction = "delivered" | "pending" | "overdue";
export type PaymentType = "payment" | "deduction" | "sundry";
export type ContractorType = "contractor" | "supplier";
export type SalesView = "overview" | "members" | "incomes" | "units";
export type ConstructionView =
  | "overview"
  | "team"
  | "payments"
  | "materials"
  | "vendors"
  | "descriptiveItems";
