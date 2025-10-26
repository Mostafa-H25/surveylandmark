export const API_PATHS = {
  USER: {
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    ME: "/user/me",
    INVITE: "/user/invitations",
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
    UPDATE: "/user/editRole",
    ASSIGN_PROJECTS: "/user/assigned-project",
    DELETE: "/user/delete-user",
  },
  CLIENTS: {
    ADD: "/client/add",
    GET_ALL: "/dash/clients/all",
  },
  PROJECTS: {
    ADD: "/project/excel",
    GET_ALL: "###",
  },
};
