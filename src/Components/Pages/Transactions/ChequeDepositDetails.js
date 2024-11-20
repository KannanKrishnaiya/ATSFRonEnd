import { useEffect, useState } from "react";
import { GetChequeDepositDetailsAPI } from "../../../services/Transactions/Transactions";
import { Logout } from "../../../services/Auth";
import { LogoutAPI } from "../../../services/Api";

export default function ChequeDepositDetails({ ChequeDeposit_Input }) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [isLoading, setIsLoading] = useState(false);

  const LogoutUser = () => {
    Logout();
  };

  const [Loc_ChequeDepositDetails, setChequeDepositDetails] = useState();

  const renderHeaderChequeDepositDetails = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>ATM_TerminalId</th>
        <th>SequenceNumber</th>
        <th>Transaction_DateTime</th>
        <th>TransactionTimeStamp</th>
        <th>ChequeSerialNo</th>
        <th>ChequeStoredFront</th>
        <th>ChequeStoredRear</th>
        <th>ChequeMICR</th>
      </tr>
    );
  };

  const renderChequeDepositDetails = (index) => {
      if (isLoading) {
        return "Loading...";
      }

    return Loc_ChequeDepositDetails
      ? Loc_ChequeDepositDetails.map(
          ({
            bankName,
            atM_TerminalId,
            sequenceNumber,
            transaction_DateTime,
            transactionTimeStamp,
            chequeSerialNo,
            chequeStoredFront,
            chequeStoredRear,
            chequeMICR,
          }) => {
            return (
              <tr key={index}>
                <td>{bankName}</td>
                <td>{atM_TerminalId}</td>
                <td>{sequenceNumber}</td>
                <td>{transaction_DateTime}</td>
                <td>{transactionTimeStamp}</td>
                <td>{chequeSerialNo}</td>
                <td>{chequeStoredFront}</td>
                <td>{chequeStoredRear}</td>
                <td>{chequeMICR}</td>
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  function GetChequeDepositDetails() {
    setIsLoading(true);

    GetChequeDepositDetailsAPI(Userdetails, ChequeDeposit_Input)
      .then((response) => {
        // console.log("CashDepositCassette_Input", ChequeDeposit_Input);
        // console.log("tt", response.data);

        setChequeDepositDetails(response.data);
        // console.log("Loc_ChequeDepositDetails", Loc_ChequeDepositDetails);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
           LogoutAPI(Userdetails);
          LogoutUser();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    GetChequeDepositDetails();
  }, []);

  return (
    <div>
      {renderHeaderChequeDepositDetails()}
      {renderChequeDepositDetails()}
    </div>
  );
}
