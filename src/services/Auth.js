import {
  getUserData,
  removeUserData,
  GetLoggedInUserRoleDetails,
} from "./Storage";

export const isAuthenticated = () => {
  return getUserData() != null ? true : false;
};

export const Logout = () => {
  
  removeUserData();
};

export const GetUserRoleDetails = () => {
  return GetLoggedInUserRoleDetails();
};
