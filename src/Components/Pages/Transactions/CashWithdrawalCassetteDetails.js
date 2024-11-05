import { useEffect, useState } from "react";
import { GetCashWithdrawalCassetteDetailsAPI } from "../../../services/Transactions/Transactions";
import { Logout } from "../../../services/Auth";
import { setCanvasCreator } from "echarts";

export default function CashWithdrawalCassetteDetails({
  CashWithdrawalCassetteDetails_Input,
}) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [isLoading, setIsLoading] = useState(false);

  const LogoutUser = () => {
    Logout();
  };

  const [Loc_CashWithdrawalCassetteDetails, SetCashWithdrawalCassetteDetails] =
    useState();

  const renderHeaderCashWithdrawalCassetteDetails = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>ATM_TerminalId</th>
        <th>Transaction_DateTime</th>
        <th>CashWithdrawalTxnTimeStamp</th>
        <th>SequenceNumber</th>
        <th>Cassette1</th>
        <th>Cassette2</th>
        <th>Cassette3</th>
        <th>Cassette4</th>
        <th>TotalAmount</th>
        <th>TotalNotes</th>
      </tr>
    );
  };

  const renderCashWithdrawalCassetteDetails = (index) => {
    return Loc_CashWithdrawalCassetteDetails
      ? Loc_CashWithdrawalCassetteDetails.map(
          ({
            bankName,
            atM_TerminalId,
            transactionDate,
            transaction_DateTime,
            cashWithdrawalTxnTimeStamp,
            sequenceNumber,
            cassette1,
            cassette2,
            cassette3,
            cassette4,
            totalAmount,
            totalNotes,
          }) => {
            return (
              <tr key={index}>
                <td>{bankName}</td>
                <td>{atM_TerminalId}</td>
                <td>{transaction_DateTime}</td>
                <td>{cashWithdrawalTxnTimeStamp}</td>
                <td>{sequenceNumber}</td>
                <td>{cassette1}</td>
                <td>{cassette2}</td>
                <td>{cassette3}</td>
                <td>{cassette4}</td>
                <td>{totalAmount}</td>
                <td>{totalNotes}</td>
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  function GetCashWithdrawalCassetteDetails() {
    setIsLoading(true);

    GetCashWithdrawalCassetteDetailsAPI(
      Userdetails,
      CashWithdrawalCassetteDetails_Input
    )
      .then((response) => {
        // console.log(
        //   "CashDepositCassette_Input",
        //   CashWithdrawalCassetteDetails_Input
        // );
        // console.log("tt", response.data);

        SetCashWithdrawalCassetteDetails(response.data);
        // console.log(
        //   "Loc_CashWithdrawalCassetteDetails",
        //   Loc_CashWithdrawalCassetteDetails
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
    GetCashWithdrawalCassetteDetails();
  }, []);

  return (
    <div>
      {renderHeaderCashWithdrawalCassetteDetails()}
      {renderCashWithdrawalCassetteDetails()}
    </div>
  );
}
