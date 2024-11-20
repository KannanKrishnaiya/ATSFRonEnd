import axios from "axios";

const GetCashWithdrawalTransactionsURL =
  "/api/Transactions/GetCashWithdrawalTransactions";

const GetCashDepositTransactionsURL =
  "/api/Transactions/GetCashDepositTransactions";

const GetAllTransactionsURL = "/api/Transactions/GetAllTransactions";
const GetAllFailedTransactionsURL =
  "/api/Transactions/GetAllFailedTransactions";

const GetGetOtherTransactionsURL = "/api/Transactions/GetOtherTransactions";
const GetTransactionDetailsURL = "/api/Transactions/GetTransactionDetails";
const GetCashDepositCassetteDetailsURL =
  "/api/Transactions/GetCashDepositCassetteDetails";

const GetChequeDepositDetailsURL = "/api/Transactions/GetChequeDepositDetails";

const GetCashWithdrawalCassetteDetailsURL =
  "/api/Transactions/GetCashWithdrawalCassetteDetails";

const GetAllMailConfigURL = "/api/Transactions/GetAllMailConfig";

export const GetCashWithdrawalTxnAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };

  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetCashWithdrawalTxnAPIResponse = axios.post(
    GetCashWithdrawalTransactionsURL,
    data,
    config
  );
  return GetCashWithdrawalTxnAPIResponse;
};

export const GetCashDepositTxnAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };

  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetCashDepositTxnAPIResponse = axios.post(
    GetCashDepositTransactionsURL,
    data,
    config
  );
  return GetCashDepositTxnAPIResponse;
};

export const GetAllTxnAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };

  console.log(data);

  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetAllTxnAPIResponse = axios.post(GetAllTransactionsURL, data, config);
  return GetAllTxnAPIResponse;
};

export const GetTransactionDetailsAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetTransactionDetailsAPIResponse = axios.post(
    GetTransactionDetailsURL,
    data,
    config
  );
  return GetTransactionDetailsAPIResponse;
};

export const GetOtherTxnAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetAllTxnAPIResponse = axios.post(
    GetGetOtherTransactionsURL,
    data,
    config
  );
  return GetAllTxnAPIResponse;
};

export const GetAllFailedTxnAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetAllTxnAPIResponse = axios.post(
    GetAllFailedTransactionsURL,
    data,
    config
  );
  return GetAllTxnAPIResponse;
};

export const GetCashDepositCassetteDetailsAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetCashDepositCassetteDetailsAPIResponse = axios.post(
    GetCashDepositCassetteDetailsURL,
    data,
    config
  );
  return GetCashDepositCassetteDetailsAPIResponse;
};

export const GetChequeDepositDetailsAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetChequeDepositDetailsAPIResponse = axios.post(
    GetChequeDepositDetailsURL,
    data,
    config
  );
  return GetChequeDepositDetailsAPIResponse;
};

export const GetCashWithdrawalCassetteDetailsAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  // console.log("idToken", headerToken.idToken);
  // console.log("User", User);
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetCashWithdrawalCassetteDetailsPIResponse = axios.post(
    GetCashWithdrawalCassetteDetailsURL,
    data,
    config
  );
  return GetCashWithdrawalCassetteDetailsPIResponse;
};




export const GetAllMailConfigAPI = (inputs, data) => {
  const userData = JSON.parse(inputs);
  let headerToken = {
    idToken: userData.token,
  };
  const config = {
    headers: { Authorization: "Bearer " + headerToken.idToken },
  };

  var GetAllMailConfigAPIResponse = axios.get(GetAllMailConfigURL, config);
  return GetAllMailConfigAPIResponse;
};