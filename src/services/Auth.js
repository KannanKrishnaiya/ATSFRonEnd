import store from "../redux/store";
import { clearUser } from "../redux/userSlice";
import {
  getUserData,
  removeUserData,
  GetLoggedInUserRoleDetails,
} from "./Storage";

export const isAuthenticated = () => {
  return getUserData() != null ? true : false;
};

export const Logout = () => {
  store.dispatch(clearUser());
  removeUserData();
};

export const GetUserRoleDetails = () => {
  return GetLoggedInUserRoleDetails();
};
