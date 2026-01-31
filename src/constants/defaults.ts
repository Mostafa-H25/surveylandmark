import type {
  ConstructionView,
  DepartmentType,
  PaymentType,
  Priority,
  SalesView,
  Status,
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
} from "lucide-react";
import { ROUTES } from "./routes";

export const KILOBYTE = 1024 as const;
export const SIZES = ["Bytes", "KB", "MB", "GB"] as const;

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
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  {
    name: "Users Management",
    href: ROUTES.USERS,
    icon: Users,
    requiredRole: UserRolesEnum.SUPER_ADMIN,
  },
  { name: "Clients & Projects", href: ROUTES.CLIENTS, icon: Building2 },
  {
    name: "Notifications & Messages",
    href: ROUTES.MESSAGES,
    icon: MessageSquare,
  },
  { name: "Reports", href: ROUTES.REPORTS, icon: FileText },
  { name: "Payments", href: ROUTES.PAYMENTS, icon: Banknote },
  { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
];

export const CategoriesEnum: Record<string, DepartmentType> = {
  CONSTRUCTION: "construction",
  SALES: "sales",
  STORAGE: "storage",
};

export const PROJECT_STATUS_ENUM: Record<string, Status> = {
  PLANNING: "planning",
  IN_PROGRESS: "in progress",
  COMPLETED: "completed",
};

export const projectStatus = Object.values(PROJECT_STATUS_ENUM);

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

const MESSAGE_PRIORITY_ENUM: Record<string, Priority> = {
  NORMAL: "normal",
  HIGH: "high",
  URGENT: "urgent",
};

export const messagePriority = Object.values(MESSAGE_PRIORITY_ENUM);
