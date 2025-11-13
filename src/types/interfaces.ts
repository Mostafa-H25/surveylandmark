import type {
  DepartmentType,
  Status,
  // UnitStatus,
  // SaleType,
  UnitType,
  UserPermission,
  UserRole,
  UserStatus,
  // PaymentStatus,
  // PaymentMethod,
  PaymentType,
  PaymentAction,
  ContractorType,
  Priority,
  // ConstructionType,
  // ConstructionTaskFeedback,
  // Priority,
  // MessageStatus,
  // SalesView,
  // ConstructionView,
} from "./default";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  profileImageUrl: string;
}

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

// interface NotificationConfig {
//   email: boolean;
//   push: boolean;
//   projects: boolean;
// }

export interface Message {
  id: string;
  from: string;
  // to: UserProfile;
  subject: string;
  body: string;
  priority: Priority;
  createdAt: string;
  isRead: boolean;
}

// interface Alert {
//   id: string;
//   type: string;
//   subject: string;
//   body: string;
//   project: Project;
//   client: Client;
//   priority: Priority;
//   createdAt: string;
//   status: Status;
// }

// interface Sales {
//   id: string;
//   view: SalesView;
//   overview: SalesOverview[];
//   revenue: SalesRevenue[];
//   members: SalesMember[];
//   units: SalesUnit[];
// }
// interface Construction {
//   id: string;
//   view: ConstructionView[];
//   members: ConstructionMember[];
//   payments: ConstructionPayment[];
//   contractors: ConstructionContractor[];
//   material: ConstructionMaterial[];
//   task: ConstructionTasks[];
// }

// interface Standard {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   version: number;
//   lastUpdated: string;
//   status: string;
//   document: File;
// }

// interface Storage {
//   id: string;
//   name: string;
//   type: string;
//   quantity: number;
//   batchNo: number;
//   supplyDate: string;
//   contractor: ConstructionContractor;
//   unit: string;
//   recipient: string;
// }

// interface SalesOverview {
//   id: string;
//   title: string;
//   metrics: string;
// }

// interface SalesMember {
//   id: string;
//   bio: string;
//   name: string;
//   email: string;
//   phone: string;
//   position: string;
//   projects: Project[];
//   salary: number;
//   commission: number;
//   responsibilities: string[];
//   permissions: string[];
// }

// interface SalesRevenue {
//   id: string;
//   title: string;
//   revenueTillNow: number;
//   batchNo: number;
//   installmentsRevenue: number;
//   deploymentRevenue: number;
// }

// interface SalesUnit {
//   id: string;
//   name: string;
//   client: Client;
//   project: Project;
//   building: string;
//   floor: string;
//   model: string;
//   saleType: SaleType;
//   revenue: number;
//   type: UnitType;
//   status: UnitStatus;
//   salesTeam: SalesMember[];
//   paymentMethod: PaymentMethod;
//   downPayment: number;
//   installments: Installment[];
// }

// interface ConstructionOverview {
//   id: string;
//   title: string;
//   metrics: string;
//   progress: number;
//   status: Status;
// }

// interface ConstructionMember {
//   id: string;
//   bio: string;
//   name: string;
//   email: string;
//   phone: string;
//   position: string;
//   projects: Project[];
//   salary: number;
//   financialLimit: number;
//   salesDepartmentAccess: boolean;
//   responsibilities: string[];
//   permissions: string[];
// }

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

// interface ConstructionMaterial {
//   id: string;
//   name: string;
//   totalQuantity: number;
//   availableQuantity: number;
//   units: string;
// }

// interface ConstructionTaskPhase {
//   id: string;
//   title: string;
//   description: string;
//   status: Status;
// }

// interface ConstructionTaskPayments {
//   amount: number;
//   type: PaymentType;
// }

// interface ConstructionTaskConfirmation {
//   engineer: ConstructionMember;
//   date: string;
// }

// interface ConstructionTaskConfirmation {
//   engineer: ConstructionMember;
//   date: string;
// }

// interface ConstructionTaskImagesFeedback {
//   status: ConstructionTaskFeedback;
//   image: string;
// }

// interface ConstructionTasks {
//   id: string;
//   title: string;
//   type: ConstructionType;
//   totalQuantity: number;
//   implementedQuantity: number;
//   costsTillNow: number;
//   evaluation: number;
//   progress: number;
//   startDate: string;
//   endDate?: string;
//   contractor: ConstructionContractor;
//   status: Status;
//   engineer: ConstructionMember;
//   material: string;
//   costPerMeter: number;
//   units: string;
//   payments: ConstructionTaskPayments[];
//   phases: ConstructionTaskPhase[];
//   confirmations: ConstructionTaskConfirmation[];
//   feedbackImages: ConstructionTaskImagesFeedback[];
// }

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

// interface Client {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   createdAt: string;
//   projects: Project[];
// }

// interface Installment {
//   id: string;
//   batchNo: number;
//   dueDate: string;
//   amount: number;
//   status: PaymentStatus;
// }

export interface Report {
  id: string;
  name: string;
  // type: string;
  generatedAt: string;
  description: string;
  downloadUrl: string;
  project: string;
  generatedBy: string;
}
