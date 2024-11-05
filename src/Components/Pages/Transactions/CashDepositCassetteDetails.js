import { useEffect, useState } from "react";
import { GetCashDepositCassetteDetailsAPI } from "../../../services/Transactions/Transactions";
import { Logout } from "../../../services/Auth";

export default function CashDepositCassetteDetails({
  CashDepositCassette_Input,
}) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [isLoading, setIsLoading] = useState(false);

  const LogoutUser = () => {
    Logout();
  };

  const [Loc_CashDepositCassetteDetails, setCashDepositCassetteDetails] =
    useState();

  const renderHeaderCashDepositCassetteDetails = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>ATM_TerminalId</th>
        <th>SequenceNumber</th>
        <th>Transaction_DateTime</th>
        <th>CashDepositTxnTimeStamp</th>
        <th>AED_5</th>
        <th>AED_10</th>
        <th>AED_20</th>
        <th>AED_50</th>
        <th>AED_100</th>
        <th>AED_200</th>
        <th>AED_500</th>
        <th>AED_1000</th>
        <th>TotalNotes</th>
        <th>TotalAmount </th>
      </tr>
    );
  };

  const renderCashDepositCassetteDetails = (index) => {
    return Loc_CashDepositCassetteDetails
      ? Loc_CashDepositCassetteDetails.map(
          ({
            bankName,
            atM_TerminalId,
            sequenceNumber,
            transaction_DateTime,
            cashDepositTxnTimeStamp,
            aeD_5,
            aeD_10,
            aeD_20,
            aeD_50,
            aeD_100,
            aeD_200,
            aeD_500,
            aeD_1000,
            totalNotes,
            totalAmount,
          }) => {
            return (
              <tr key={index}>
                <td>{bankName}</td>
                <td>{atM_TerminalId}</td>
                <td>{sequenceNumber}</td>
                <td>{transaction_DateTime}</td>
                <td>{cashDepositTxnTimeStamp}</td>
                <td>{aeD_5}</td>
                <td>{aeD_10}</td>
                <td>{aeD_20}</td>
                <td>{aeD_50}</td>
                <td>{aeD_100}</td>
                <td>{aeD_200}</td>
                <td>{aeD_500}</td>
                <td>{aeD_1000}</td>
                <td>{totalNotes}</td>
                <td>{totalAmount}</td>
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  function GetCashDepositCassetteDetails() {
    setIsLoading(true);

    GetCashDepositCassetteDetailsAPI(Userdetails, CashDepositCassette_Input)
      .then((response) => {
        // console.log("CashDepositCassette_Input", CashDepositCassette_Input);
        // console.log("tt", response.data);

        setCashDepositCassetteDetails(response.data);
        // console.log(
        //   "Loc_CashDepositCassetteDetails",
        //   Loc_CashDepositCassetteDetails
        // );

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          LogoutUser();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    GetCashDepositCassetteDetails();
  }, []);

  return (
    <div>
      {renderHeaderCashDepositCassetteDetails()}
      {renderCashDepositCassetteDetails()}
    </div>
  );
}
