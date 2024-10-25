import { useEffect, useState } from "react";
import { GetChequeDepositDetailsAPI } from "../../../services/Transactions/Transactions";
import { Logout } from "../../../services/Auth";

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
    return Loc_ChequeDepositDetails
      ? Loc_ChequeDepositDetails.map(
          ({
            BankName,
            ATM_TerminalId,
            SequenceNumber,
            Transaction_DateTime,
            TransactionTimeStamp,
            ChequeSerialNo,
            ChequeStoredFront,
            ChequeStoredRear,
            ChequeMICR,
          }) => {
            return (
              <tr key={index}>
                <td>{BankName}</td>
                <td>{ATM_TerminalId}</td>
                <td>{SequenceNumber}</td>
                <td>{Transaction_DateTime}</td>
                <td>{TransactionTimeStamp}</td>
                <td>{ChequeSerialNo}</td>
                <td>{ChequeStoredFront}</td>
                <td>{ChequeStoredRear}</td>
                <td>{ChequeMICR}</td>
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
        console.log("CashDepositCassette_Input", ChequeDeposit_Input);
        console.log("tt", response.data);

        setChequeDepositDetails(response.data);
        console.log("Loc_ChequeDepositDetails", Loc_ChequeDepositDetails);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          // LogoutUser();
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
