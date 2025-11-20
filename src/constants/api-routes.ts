import type { DepartmentType } from "@/types/default";

export const API_PATHS = {
  DASHBOARD: {
    GET: "/dash/dashboard/home",
  },
  NOTIFICATIONS: {
    GET_ALL: "/dash/notifications/all",
  },
  USER: {
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    SIGN_UP: (token: string) => `/user/invitations/${token}/accept`,
    ME: "/user/me",
    INVITATION: {
      ADD: "/user/invitations",
      GET_ALL: "/user/invitations/mine",
    },
    PROFILE: {
      UPDATE: "/user/updateMyProf",
      UPDATE_PASSWORD: "/user/change-password",
      UPDATE_IMG: "/user/me/profile-image?profileImage",
    },
    COMPANY: {
      GET: "/user/company-info",
      UPDATE: "/user/update-company",
    },
    GET_ALL: "/user/get-Users-Info",
    GET_ALL_FILTERED: "/user/user-search",
    UPDATE: "/user/editRole",
    ASSIGN_PROJECTS: (userId: string) => `/user/assigned-project/${userId}`,
    DELETE: "/user/delete-user",
  },
  CLIENTS: {
    ADD: "/client/add",
    GET_ALL: "/dash/clients/all",
    GET_ALL_FILTERED: "/dash/search/clients",
  },
  PROJECTS: {
    ADD: "/project/excel",
    GET: (projectId: string) => `/dash/brief/${projectId}`,
    GET_DEPARTMENT_GENERAL: (projectId: string) =>
      `/dash/department/${projectId}`,
    GET_DEPARTMENT: (projectId: string, department: DepartmentType) =>
      `/dash/department/${department}/${projectId}`,
    GET_SALES: (projectId: string) => `/dash/sale/projectId/${projectId}`,
    GET_STORAGE: (projectId: string) => `/dash/materialReport/${projectId}`,
    GET_ALL_BUILDINGS: (projectId: string) => `/dash/buildings/${projectId}`,
    GET_ALL_FLOORS: (projectId: string, buildingId: string) =>
      `/dash/floors/${projectId}/${buildingId}`,
    GET_ALL_UNITS: (projectId: string, buildingId: string, floorId: string) =>
      `/dash/units/${projectId}/${buildingId}/${floorId}`,
    GET_MEMBER: (projectId: string, memberId: string) =>
      `/dash/${projectId}/memberProfileDetails/${memberId}`,
    GET_ITEM: (projectId: string, itemId: string) =>
      `/dash/processing/${projectId}/${itemId}`,
    GET_UNIT: (projectId: string, unitId: string) =>
      `/dash/unitDetails/projectId/${projectId}/unitId/${unitId}`,
  },
  REPORTS: {
    ADD: (projectId: string) => `reports/project/${projectId}/generate`,
    GET_ALL: "/reports/list",
  },
  MESSAGES: {
    ADD: "/user/send",
    UPDATE: (messageId: string) => `/user/update-message/${messageId}`,
    GET_ALL: "/user/getmssage",
  },
  PAYMENTS: {
    ADD: (projectId: string) => `/dash/addPayment/projectId/${projectId}`,
    UPDATE: (projectId: string, paymentId: string) =>
      `/dash/updatePayment/projectId/${projectId}/${paymentId}`,
    GET_ALL: "/dash/getPayment",
  },
};
