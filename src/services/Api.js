import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "http://20.196.9.136:35082";
// axios.defaults.baseURL = "http://localhost:35082";
const getTokenURL = "/api/validate/token";
// const LoginURL = "/Token";
const LoginURL = "/api/Auth/login";
const GetUserDetailsByUserNameURL = "/api/user/GetUserDetailsByUserName";

const ValidateTransactionsURL = "/api/MS_AlMasraf/ValidateTransactions";

const RegisterUserAPIRURL = "/api/Auth/Register";

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
  // const config = {
  //   //crossOriginIsolated: true,
  //   headers: {
  //     // "Access-Control-Allow-Headers": "Content-Type",
  //     "Access-Control-Allow-Origin": "*",
  //     "Cache-Control": "no-cache",
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     // "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
  //   },
  // };

  var UserDetails = axios.post(LoginURL, {
    email: inputs.name,
    passwordHash: inputs.password,
  });

  // var UserDetails = axios.post(
  //   LoginURL,
  //   // config,
  //   qs.stringify({
  //     username: inputs.name,
  //     password: inputs.password,
  //     grant_type: "password",
  //   })
  //   // new URLSearchParams({
  //   //   UserName: "kannan@kannan.com", //data.UserName, //gave the values directly for testing
  //   //   Password: data.Password,
  //   //   grant_type: "password",
  //   // })
  // );
  return UserDetails;
};

export const GetUserDetailsAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData?.token,
  };
  let User = {
    UserName: userData.UserName,
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
