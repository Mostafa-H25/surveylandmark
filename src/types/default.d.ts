export type UserRole = "superAdmin" | "admin" | "member";
export type UserPermission = "fullAccess" | "limitedAccess" | "viewOnly";
export type UserStatus = "active" | "inactive";
export type DepartmentType = "construction" | "sales" | "storage";
export type Priority = "urgent" | "normal" | "high";
export type MessageStatus = "read" | "unread";

export type Status = "planning" | "inProgress" | "completed" | "onHold";
export type UnitType = "residential" | "administrative" | "commercial";
export type SaleType = "sale" | "rent";
export type UnitStatus = "available" | "reserved" | "sold" | "rented";
export type PaymentMethod = "installments" | "cash";
export type PaymentAction = "delivered" | "pending" | "overdue";
export type PaymentStatus = "paid" | "pending" | "overdue";
export type PaymentType = "payment" | "deduction" | "sundry";
export type ContractorType = "contractor" | "supplier";
export type ConstructionType = "excavation" | "concrete" | "finishing";
export type ConstructionTaskFeedback = "accepted" | "refused";
export type SalesView = "overview" | "members" | "incomes" | "units";
export type ConstructionView =
  | "overview"
  | "team"
  | "payments"
  | "materials"
  | "vendors"
  | "descriptiveItems";
