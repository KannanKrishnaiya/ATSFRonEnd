import axios from "axios";

const GetUserRoleDetailsByNameURL = "/api/User/GetUserRoleDetailsByName";
const GetUserListURL = "/api/User/GetAllUsers";
const ResetPasswordAPIURL = "/api/Auth/ResetPassword";
const UpdatePasswordURL = "/api/Auth/UpdatePassword";
const CheckUserExistsURL = "/api/Auth/CheckUserExists";

export const GetUserRoleDetailsByNameAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  let User = {
    email: userData.UserName,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetUserRoleDetailsByNameAPIResponse = axios.post(
    GetUserRoleDetailsByNameURL,
    User,
    config
  );
  return GetUserRoleDetailsByNameAPIResponse;
};

export const GetUserListAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetUserListAPIResponse = axios.get(GetUserListURL, config);
  return GetUserListAPIResponse;
};

export const ResetPasswordAPI = (inputs, email) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  let UserCred = {
    email: email,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var ResetPasswordAPIResponse = axios.post(
    ResetPasswordAPIURL,
    UserCred,
    config
  );
  return ResetPasswordAPIResponse;
};

export const UpdatePasswordAPI = (userDetails, body) => {
  const headerToken = {
    idToken: userDetails.token,
  };

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  return axios.post(UpdatePasswordURL, body, config);
};

export const CheckUserExistsAPI = (inputs, email) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  let UserCred = {
    email: email,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var CheckUserExistsAPIResponse = axios.post(
    CheckUserExistsURL,
    UserCred,
    config
  );
  return CheckUserExistsAPIResponse;
};
