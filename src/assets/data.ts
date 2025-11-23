// import { SeverityEnum } from "@/constants/defaults";
import type { User } from "@/types/interfaces";
import {
  Building2,
  Users,
  FolderOpen,
  TrendingUp,
  DollarSign,
  Activity,
  // AlertTriangle,
  // Calendar,
} from "lucide-react";

export const stats = [
  {
    title: "Total Projects",
    value: "47",
    description: "+12% from last month",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Clients",
    value: "23",
    description: "+5 new this month",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Construction Projects",
    value: "28",
    description: "15 in progress",
    icon: FolderOpen,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Sales Projects",
    value: "19",
    description: "8 pending approval",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Total Revenue",
    value: "$2.4M",
    description: "+18% from last month",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Active Teams",
    value: "12",
    description: "3 new teams formed",
    icon: Activity,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export const recentProjects = [
  // {
  //   id: 1,
  //   name: "Skyline Tower Construction",
  //   client: "Metro Developers",
  //   type: "Construction",
  //   status: "In Progress",
  //   progress: 65,
  // },
  // {
  //   id: 2,
  //   name: "Garden View Sales",
  //   client: "Green Valley Corp",
  //   type: "Sales",
  //   status: "Planning",
  //   progress: 25,
  // },
  // {
  //   id: 3,
  //   name: "Industrial Storage Complex",
  //   client: "LogiTech Solutions",
  //   type: "Storage",
  //   status: "Completed",
  //   progress: 100,
  // },
];

export const alertsData = [
  // {
  //   id: 1,
  //   icon: AlertTriangle,
  //   title: "Payment approval needed",
  //   description: "Steel Corp payment request pending",
  //   ...SeverityEnum.DANGER,
  // },
  // {
  //   id: 2,
  //   icon: AlertTriangle,
  //   title: "Inventory shortage",
  //   description: "Cement stock running low",
  //   ...SeverityEnum.WARNING,
  // },
  // {
  //   id: 3,
  //   icon: Calendar,
  //   title: "Deadline approaching",
  //   description: "Foundation work due in 3 days",
  //   ...SeverityEnum.INFO,
  // },
];

// Chart data
export const monthlyData = [
  // { month: "Jan", construction: 12, sales: 8, revenue: 400000 },
  // { month: "Feb", construction: 15, sales: 10, revenue: 520000 },
  // { month: "Mar", construction: 18, sales: 12, revenue: 650000 },
  // { month: "Apr", construction: 20, sales: 15, revenue: 780000 },
  // { month: "May", construction: 22, sales: 18, revenue: 850000 },
  // { month: "Jun", construction: 25, sales: 20, revenue: 920000 },
];

export const projectStatusData = [
  // { name: "Completed", value: 35, color: "#10b981" },
  // { name: "In Progress", value: 40, color: "#f59e0b" },
  // { name: "Planning", value: 15, color: "#6366f1" },
  // { name: "On Hold", value: 10, color: "#ef4444" },
];

export const departmentData = [
  // { department: "Construction", projects: 28, budget: 1200000 },
  // { department: "Sales", projects: 19, budget: 800000 },
  // { department: "Engineering", projects: 15, budget: 600000 },
  // { department: "Design", projects: 12, budget: 400000 },
];

export const usersData: User[] = [
  // {
  //   id: "1",
  //   name: "John Smith",
  //   email: "john.smith@landmark.com",
  //   role: "superAdmin",
  //   status: "active",
  //   createdAt: "2024-01-15",
  //   projects: ["All Projects"],
  //   financialLimit: 1000000,
  // },
  // {
  //   id: "2",
  //   name: "Sarah Johnson",
  //   email: "sarah.johnson@landmark.com",
  //   role: "admin",
  //   status: "active",
  //   joinDate: "2024-02-20",
  //   projects: ["Skyline Tower", "Garden View"],
  //   financialLimit: 500000,
  // },
  // {
  //   id: "3",
  //   name: "Mike Davis",
  //   email: "mike.davis@landmark.com",
  //   role: "member",
  //   status: "active",
  //   joinDate: "2024-03-10",
  //   projects: ["Skyline Tower"],
  // },
  // {
  //   id: "4",
  //   name: "Emily Wilson",
  //   email: "emily.wilson@landmark.com",
  //   role: "member",
  //   status: "inactive",
  //   joinDate: "2024-03-25",
  //   projects: ["Garden View"],
  // },
];

export const permissionsData = [
  {
    id: 1,
    role: "super_admin",
    module: "All Modules",
    access: "Full Access",
    canEdit: true,
  },
  {
    id: 2,
    role: "admin",
    module: "Project Management",
    access: "Full Access",
    canEdit: true,
  },
  {
    id: 3,
    role: "admin",
    module: "User Management",
    access: "Limited",
    canEdit: true,
  },
  {
    id: 4,
    role: "admin",
    module: "Financial Reports",
    access: "View Only",
    canEdit: true,
  },
  {
    id: 5,
    role: "member",
    module: "Project View",
    access: "Assigned Projects Only",
    canEdit: false,
  },
  {
    id: 6,
    role: "member",
    module: "Reports",
    access: "View Only",
    canEdit: false,
  },
];

export const availableProjectsData = [
  "Skyline Tower",
  "Garden View",
  "Industrial Complex",
  "City Mall",
];

// Reports Data
export const projectReports = [
  // {
  //   id: 1,
  //   name: "Skyline Tower Progress Report",
  //   type: "Progress",
  //   project: "Skyline Tower",
  //   generatedBy: "John Smith",
  //   date: "2024-01-15",
  //   status: "completed",
  // },
  // {
  //   id: 2,
  //   name: "Garden View Timeline Report",
  //   type: "Timeline",
  //   project: "Garden View",
  //   generatedBy: "Sarah Johnson",
  //   date: "2024-01-14",
  //   status: "completed",
  // },
];

export const financialReports = [
  // {
  //   id: 1,
  //   name: "Q1 2024 Financial Summary",
  //   type: "Summary",
  //   period: "Q1 2024",
  //   generatedBy: "Emily Wilson",
  //   date: "2024-01-15",
  //   amount: 2400000,
  // },
  // {
  //   id: 2,
  //   name: "Monthly Budget Analysis",
  //   type: "Budget",
  //   period: "January 2024",
  //   generatedBy: "Mike Davis",
  //   date: "2024-01-14",
  //   amount: 850000,
  // },
];

export const salesReports = [
  // {
  //   id: 1,
  //   name: "Unit Sales Report - Garden View",
  //   type: "Unit Sales",
  //   project: "Garden View",
  //   generatedBy: "Alex Johnson",
  //   date: "2024-01-15",
  //   unitsTotal: 50,
  //   unitsSold: 32,
  // },
  // {
  //   id: 2,
  //   name: "Monthly Sales Performance",
  //   type: "Performance",
  //   project: "All Projects",
  //   generatedBy: "Lisa Brown",
  //   date: "2024-01-14",
  //   unitsTotal: 120,
  //   unitsSold: 85,
  // },
];

export const inventoryReports = [
  // {
  //   id: 1,
  //   name: "Material Consumption Report",
  //   type: "Consumption",
  //   project: "Skyline Tower",
  //   generatedBy: "Tom Wilson",
  //   date: "2024-01-15",
  //   totalItems: 150,
  //   lowStock: 8,
  // },
  // {
  //   id: 2,
  //   name: "Monthly Inventory Summary",
  //   type: "Summary",
  //   project: "All Projects",
  //   generatedBy: "Kate Davis",
  //   date: "2024-01-14",
  //   totalItems: 300,
  //   lowStock: 15,
  // },
];

//Messages and NOtification
export const internalMessages = [
  // {
  //   id: 1,
  //   from: "John Smith",
  //   to: "Engineering Team",
  //   subject: "Foundation Design Update",
  //   message: "Please review the updated foundation specifications...",
  //   timestamp: "2024-01-15 10:30",
  //   status: "read",
  //   priority: "normal",
  // },
  // {
  //   id: 2,
  //   from: "Sarah Johnson",
  //   to: "Mike Davis",
  //   subject: "Budget Approval Request",
  //   message: "Need approval for additional materials budget...",
  //   timestamp: "2024-01-15 09:15",
  //   status: "unread",
  //   priority: "high",
  // },
  // {
  //   id: 3,
  //   from: "Emily Wilson",
  //   to: "Construction Team",
  //   subject: "Safety Protocol Reminder",
  //   message: "Please ensure all safety protocols are followed...",
  //   timestamp: "2024-01-14 16:45",
  //   status: "read",
  //   priority: "normal",
  // },
];

export const alerts = [
  // {
  //   id: 1,
  //   type: "deadline",
  //   title: "Project Deadline Approaching",
  //   message: "Skyline Tower foundation work due in 2 days",
  //   project: "Skyline Tower",
  //   priority: "high",
  //   timestamp: "2024-01-15 08:00",
  //   status: "active",
  // },
  // {
  //   id: 2,
  //   type: "payment",
  //   title: "Payment Approval Required",
  //   message: "Steel Corp invoice requires approval ($75,000)",
  //   project: "Industrial Complex",
  //   priority: "urgent",
  //   timestamp: "2024-01-15 07:30",
  //   status: "pending",
  // },
  // {
  //   id: 3,
  //   type: "inventory",
  //   title: "Inventory Shortage Alert",
  //   message: "Cement stock running low (15% remaining)",
  //   project: "Multiple Projects",
  //   priority: "medium",
  //   timestamp: "2024-01-14 18:20",
  //   status: "active",
  // },
  // {
  //   id: 4,
  //   type: "deadline",
  //   title: "Document Submission Due",
  //   message: "Environmental impact assessment due tomorrow",
  //   project: "Garden View",
  //   priority: "high",
  //   timestamp: "2024-01-14 14:10",
  //   status: "active",
  // },
];

// Payment Data
interface PaymentData {
  id: number;
  client: string;
  project: string;
  paymentAmount: number;
  dueDate: string;
  status: "pending" | "received" | "overdue";
  isActive: boolean;
}

export const paymentData: PaymentData[] = [
  // {
  //   id: 1,
  //   client: "John Smith",
  //   project: "Skyline Tower",
  //   paymentAmount: 15000,
  //   dueDate: "2024-07-15",
  //   status: "pending",
  //   isActive: true,
  // },
  // {
  //   id: 2,
  //   client: "Sarah Johnson",
  //   project: "Garden View",
  //   paymentAmount: 8500,
  //   dueDate: "2024-07-20",
  //   status: "received",
  //   isActive: true,
  // },
  // {
  //   id: 3,
  //   client: "Mike Davis",
  //   project: "Urban Plaza",
  //   paymentAmount: 22000,
  //   dueDate: "2024-07-10",
  //   status: "overdue",
  //   isActive: true,
  // },
  // {
  //   id: 4,
  //   client: "Emily Wilson",
  //   project: "Riverside Complex",
  //   paymentAmount: 12500,
  //   dueDate: "2024-07-25",
  //   status: "pending",
  //   isActive: false,
  // },
];

export const companyInfo = {
  name: "LANDMARK Projects",
  address: "123 Construction Ave, Building City, BC 12345",
  phone: "+1-555-0123",
  email: "info@surveylandmark.com",
  website: "www.surveylandmark.com",
  taxId: "TAX123456789",
  registrationNumber: "REG987654321",
};

interface Department {
  id: string;
  name: "construction" | "sales" | "storage";
  status: "planning" | "in_progress" | "completed" | "on_hold";
  budget: number;
  progress: number;
  manager: string;
  startDate: string;
}

interface Project {
  id: string;
  name: string;
  totalBudget: number;
  startDate: string;
  endDate?: string;
  status: "planning" | "in_progress" | "completed" | "on_hold";
  departments: Department[];
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projects: Project[];
  joinDate: string;
}

export const clientsData: Client[] = [
  // {
  //   id: "1",
  //   name: "Robert Anderson",
  //   email: "robert@metrodevelopers.com",
  //   phone: "+1-555-0123",
  //   company: "Metro Developers",
  //   joinDate: "2024-01-10",
  //   projects: [
  //     {
  //       id: "p1",
  //       name: "Skyline Tower Complex",
  //       totalBudget: 5000000,
  //       startDate: "2024-02-15",
  //       endDate: "2024-12-30",
  //       status: "in_progress",
  //       departments: [
  //         {
  //           id: "d1",
  //           name: "construction",
  //           status: "in_progress",
  //           budget: 3000000,
  //           progress: 65,
  //           manager: "John Smith",
  //           startDate: "2024-02-15",
  //         },
  //         {
  //           id: "d2",
  //           name: "sales",
  //           status: "planning",
  //           budget: 1500000,
  //           progress: 20,
  //           manager: "Sarah Johnson",
  //           startDate: "2024-06-01",
  //         },
  //         {
  //           id: "d3",
  //           name: "storage",
  //           status: "completed",
  //           budget: 500000,
  //           progress: 100,
  //           manager: "Mike Davis",
  //           startDate: "2024-01-20",
  //         },
  //       ],
  //     },
  //     {
  //       id: "p2",
  //       name: "Metro Plaza Development",
  //       totalBudget: 3200000,
  //       startDate: "2024-03-01",
  //       status: "planning",
  //       departments: [
  //         {
  //           id: "d4",
  //           name: "construction",
  //           status: "planning",
  //           budget: 2000000,
  //           progress: 5,
  //           manager: "Robert Brown",
  //           startDate: "2024-04-15",
  //         },
  //         {
  //           id: "d5",
  //           name: "sales",
  //           status: "planning",
  //           budget: 800000,
  //           progress: 10,
  //           manager: "Lisa White",
  //           startDate: "2024-05-01",
  //         },
  //         {
  //           id: "d6",
  //           name: "storage",
  //           status: "planning",
  //           budget: 400000,
  //           progress: 0,
  //           manager: "Tom Wilson",
  //           startDate: "2024-03-15",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: "2",
  //   name: "Lisa Chen",
  //   email: "lisa@greenvalley.com",
  //   phone: "+1-555-0456",
  //   company: "Green Valley Corp",
  //   joinDate: "2024-02-05",
  //   projects: [
  //     {
  //       id: "p3",
  //       name: "Garden View Residential",
  //       totalBudget: 4500000,
  //       startDate: "2024-04-01",
  //       status: "in_progress",
  //       departments: [
  //         {
  //           id: "d7",
  //           name: "construction",
  //           status: "in_progress",
  //           budget: 2800000,
  //           progress: 45,
  //           manager: "Alex Green",
  //           startDate: "2024-04-01",
  //         },
  //         {
  //           id: "d8",
  //           name: "sales",
  //           status: "in_progress",
  //           budget: 1200000,
  //           progress: 60,
  //           manager: "Emma Thompson",
  //           startDate: "2024-03-15",
  //         },
  //         {
  //           id: "d9",
  //           name: "storage",
  //           status: "completed",
  //           budget: 500000,
  //           progress: 100,
  //           manager: "David Lee",
  //           startDate: "2024-03-01",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

// Project
export const constructionOverviewData = [
  //   {
  //     id: 69,
  //     overview: "Achievement Percentage",
  //     metrics: "85%",
  //     progress: 85,
  //     status: "in_progress",
  //   },
  //   {
  //     id: 79,
  //     overview: "Cost Till Now",
  //     metrics: "25M",
  //     progress: 75,
  //     status: "in_progress",
  //   },
  //   {
  //     id: 38,
  //     overview: "Total Area",
  //     metrics: "2000 m²",
  //     progress: 68,
  //     status: null,
  //   },
  //   {
  //     id: 33,
  //     overview: "Service Facilities Area",
  //     metrics: "1500 m²",
  //     progress: 45,
  //     status: "on_hold",
  //   },
  //   {
  //     id: 73,
  //     overview: "Green Areas Percentage",
  //     metrics: "500 m²",
  //     progress: 64,
  //     status: "on_hold",
  //   },
  //   {
  //     id: 25,
  //     overview: "Delivery Date",
  //     metrics: "30/12/2027",
  //     progress: 90,
  //     status: null,
  //   },
  //   {
  //     id: 3,
  //     overview: "NO. Residential Units",
  //     metrics: "2000",
  //     progress: 52,
  //     status: "in_progress",
  //   },
  //   {
  //     id: 13,
  //     overview: "NO. Commercial Units",
  //     metrics: "2000",
  //     progress: 85,
  //     status: "in_progress",
  //   },
  //   {
  //     id: 71,
  //     overview: "NO. Administrative Units",
  //     metrics: "2000",
  //     progress: 13,
  //     status: null,
  //   },
  //   {
  //     id: 27,
  //     overview: "Number Of Floors",
  //     metrics: "15",
  //     progress: 42,
  //     status: "on_hold",
  //   },
  //   {
  //     id: 40,
  //     overview: "Images",
  //     metrics: null,
  //     progress: 48,
  //     status: "in_progress",
  //   },
];
export const constructionMembersData = [
  // {
  //   id: 1,
  //   name: "Ahmed Abbas",
  //   email: "john.smith@skyline.com",
  //   phone: "+021155986668",
  //   position: "Project Manager",
  //   project: "Skyline",
  //   salary: 20000,
  //   salesDepartmentAccess: true,
  //   profile: {
  //     fullName: "Mohamed Adel",
  //     email: "superadmin@trendmark.com",
  //     phone: "+1 (555) 123-4567",
  //     bio: [
  //       {
  //         title: "Construction Manager",
  //         company: "Metro Developers",
  //         years: "2018 - 2024",
  //         description:
  //           "Led construction teams for multiple high-rise luxury apartment projects.",
  //       },
  //       {
  //         title: "Site Engineer",
  //         company: "Concrete Co.",
  //         years: "2015 - 2016",
  //         description:
  //           "Managed on-site engineering tasks and ensured safety compliance.",
  //       },
  //     ],
  //     permissions: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     responsibilities: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     securitySettings: {
  //       passwordLastChanged: "30 days ago",
  //     },
  //     currentProject: {
  //       name: "Skyline Tower Renovation",
  //       location: "Downtown District",
  //       duration: "Jan 2022 - Dec 2024",
  //       description:
  //         "Major overhaul of the Skyline Tower including facades and core systems upgrade.",
  //     },
  //     financialLimit: {
  //       amount: "$250,000",
  //       authorizedBy: "Owner",
  //     },
  //   },
  // },
  // {
  //   id: 2,
  //   name: "Ahmed Abbas",
  //   email: "john.smith@skyline.com",
  //   phone: "+021155986668",
  //   position: "Project Manager",
  //   project: "Skyline",
  //   salary: 20000,
  //   salesDepartmentAccess: true,
  //   profile: {
  //     fullName: "Mohamed Adel",
  //     email: "superadmin@trendmark.com",
  //     phone: "+1 (555) 123-4567",
  //     bio: [
  //       {
  //         title: "Construction Manager",
  //         company: "Metro Developers",
  //         years: "2018 - 2024",
  //         description:
  //           "Led construction teams for multiple high-rise luxury apartment projects.",
  //       },
  //       {
  //         title: "Site Engineer",
  //         company: "Concrete Co.",
  //         years: "2015 - 2016",
  //         description:
  //           "Managed on-site engineering tasks and ensured safety compliance.",
  //       },
  //     ],
  //     permissions: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     responsibilities: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     securitySettings: {
  //       passwordLastChanged: "30 days ago",
  //     },
  //     currentProject: {
  //       name: "Skyline Tower Renovation",
  //       location: "Downtown District",
  //       duration: "Jan 2022 - Dec 2024",
  //       description:
  //         "Major overhaul of the Skyline Tower including facades and core systems upgrade.",
  //     },
  //     financialLimit: {
  //       amount: "$250,000",
  //       authorizedBy: "Owner",
  //     },
  //   },
  // },
  // {
  //   id: 3,
  //   name: "Ahmed Abbas",
  //   email: "john.smith@skyline.com",
  //   phone: "+021155986668",
  //   position: "Project Manager",
  //   project: "Skyline",
  //   salary: 20000,
  //   salesDepartmentAccess: true,
  //   profile: {
  //     fullName: "Mohamed Adel",
  //     email: "superadmin@trendmark.com",
  //     phone: "+1 (555) 123-4567",
  //     bio: [
  //       {
  //         title: "Construction Manager",
  //         company: "Metro Developers",
  //         years: "2018 - 2024",
  //         description:
  //           "Led construction teams for multiple high-rise luxury apartment projects.",
  //       },
  //       {
  //         title: "Site Engineer",
  //         company: "Concrete Co.",
  //         years: "2015 - 2016",
  //         description:
  //           "Managed on-site engineering tasks and ensured safety compliance.",
  //       },
  //     ],
  //     permissions: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     responsibilities: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     securitySettings: {
  //       passwordLastChanged: "30 days ago",
  //     },
  //     currentProject: {
  //       name: "Skyline Tower Renovation",
  //       location: "Downtown District",
  //       duration: "Jan 2022 - Dec 2024",
  //       description:
  //         "Major overhaul of the Skyline Tower including facades and core systems upgrade.",
  //     },
  //     financialLimit: {
  //       amount: "$250,000",
  //       authorizedBy: "Owner",
  //     },
  //   },
  // },
];

export const constructionPaymentsData = [
  // {
  //   id: 1,
  //   type: "payment",
  //   contractor: "Delta Construction Co.",
  //   date: "2025-07-10",
  //   item: "Concrete Foundation Pouring",
  //   amount: 150000,
  //   status: "delivered",
  //   batchMonth: "2025-07",
  // },
  // {
  //   id: 2,
  //   type: "deduction",
  //   contractor: "SkyTech Installations",
  //   date: "2025-07-12",
  //   item: "Penalty for late delivery of HVAC units",
  //   amount: -5000,
  //   status: "approved",
  //   batchMonth: "2025-07",
  // },
  // {
  //   id: 3,
  //   type: "sundries",
  //   contractor: "Local Hardware Store",
  //   date: "2025-07-15",
  //   item: "Paint Supplies and Brushes",
  //   amount: 2400,
  //   status: "delivered",
  //   batchMonth: "2025-07",
  // },
  // {
  //   id: 4,
  //   type: "payment",
  //   contractor: "Al Noor Electric",
  //   date: "2025-08-01",
  //   item: "Wiring and Electrical Panel Installation",
  //   amount: 72000,
  //   status: "in progress",
  //   batchMonth: "2025-08",
  // },
  // {
  //   id: 5,
  //   type: "deduction",
  //   contractor: "GreenScape Landscaping",
  //   date: "2025-08-01",
  //   item: "Damaged plants during delivery",
  //   amount: -1800,
  //   status: "pending",
  //   batchMonth: "2025-08",
  // },
  // {
  //   id: 6,
  //   type: "sundries",
  //   contractor: "Office Supplies Ltd.",
  //   date: "2025-08-01",
  //   item: "Stationery for site office",
  //   amount: 600,
  //   status: "delivered",
  //   batchMonth: "2025-08",
  // },
];

export const constructionItemsData = [
  // {
  //   id: 1,
  //   name: "Foundation Work",
  //   type: "Excavation work",
  //   progress: 85,
  //   startDate: "2024-01-15",
  //   contractor: "Steve Robert",
  //   status: "in progress",
  //   siteEngineer: "Steve Robert",
  //   material: "Cement",
  //   costPerMeter: 520,
  // },
  // {
  //   id: 2,
  //   name: "Foundation Work",
  //   type: "Excavation work", // Note: Appears to be a duplicate or typo of "Excavation"
  //   progress: 85,
  //   startDate: "2024-01-20",
  //   contractor: "Steve Robert",
  //   status: "in progress",
  //   siteEngineer: "Steve Robert",
  //   material: "Cement",
  //   costPerMeter: 520,
  // },
  // {
  //   id: 3,
  //   name: "Foundation Work",
  //   type: "Concrete",
  //   progress: 85,
  //   startDate: "2024-01-25",
  //   contractor: "Steve Robert",
  //   status: "in progress",
  //   siteEngineer: "Steve Robert",
  //   material: "Cement",
  //   costPerMeter: 520,
  // },
  // {
  //   id: 4,
  //   name: "Ceramic", // Note: Possible typo (Ceramic/Cermet?)
  //   type: "Finishing",
  //   progress: 85,
  //   startDate: "2024-01-25",
  //   contractor: "Steve Robert",
  //   status: "completed",
  //   siteEngineer: "Steve Robert",
  //   material: "Cement",
  //   costPerMeter: 520,
  // },
];
export const constructionMaterialsData = [
  // {
  //   id: 1,
  //   name: "Steel Rebar",
  //   totalQuantity: 5000,
  //   availableQuantity: 3000,
  //   unit: "m³",
  // },
  // {
  //   id: 2,
  //   name: "Concrete Mix",
  //   totalQuantity: 500,
  //   availableQuantity: 200,
  //   unit: "m³",
  // },
  // {
  //   id: 3,
  //   name: "Cement Bags",
  //   totalQuantity: 1000,
  //   availableQuantity: 400,
  //   unit: "m³",
  // },
];

export const constructionContractorsData = [
  // {
  //   id: 1,
  //   name: "Ahmed Abbas",
  //   email: "john.antihl@skyline.com",
  //   phone: "+021155986668",
  //   position: "Contractor",
  //   actions: "View Profile",
  // },
  // {
  //   id: 2,
  //   name: "Ahmed Abbas",
  //   email: "john.antihl@skyline.com",
  //   phone: "+021155986668",
  //   position: "Supplier",
  //   actions: "View Profile",
  // },
  // {
  //   id: 3,
  //   name: "Ahmed Abbas",
  //   email: "john.antihl@skyline.com",
  //   phone: "+021155986668",
  //   position: "Contractor",
  //   actions: "View Profile",
  // },
];

// Sales Data
export const salesOverviewData = [
  // {
  //   id: 1,
  //   overview: "Total Sales",
  //   metrics: "30,000,000",
  // },
  // {
  //   id: 2,
  //   overview: "Construction Ratio",
  //   metrics: "60%",
  // },
  // {
  //   id: 3,
  //   overview: "Total Area",
  //   metrics: "2000 m²",
  // },
  // {
  //   id: 4,
  //   overview: "Service Facilities Area",
  //   metrics: "1500 m²",
  // },
  // {
  //   id: 5,
  //   overview: "Green Areas Percentage",
  //   metrics: "500 m²",
  // },
  // {
  //   id: 6,
  //   overview: "Delivery Date",
  //   metrics: "30/12/2027",
  // },
  // {
  //   id: 7,
  //   overview: "NO. Residential Units",
  //   metrics: "2000",
  // },
  // {
  //   id: 8,
  //   overview: "NO. Commercial Units",
  //   metrics: "2000",
  // },
  // {
  //   id: 9,
  //   overview: "NO. Administrative Units",
  //   metrics: "2000",
  // },
  // {
  //   id: 10,
  //   overview: "Number Of Floors",
  //   metrics: "15",
  // },
];

export const salesMembersData = [
  // {
  //   id: 1,
  //   name: "Ahmed Abbas",
  //   email: "john.smith@skyline.com",
  //   phone: "+021155986668",
  //   position: "Project Manager",
  //   project: "Skyline",
  //   salary: 20000,
  //   commission: 10,
  //   profile: {
  //     fullName: "Mohamed Adel",
  //     email: "superadmin@trendmark.com",
  //     phone: "+1 (555) 123-4567",
  //     bio: [
  //       {
  //         title: "Construction Manager",
  //         company: "Metro Developers",
  //         years: "2018 - 2024",
  //         description:
  //           "Led construction teams for multiple high-rise luxury apartment projects.",
  //       },
  //       {
  //         title: "Site Engineer",
  //         company: "Concrete Co.",
  //         years: "2015 - 2016",
  //         description:
  //           "Managed on-site engineering tasks and ensured safety compliance.",
  //       },
  //     ],
  //     permissions: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     responsibilities: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     securitySettings: {
  //       passwordLastChanged: "30 days ago",
  //     },
  //     currentProject: {
  //       name: "Skyline Tower Renovation",
  //       location: "Downtown District",
  //       duration: "Jan 2022 - Dec 2024",
  //       description:
  //         "Major overhaul of the Skyline Tower including facades and core systems upgrade.",
  //     },
  //     financialLimit: {
  //       amount: "$250,000",
  //       authorizedBy: "Owner",
  //     },
  //   },
  // },
  // {
  //   id: 2,
  //   name: "Ahmed Abbas",
  //   email: "john.smith@skyline.com",
  //   phone: "+021155986668",
  //   position: "Project Manager",
  //   project: "Skyline",
  //   salary: 20000,
  //   commission: 20,
  //   profile: {
  //     fullName: "Mohamed Adel",
  //     email: "superadmin@trendmark.com",
  //     phone: "+1 (555) 123-4567",
  //     bio: [
  //       {
  //         title: "Construction Manager",
  //         company: "Metro Developers",
  //         years: "2018 - 2024",
  //         description:
  //           "Led construction teams for multiple high-rise luxury apartment projects.",
  //       },
  //       {
  //         title: "Site Engineer",
  //         company: "Concrete Co.",
  //         years: "2015 - 2016",
  //         description:
  //           "Managed on-site engineering tasks and ensured safety compliance.",
  //       },
  //     ],
  //     permissions: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     responsibilities: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     securitySettings: {
  //       passwordLastChanged: "30 days ago",
  //     },
  //     currentProject: {
  //       name: "Skyline Tower Renovation",
  //       location: "Downtown District",
  //       duration: "Jan 2022 - Dec 2024",
  //       description:
  //         "Major overhaul of the Skyline Tower including facades and core systems upgrade.",
  //     },
  //     financialLimit: {
  //       amount: "$250,000",
  //       authorizedBy: "Owner",
  //     },
  //   },
  // },
  // {
  //   id: 3,
  //   name: "Ahmed Abbas",
  //   email: "john.smith@skyline.com",
  //   phone: "+021155986668",
  //   position: "Project Manager",
  //   project: "Skyline",
  //   salary: 20000,
  //   commission: 50,
  //   profile: {
  //     fullName: "Mohamed Adel",
  //     email: "superadmin@trendmark.com",
  //     phone: "+1 (555) 123-4567",
  //     bio: [
  //       {
  //         title: "Construction Manager",
  //         company: "Metro Developers",
  //         years: "2018 - 2024",
  //         description:
  //           "Led construction teams for multiple high-rise luxury apartment projects.",
  //       },
  //       {
  //         title: "Site Engineer",
  //         company: "Concrete Co.",
  //         years: "2015 - 2016",
  //         description:
  //           "Managed on-site engineering tasks and ensured safety compliance.",
  //       },
  //     ],
  //     permissions: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     responsibilities: [
  //       "Full Project Access",
  //       "Budget Allocation Approval",
  //       "Staff Oversight",
  //       "Quality & Safety Management",
  //       "Reporting to Owner",
  //     ],
  //     securitySettings: {
  //       passwordLastChanged: "30 days ago",
  //     },
  //     currentProject: {
  //       name: "Skyline Tower Renovation",
  //       location: "Downtown District",
  //       duration: "Jan 2022 - Dec 2024",
  //       description:
  //         "Major overhaul of the Skyline Tower including facades and core systems upgrade.",
  //     },
  //     financialLimit: {
  //       amount: "$250,000",
  //       authorizedBy: "Owner",
  //     },
  //   },
  // },
];

export const salesIncomesData = [
  // {
  //   id: 1,
  //   type: "Total Income",
  //   incomeTillNow: 300000,
  //   no: 850,
  //   installmentsIncome: 3300000,
  //   downPayment: 5300000,
  // },
  // {
  //   id: 2,
  //   type: "Installments",
  //   incomeTillNow: 25000,
  //   no: 230,
  //   installmentsIncome: 3300000,
  //   downPayment: 5300000,
  // },
  // {
  //   id: 3,
  //   type: "Cash",
  //   incomeTillNow: 520000,
  //   no: 150,
  //   installmentsIncome: null,
  //   downPayment: null,
  // },
  // {
  //   id: 4,
  //   type: "Number of Rent commercial units",
  //   incomeTillNow: 15000,
  //   no: 150,
  //   installmentsIncome: null,
  //   downPayment: null,
  // },
  // {
  //   id: 5,
  //   type: "Number of Rent administrative units",
  //   incomeTillNow: 15000,
  //   no: 150,
  //   installmentsIncome: null,
  //   downPayment: null,
  // },
  // {
  //   id: 6,
  //   type: "Number of Rent residential units",
  //   incomeTillNow: 3000,
  //   no: 200,
  //   installmentsIncome: null,
  //   downPayment: null,
  // },
];

export const salesUnitsData = [
  // {
  //   id: 1,
  //   category: "Sale",
  //   name: "Unit A-401",
  //   type: "residential",
  //   methodOfSale: "Installments",
  // },
  // {
  //   id: 2,
  //   category: "Sale",
  //   name: "Unit B-502",
  //   type: "commercial",
  //   methodOfSale: "Cash",
  // },
  // {
  //   id: 3,
  //   category: "Rent",
  //   name: "Unit C-301",
  //   type: "commercial",
  //   methodOfSale: "Monthly Rent",
  // },
  // {
  //   id: 4,
  //   category: "Sale",
  //   name: "Unit D-601",
  //   type: "administrative",
  //   methodOfSale: "Financing",
  // },
];

export const standardsData = [
  // {
  //   id: 1,
  //   title: "Foundation Standards",
  //   description: "Standards for foundation construction and quality control",
  //   category: "Structural",
  //   version: "2.1",
  //   lastUpdated: "15/01/2024",
  //   status: "active",
  //   document: "attached",
  // },
  // {
  //   id: 2,
  //   title: "Electrical Safety Standards",
  //   description: "Electrical installation and safety requirements",
  //   category: "Electrical",
  //   version: "1.5",
  //   lastUpdated: "10/01/2024",
  //   status: "active",
  //   document: "attached",
  // },
  // {
  //   id: 3,
  //   title: "Material Quality Standards",
  //   description: "Quality control standards for construction materials",
  //   category: "Materials",
  //   version: "3.0",
  //   lastUpdated: "08/01/2024",
  //   status: "draft",
  //   document: "no document",
  // },
];

export const storageData = [
  // {
  //   id: 1,
  //   type: "Material",
  //   name: "Steel Rubur",
  //   totalQuantity: 5000,
  //   batchNo: 2,
  //   dimensions: null,
  //   dateOfSupply: "2024-01-15",
  //   supplier: "AMS group",
  //   unit: "m³",
  //   recipient: "Malaverned Mostafa",
  // },
  // {
  //   id: 2,
  //   type: "Material",
  //   name: "Concrete",
  //   totalQuantity: 200,
  //   batchNo: 1,
  //   dimensions: "-",
  //   dateOfSupply: "2024-01-15",
  //   supplier: "AMS group",
  //   unit: "m³",
  //   recipient: "Malaverned Mostafa",
  // },
  // {
  //   id: 3,
  //   type: "Material",
  //   name: "Foundation Concrete",
  //   totalQuantity: "Foundation", // Note: Kept as string as shown in table
  //   batchNo: 2,
  //   dimensions: "-",
  //   dateOfSupply: "2024-01-15",
  //   supplier: "AMS group",
  //   unit: "m³",
  //   recipient: "Malaverned Mostafa",
  // },
  // {
  //   id: 4,
  //   type: "Material",
  //   name: "Steel Frame Rubur",
  //   totalQuantity: "Steel Frame", // Note: Kept as string as shown in table
  //   batchNo: 1,
  //   dimensions: "-",
  //   dateOfSupply: "2024-01-14",
  //   supplier: "AMS group",
  //   unit: "m³",
  //   recipient: "Malaverned Mostafa",
  // },
];

export const memberData = {
  name: "John Smith",
  position: "Project Manager",
  email: "superadmin@jandmark.com",
  phone: "+1 (555) 123-4567",
  currentProject: {
    title: "Skyline Tower Renovation",
    location: "Downtown District",
    duration: "Jan 1994 - Dec 2006",
    description:
      "Major overhaul of the Skyline Tower including facade and core systems upgrade.",
  },
  financialLimit: {
    amount: "$250,000",
    authorizedBy: "Owner",
  },
  responsibilities: [
    "Full Project Access",
    "Budget Allocation Approval",
    "Staff Oversight",
    "Quality & Safety Management",
    "Reporting to Owner",
  ],
};

export const contractorData = {
  name: "John Smith",
  role: "Contractor",
  email: "superadmin@jandmark.com",
  phone: "+1 (555) 123-4567",
  rate: 4,
  currentProject: {
    title: "Skyline Tower Renovation",
    location: "Downtown District",
    duration: "Jan 1994 - Dec 2006",
    description:
      "Major overhaul of the Skyline Tower including facade and core systems upgrade.",
  },
  responsibilities: [
    "Full Project Access",
    "Budget Allocation Approval",
    "Staff Oversight",
    "Quality & Safety Management",
    "Reporting to Owner",
  ],
  bio: [
    {
      position: "Construction Manager",
      company: "Mérito Deveticiens",
      duration: "2018 - 2024",
      description:
        "Led construction teams for multiple high-rise luxury apartment projects.",
    },
    {
      position: "Site Engineer",
      company: "Concrete Co.",
      duration: "2015 - 2018",
      description:
        "Managed on-site engineering tasks and ensured safety compliance.",
    },
  ],
  payments: [
    {
      id: 65,
      paymentName: "January 2025",
      type: "payment",
      amount: 10000,
      item: "Concrete Supply",
      date: "2025-01-15",
    },
    {
      id: 53,
      paymentName: "February 2025",
      type: "deduction",
      amount: 800,
      item: "Labor Payment",
      date: "2025-02-10",
    },
    {
      id: 90,
      paymentName: "January 2025",
      type: "payment",
      amount: 10000,
      item: "Concrete Supply",
      date: "2025-01-15",
    },
    {
      id: 65,
      paymentName: "February 2025",
      type: "payment",
      amount: 8500,
      item: "Labor Payment",
      date: "2025-02-10",
    },
    {
      id: 99,
      paymentName: "January 2025",
      type: "deduction",
      amount: 100,
      item: "Concrete Supply",
      date: "2025-01-15",
    },
    {
      id: 42,
      paymentName: "February 2025",
      type: "deduction",
      amount: 90,
      item: "Labor Payment",
      date: "2025-02-10",
    },
  ],
};
