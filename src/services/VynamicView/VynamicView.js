import axios from "axios";

const GetVVDashboardDataURL = "/api/VynamicView/GetVVDashboardData";
const GVynamicViewAllTicketsURL = "/api/VynamicView/Get_VVIM_ALL_TICKET";
const GetAllMachineDetailsAPIResponseURL =
  "/api/VynamicView/Get_AllMachineDetails";

const GetVV_AllMachinesUpTimePercentageURL =
  "/api/VynamicView/GetVV_AllMachinesUpTimePercentage";

const GetVV_AllMachinesUpTimeURL = "/api/VynamicView/GetVV_AllMachinesUpTime";

const GetVV_MachinesUpTimeURL = "/api/VynamicView/GetVV_MachinesUpTime";

const CurrentCDMLevelURL = "/api/VynamicView/CurrentCDMLevel";

const ChequeClearanceRptURL = "/api/VynamicView/ChequeClearanceRpt";

export const GetVVDashboardDataAPI = (
  Userdetails,
  SelectedDashboardDropDownValues
) => {
  const userData = JSON.parse(Userdetails);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };
  var GetVVDashboardDataAPIAPIResponse = axios.post(
    GetVVDashboardDataURL,
    SelectedDashboardDropDownValues,
    config
  );
  return GetVVDashboardDataAPIAPIResponse;
};

export const GetVynamicViewAllTicketsAPI = (Userdetails) => {
  const userData = JSON.parse(Userdetails);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };
  var GetVynamicViewAllTicketsAPIResponse = axios.post(
    GVynamicViewAllTicketsURL,
    null,
    config
  );
  return GetVynamicViewAllTicketsAPIResponse;
};

export const GetAllMachineDetailsAPI = (Userdetails) => {
  const userData = JSON.parse(Userdetails);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };
  var GetAllMachineDetailsAPIResponse = axios.post(
    GetAllMachineDetailsAPIResponseURL,
    null,
    config
  );
  return GetAllMachineDetailsAPIResponse;
};

export const GetVV_AllMachinesUpTimePercentageAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetVV_AllMachinesUpTimePercentageAPIResponse = axios.post(
    GetVV_AllMachinesUpTimePercentageURL,
    data,
    config
  );
  return GetVV_AllMachinesUpTimePercentageAPIResponse;
};

// export const GetVV_AllMachinesUpTimeAPI = (inputs, data) => {
//   const userData = JSON.parse(inputs);
//   let headerToken = {
//     idToken: userData.access_token,
//   };
//   // console.log("idToken", headerToken.idToken);
//   // console.log("User", User);
//   const config = {
//     headers: { Authorization: "Bearer " + headerToken.idToken },
//   };

//   var GetVV_AllMachinesUpTimeResponse = axios.post(
//     GetVV_AllMachinesUpTimeURL,
//     data,
//     config
//   );
//   return GetVV_AllMachinesUpTimeResponse;
// };


export const GetVV_MachinesUpTimeAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetVV_MachinesUpTimeResponse = axios.post(
    GetVV_MachinesUpTimeURL,
    data,
    config
  );
  return GetVV_MachinesUpTimeResponse;
};

export const GetCurrentCDMLevelAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  let data = {
    Atm_TerminalId: null,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetCurrentCDMLevelResponse = axios.post(CurrentCDMLevelURL, data, config);
  return GetCurrentCDMLevelResponse;
};
export const GetChequeClearanceRptAPI = (inputs) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  let data = {
    Atm_TerminalId: null,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetChequeClearanceRptResponse = axios.post(
    ChequeClearanceRptURL,
    data,
    config
  );
  return GetChequeClearanceRptResponse;
};

