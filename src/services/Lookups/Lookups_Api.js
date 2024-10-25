import axios from "axios";

//axios.defaults.baseURL = "https://localhost:44340/";
const GetMachineDetailsURL = "/api/Lookups/GetMachineDetails";
const GetLookupsAPIURL = "/api/Lookups/Lookups";

export const GetMachineDetailAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.access_token,
  };

  //console.log("idToken", headerToken.idToken);
  // console.log("User", User);
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
    idToken: userData.access_token,
  };
  var data = {
    LookupName: "banks",
  };
  //console.log("GetLookupsAPI", data.LookupName);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetLookupsAPIResponse = axios.post(GetLookupsAPIURL, data, config);
  return GetLookupsAPIResponse;
};
