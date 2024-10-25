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
            BankName,
            ATM_TerminalId,
            SequenceNumber,
            Transaction_DateTime,
            CashDepositTxnTimeStamp,
            AED_5,
            AED_10,
            AED_20,
            AED_50,
            AED_100,
            AED_200,
            AED_500,
            AED_1000,
            TotalNotes,
            TotalAmount,
          }) => {
            return (
              <tr key={index}>
                <td>{BankName}</td>
                <td>{ATM_TerminalId}</td>
                <td>{SequenceNumber}</td>
                <td>{Transaction_DateTime}</td>
                <td>{CashDepositTxnTimeStamp}</td>
                <td>{AED_5}</td>
                <td>{AED_10}</td>
                <td>{AED_20}</td>
                <td>{AED_50}</td>
                <td>{AED_100}</td>
                <td>{AED_200}</td>
                <td>{AED_500}</td>
                <td>{AED_1000}</td>
                <td>{TotalNotes}</td>
                <td>{TotalAmount}</td>
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
        console.log("CashDepositCassette_Input", CashDepositCassette_Input);
        console.log("tt", response.data);

        setCashDepositCassetteDetails(response.data);
        console.log(
          "Loc_CashDepositCassetteDetails",
          Loc_CashDepositCassetteDetails
        );

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
    GetCashDepositCassetteDetails();
  }, []);

  return (
    <div>
      {renderHeaderCashDepositCassetteDetails()}
      {renderCashDepositCassetteDetails()}
    </div>
  );
}
