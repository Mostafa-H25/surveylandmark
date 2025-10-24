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
    GET_ALL: "/user/get-Users-Info",
    UPDATE: "/user/editRole",
    ASSIGN_PROJECTS: "/user/assigned-project",
    DELETE: "/user/delete-user",
  },
  PROJECTS: {
    GET_ALL: "###",
  },
};
