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
            BankName,
            ATM_TerminalId,
            TransactionDate,
            Transaction_DateTime,
            CashWithdrawalTxnTimeStamp,
            SequenceNumber,
            Cassette1,
            Cassette2,
            Cassette3,
            Cassette4,
            TotalAmount,
            TotalNotes,
          }) => {
            return (
              <tr key={index}>
                <td>{BankName}</td>
                <td>{ATM_TerminalId}</td>
                <td>{Transaction_DateTime}</td>
                <td>{CashWithdrawalTxnTimeStamp}</td>
                <td>{SequenceNumber}</td>
                <td>{Cassette1}</td>
                <td>{Cassette2}</td>
                <td>{Cassette3}</td>
                <td>{Cassette4}</td>
                <td>{TotalAmount}</td>
                <td>{TotalNotes}</td>
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
        console.log(
          "CashDepositCassette_Input",
          CashWithdrawalCassetteDetails_Input
        );
        console.log("tt", response.data);

        SetCashWithdrawalCassetteDetails(response.data);
        console.log(
          "Loc_CashWithdrawalCassetteDetails",
          Loc_CashWithdrawalCassetteDetails
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
    GetCashWithdrawalCassetteDetails();
  }, []);

  return (
    <div>
      {renderHeaderCashWithdrawalCassetteDetails()}
      {renderCashWithdrawalCassetteDetails()}
    </div>
  );
}
