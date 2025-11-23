import type {
  DepartmentType,
  Status,
  UnitType,
  UserPermission,
  UserRole,
  UserStatus,
  PaymentType,
  PaymentAction,
  ContractorType,
  Priority,
} from "./default";

type AuthUser = {
  name: string;
  email: string;
  role: UserRole;
  profileImageUrl: string;
};

export type UserProfile = AuthUser & {
  phone: string;
  bio?: string;
  location?: string;
  createdAt: string;
  lastLogin: string;
  department?: string;
  profileImage?: File;
  profileImageUrl?: string;
};

export type FormUser = Omit<
  UserProfile,
  | "email"
  | "role"
  | "profileImage"
  | "profileImageUrl"
  | "createdAt"
  | "lastLogin"
>;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  permissions: UserPermission;
  status: UserStatus;
  createdAt: string;
  projects: { id: string; name: string }[];
}

export interface Company {
  companyName: string;
  email: string;
  phone: string;
  taxId: string;
  address: string;
  website: string;
  registrationNumber: string;
}

export interface Message {
  id: string;
  from: string;
  subject: string;
  body: string;
  priority: Priority;
  createdAt: string;
  isRead: boolean;
}

interface ConstructionContractor {
  id: string;
  bio: string;
  name: string;
  email: string;
  phone: string;
  position: ContractorType;
  projects: Project[];
  fieldOfWork: string[];
  rating: number;
  payments: ConstructionPayment[];
  reviews: string[];
}

interface ConstructionPayment {
  id: string;
  type: PaymentType;
  date: string;
  item: string;
  amount: number;
  batchNo?: number;
  contractor?: ConstructionContractor;
  status: PaymentAction;
}

interface Department {
  id: string;
  budget: number;
  manager: string;
  type: DepartmentType;
}

interface Project {
  id: string;
  name: string;
  description: string;
  endDate?: string;
  startDate: string;
  createdAt: string;
  totalBudget: number;
  revenue: number;
  inventory: number;
  progress: number;
  unitType: UnitType;
  status: Status;
  departments: Department[];
}

export interface Report {
  id: string;
  name: string;
  generatedAt: string;
  description: string;
  downloadUrl: string;
  project: string;
  generatedBy: string;
}
