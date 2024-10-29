import { useEffect, useState } from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { CSVLink, CSVDownload } from "react-csv";
import { BiExport, BiSolidDetail } from "react-icons/bi";
import { GetTransactionDetailsAPI } from "../../services/Transactions/Transactions";

export default function TransactionPopup(props) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [isLoading, setIsLoading] = useState(false);

  // console.log("props", props.TransactionDetailsBody);

  const [TransactionDetailsInput, GetTransactionDetailsInput] = useState({
    TransactionId: 0,
    SequenceNumber: 0,
    AccountNumber: null,
    TransactionDate: null,
    CardNumber: null,
  });

  const [TransactionDetails, SetTransactionDetails] = useState();

  const renderHeader = (index) => {
    return (
      <tr key={index}>
        <th>Transaction</th>
      </tr>
    );
  };
  const renderTransactionDetails = () => {
    // console.log("renderTransactionDetails");
    GetTransactionsDetails();
    return TransactionDetails ? (
      <tr key={0}>
        <td>
          {/* {TransactionDetails} */}
          {TransactionDetails.split("||").map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
          
        </td>
      </tr>
    ) : (
      "No Records Available"
    );
  };
  function GetTransactionsDetails() {
    setIsLoading(true);
    // console.log("props.TransactionDetailsBody;", props.TransactionDetailsBody);
    TransactionDetailsInput.TransactionId = props.TransactionDetailsBody;
    GetTransactionDetailsAPI(Userdetails, TransactionDetailsInput)
      .then((response) => {
        // console.log("response.data", response.data);
        SetTransactionDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        // LogoutUser();
      });
  }

  useEffect(() => {
    GetTransactionsDetails();
    // GetAllTransactions();
  }, []);

  return (
    <div>
      <Popup
        // trigger={
        //   <div className="tooltip">
        //     <BiSolidDetail className="DataTableIcons" />
        //     <span className="tooltiptext">View Transaction Details</span>
        //   </div>
        // }
        className="DashboardPopup"
        // position="right center"
        modal
        nested
      >
        {(close) => (
          <div className="DashboardModal">
            <button className="Export">
              <BiExport />
            </button>

            <button className="close" onClick={close}>
              &times;
            </button>
            <table id="DashboardPopupTable">
              <tbody>
                {renderHeader()}
                {/* {props.TransactionDetailsBody} */}
                {renderTransactionDetails()}
                {/* {TransactionDetails}   {AllTransactions[dataIndex].TransactionDetails.split(
                  "||"
                ).map((i, key) => {
                  return <div key={key}>{i}</div>;
                })} */}
              </tbody>
            </table>
          </div>
        )}
      </Popup>
    </div>
  );
}
