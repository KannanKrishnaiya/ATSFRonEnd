import axios from "axios";

const GetUserRoleDetailsByNameURL = "/api/User/GetUserRoleDetailsByName";

export const GetUserRoleDetailsByNameAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.access_token,
  };
  let User = {
    UserName: userData.UserName,
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
