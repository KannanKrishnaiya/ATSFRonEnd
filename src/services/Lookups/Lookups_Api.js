import axios from "axios";

//axios.defaults.baseURL = "https://localhost:44340/";
const GetMachineDetailsURL = "/api/Lookups/GetMachineDetails";
const GetLookupsAPIURL = "/api/Lookups/Lookups";
// const GetLookupsAPIURL = "/api/Lookups/GetLookupsBanks";
const GetLookupsUserRolesAPIURL = "/api/Lookups/GetLookupUserRoles";

export const GetMachineDetailAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetMachineDetailAPIResponse = axios.post(
    GetMachineDetailsURL,
    null,
    config
  );
  return GetMachineDetailAPIResponse;
};

export const GetLookupsAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // var data = {
    
  // };
  var data = {
    lookups: "banks",
  };

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetLookupsAPIResponse = axios.post(GetLookupsAPIURL, data, config);
  return GetLookupsAPIResponse;
};

export const GetLookupsUserRoleAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  var data = {
    email: userData?.UserName,
  };

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetLookupsUserRoleAPIResponse = axios.post(
    GetLookupsUserRolesAPIURL,
    data,
    config
  );
  return GetLookupsUserRoleAPIResponse;
};
