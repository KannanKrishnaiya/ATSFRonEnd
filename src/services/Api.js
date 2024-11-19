import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "http://20.196.9.136:35082";
// axios.defaults.baseURL = "http://localhost:35082";
const getTokenURL = "/api/validate/token";
// const LoginURL = "/Token";
const LoginURL = "/api/Auth/login";
const LogoutURL = "/api/Auth/logout";

const GetUserDetailsByUserNameURL = "/api/user/GetUserDetailsByUserName";

const ValidateTransactionsURL = "/api/MS_AlMasraf/ValidateTransactions";

const RegisterUserAPIRURL = "/api/Auth/Register";

const UpdateUserApiURL = "/api/Auth/UpdateUser";

const fetchRefreshTokenApiURL = "/api/Auth/RefreshToken";

export const LoggedInUser = {};

export const RegisterApi = (inputs) => {
  // let data = {
  //   UserName: inputs.name,
  //   Password: inputs.password,
  //   grant_type: "password",
  // };

  var tt = axios.post(
    getTokenURL,
    new URLSearchParams({
      UserName: "user", //gave the values directly for testing
      Password: "user",
      grant_type: "password",
    })
  );
  return tt;
};

export const LoginApi = (inputs) => {
  var UserDetails = axios.post(LoginURL, {
    email: inputs.name,
    passwordHash: inputs.password,
  });
  return UserDetails;
};

export const LogoutAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData?.token,
  };
  let User = {
    email: userData.email,
  };

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var LogoutAPIResponse = axios.post(LogoutURL, User, config);

  return LogoutAPIResponse;
};

export const GetUserDetailsAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData?.token,
  };
  let User = {
    email: userData.email,
  };

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetUserDetailsAPIResponse = axios.post(
    GetUserDetailsByUserNameURL,
    User,
    config
  );

  return GetUserDetailsAPIResponse;
};

export const ValidateTransactions = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.access_token,
  };
  const ValidateFileTransactions = {
    base64string: "",
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };
  var Transactions = axios.post(
    ValidateTransactionsURL,
    ValidateFileTransactions,
    config
  );
  return Transactions;
};

// Register API

export const RegisterUserAPI = (inputs, dataObj) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var RegisterUserAPIResponse = axios.post(
    RegisterUserAPIRURL,
    dataObj,
    config
  );
  return RegisterUserAPIResponse;
};

export const UpdateUserAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData?.token,
  };

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var UpdateUserAPIResponse = axios.post(UpdateUserApiURL, data, config);

  return UpdateUserAPIResponse;
};

export const fetchRefreshTokenAPI = (inputs) => {
  const userData = JSON.parse(inputs);

  let DataToSend = {
    email: userData?.email,
    refreshToken: userData?.token,
  };

  var fetchRefreshTokenApiResponse = axios.post(
    fetchRefreshTokenApiURL,
    DataToSend
  );

  return fetchRefreshTokenApiResponse;
};


// test comt 