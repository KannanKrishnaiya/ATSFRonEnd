import axios from "axios";

const GetCassetteRepConfigURL = "/api/Transactions/GetCassetteRepConfig";

const CassetteAvgCalcURL = "/api/VynamicView/CassetteAverageCalculation";
const CasseteCounterDenomURL = "/api/VynamicView/CasseteCounterDenomination";
const CassetteRepCfgURL = "/api/Transactions/CassetteRepForecast";

export const GetCassetteRepConfigAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetCassetteRepConfigResponse = axios.post(
    GetCassetteRepConfigURL,
    data,
    config
  );
  return GetCassetteRepConfigResponse;
};

export const CassetteAvgCalcAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var CassetteAvgCalcResponse = axios.post(CassetteAvgCalcURL, data, config);
  return CassetteAvgCalcResponse;
};

export const CasseteCounterDenomAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var CasseteCounterDenomResponse = axios.post(
    CasseteCounterDenomURL,
    data,
    config
  );
  return CasseteCounterDenomResponse;
};

export const CassetteRepCfgAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var CassetteRepCfgResponse = axios.post(CassetteRepCfgURL, data, config);
  return CassetteRepCfgResponse;
};
