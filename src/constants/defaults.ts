import type {
  ConstructionView,
  DepartmentType,
  PaymentType,
  Priority,
  SalesView,
  Status,
  UserPermission,
  UserRole,
  UserStatus,
} from "@/types/default";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  MessageSquare,
  Banknote,
  FileText,
  DollarSign,
  Package,
  AlertTriangle,
  Calendar,
} from "lucide-react";

export const KILOBYTE = 1024 as const;
export const SIZES = ["Bytes", "KB", "MB", "GB"] as const;

export const SeverityEnum = {
  DANGER: {
    background: "bg-red-50",
    hover: "text-red-100",
    primary: "text-red-800",
    secondary: "text-red-500",
  },
  WARNING: {
    background: "bg-orange-50",
    hover: "text-orange-100",
    primary: "text-orange-800",
    secondary: "text-orange-500",
  },
  PASS: {
    background: "bg-yellow-50",
    hover: "text-yellow-100",
    primary: "text-yellow-800",
    secondary: "text-yellow-500",
  },
  INFO: {
    background: "bg-blue-50",
    hover: "text-blue-100",
    primary: "text-blue-800",
    secondary: "text-blue-500",
  },
  SUCCESS: {
    background: "bg-green-50",
    hover: "text-green-100",
    primary: "text-green-800",
    secondary: "text-green-500",
  },
};

export const UserPermissionsEnum: Record<string, UserPermission> = {
  FULL_ACCESS: "fullAccess",
  LIMITED_ACCESS: "limitedAccess",
  VIEW_ONLY: "viewOnly",
};
export const userPermissions = Object.values(UserPermissionsEnum);

export const UserStatusEnum: Record<string, UserStatus> = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const UserRolesEnum: Record<string, UserRole> = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
  MEMBER: "member",
};
export const userRoles = Object.values(UserRolesEnum);

export const roleHierarchy = {
  [UserRolesEnum.SUPER_ADMIN]: {
    value: 3,
    color: "bg-red-100 text-red-700 hover:bg-red-200",
  },
  [UserRolesEnum.ADMIN]: {
    value: 2,
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  [UserRolesEnum.MEMBER]: {
    value: 1,
    color: "bg-green-100 text-green-700 hover:bg-green-200",
  },
};

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  requiredRole?: UserRole;
}

export const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Users Management",
    href: "/users",
    icon: Users,
    requiredRole: UserRolesEnum.SUPER_ADMIN,
  },
  { name: "Clients & Projects", href: "/clients", icon: Building2 },
  {
    name: "Notifications & Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Payments", href: "/payments", icon: Banknote },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const CategoriesEnum: Record<string, DepartmentType> = {
  CONSTRUCTION: "construction",
  SALES: "sales",
  STORAGE: "storage",
  // STANDARDS: "standards",
};

export const ConstructionTabData: {
  value: DepartmentType;
  label: string;
  options: { value: ConstructionView; label: string }[];
} = {
  value: CategoriesEnum.CONSTRUCTION,
  label: "Construction",
  options: [
    { value: "descriptiveItems", label: "Items" },
    { value: "team", label: "Members" },
    { value: "vendors", label: "Contractors & Suppliers" },
    { value: "materials", label: "Materials" },
    { value: "overview", label: "Overview" },
  ],
};
export const SalesTabData: {
  value: DepartmentType;
  label: string;
  options: { value: SalesView; label: string }[];
} = {
  value: CategoriesEnum.SALES,
  label: "Sales",
  options: [
    { value: "overview", label: "Overview" },
    { value: "units", label: "Units" },
    { value: "members", label: "Members" },
    { value: "incomes", label: "Incomes" },
  ],
};
export const StorageTabData = {
  value: CategoriesEnum.STORAGE,
  label: "Storage",
  options: [],
};

export const fileCategories = [
  ConstructionTabData,
  SalesTabData,
  StorageTabData,
] as const;

export type TFileExtensions = "excel" | "csv" | "pdf" | "doc";

export const FileExtensionEnum: Record<string, TFileExtensions> = {
  EXCEL: "excel",
  CSV: "csv",
  PDF: "pdf",
  DOC: "doc",
};
export const fileExtensions = [
  { value: FileExtensionEnum.EXCEL, label: "Excel (.xlsx)" },
  { value: FileExtensionEnum.CSV, label: "CSV (.csv)" },
  { value: FileExtensionEnum.PDF, label: "PDF (.pdf)" },
  { value: FileExtensionEnum.DOC, label: "Word (.docx)" },
];

export const PROJECT_STATUS_ENUM: Record<string, Status> = {
  PLANNING: "planning",
  IN_PROGRESS: "inProgress",
  COMPLETED: "completed",
  ON_HOLDING: "onHold",
};

export const projectStatus = Object.values(PROJECT_STATUS_ENUM);

export type TUserManagementTabs =
  | "users"
  | "roles_&_projects"
  | "permissions"
  | "system_settings";

export const UserManagementTabsEnum: Record<string, TUserManagementTabs> = {
  USERS: "users",
  // ROLES: "roles_&_projects",
  // PERMISSIONS: "permissions",
  // SYSTEM: "system_settings",
};

export const userManagementTabs = Object.values(UserManagementTabsEnum);

export type TReportTypes = "project" | "financial" | "sales" | "inventory";

export const ReportTypesEnum: Record<
  string,
  { value: TReportTypes; label: string; icon: React.ComponentType<any> }
> = {
  PROJECTS: { value: "project", label: "projects progress", icon: Building2 },
  FINANCIAL: {
    value: "financial",
    label: "financial summary",
    icon: DollarSign,
  },
  SALES: { value: "sales", label: "sales reports", icon: FileText },
  INVENTORY: { value: "inventory", label: "inventory status", icon: Package },
};

export const reportTypes = Object.values(ReportTypesEnum);

export type TAlert = "deadline" | "payment" | "inventory";

export const AlertsEnum = {
  DEADLINE: { value: "deadline", icon: Calendar },
  PAYMENT: { value: "payment", icon: AlertTriangle },
  INVENTORY: { value: "inventory", icon: AlertTriangle },
};
export const Alerts = Object.values(AlertsEnum);

export const ConstructionSectionsEnum: Record<string, ConstructionView> = {
  OVERVIEW: "overview",
  TEAM: "team",
  ITEMS: "descriptiveItems",
  MATERIALS: "materials",
  PAYMENTS: "payments",
  VENDORS: "vendors",
};

export const constructionSections = Object.values(ConstructionSectionsEnum);

export const PaymentsSectionsEnum: Record<string, PaymentType> = {
  PAYMENT: "payment",
  DEDUCTION: "deduction",
  SUNDRIES: "sundry",
};

export const paymentsSubSections = Object.values(PaymentsSectionsEnum);

export const SalesSectionsEnum: Record<string, SalesView> = {
  OVERVIEW: "overview",
  MEMBERS: "members",
  INCOMES: "incomes",
  UNITS: "units",
};

export const salesSections = Object.values(SalesSectionsEnum);

export const ItemTabsEnum: Record<string, string> = {
  OVERVIEW: "overview",
  FINANCIAL: "financial",
  PROGRESS: "progress",
  CONFIRMATION: "confirmation",
};
export const itemSections = Object.values(ItemTabsEnum);

export const MESSAGE_PRIORITY_ENUM: Record<string, Priority> = {
  NORMAL: "normal",
  HIGH: "high",
  URGENT: "urgent",
};

export const messagePriority = Object.values(MESSAGE_PRIORITY_ENUM);
