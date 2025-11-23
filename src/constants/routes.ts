export const ROUTES = {
  BASE: "/",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  DASHBOARD: "/dashboard",
  USERS: "/users-management",
  CLIENTS: "/clients-and-projects",
  PROJECT: (projectId: string = ":projectId") =>
    `/clients-and-projects/${projectId}`,
  UNIT: (projectId: string = ":projectId", unitId: string = ":unitId") =>
    `/clients-and-projects/${projectId}/units/${unitId}`,
  ITEM: (projectId: string = ":projectId", itemId: string = ":itemId") =>
    `/clients-and-projects/${projectId}/items/${itemId}`,
  MEMBER: (projectId: string = ":projectId", memberId: string = ":memberId") =>
    `/clients-and-projects/${projectId}/members/${memberId}`,
  CONTRACTOR: (
    projectId: string = ":projectId",
    contractorId: string = ":contractorId",
  ) => `/clients-and-projects/${projectId}/contractors/${contractorId}`,
  NEW_PROJECT: "/create-project",
  MESSAGES: "/notifications-and-messages",
  REPORTS: "/reports",
  PAYMENTS: "/payments",
  SETTINGS: "/settings",
  INVITE: "/invite-team-members",
  FORGOT_PASSWORD: "",
  GENERAL: {},
};
