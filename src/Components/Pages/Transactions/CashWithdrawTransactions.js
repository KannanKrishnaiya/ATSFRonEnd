import { useEffect, useState } from "react";
import LoaderComp from "../../../Components/Layout/Loader";
import {
  GetCashWithdrawalTxnAPI,
  GetTransactionDetailsAPI,
} from "../../../services/Transactions/Transactions";
import { GetLookupsAPI } from "../../../services/Lookups/Lookups_Api";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import { Logout } from "../../../services/Auth";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { BiExport } from "react-icons/bi";
import Popup from "reactjs-popup";
import { FaFileAlt } from "react-icons/fa";

import { MdOutlineAttachMoney } from "react-icons/md";
import { jsPDF } from "jspdf";
import CashWithdrawalCassetteDetails from "./CashWithdrawalCassetteDetails";

export default function CashWithdrawTransactions() {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [CashWithdrawalTransactions, SetCashWithdrawalTransactions] = useState(
    []
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  // const [endDate, setEndDate] = useState(new Date("2014/02/10"));

  const [CashWithDrawalTransactionsInput, setCashWithDrawalTransactionsInput] =
    useState({
      bankName: "",
      branch: "",
      atm_TerminalId: "",
      transactionStartDate: "",
      transactionEndDate: "",
    });

  var date = new Date();
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const [TransactionStartDate, setTransactionStartDate] = useState(yesterday);
  const [TransactionEndDate, setTransactionEndDate] = useState(date);

  const [BankName, setBankName] = useState([]);

  const handleInput = (event) => {
    setCashWithDrawalTransactionsInput({
      ...CashWithDrawalTransactionsInput,
      [event.target.name]: event.target.value,
    });

    if (event.target.name == "bankName")
      setBankName.bankName = event.target.value;

    if (event.target.name == "transactionStartDate")
      setTransactionStartDate.transactionStartDate = event.target.value;

    if (event.target.name == "transactionEndDate")
      setTransactionEndDate.transactionEndDate = event.target.value;
  };

  const LogoutUser = () => {
    Logout();
  };

  async function fetchData() {
    setIsLoading(true);
    GetLookupsAPI(Userdetails)
      .then((response) => {
        // console.log("fetchData");
        setIsLoading(false);
        // setBankName.BankName = response.data;
        const dropDownOptions = response.data.map((x) => ({
          NameEn: x.NameEn,
          Id: x.Id,
        }));
        setBankName([{ NameEn: "Select a Bank", Id: "" }, ...dropDownOptions]);
        // console.log("BankName", BankName);
      })
      .catch((err) => {
        setIsLoading(false);
        //console.log("GetLookupsAPI", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // GetCashWithdrawalTrans();
    fetchData();
  }, []);

  function GetCashWithdrawalTrans() {
    setIsLoading(true);
    CashWithDrawalTransactionsInput.transactionStartDate =
      TransactionStartDate.toLocaleDateString();
    CashWithDrawalTransactionsInput.transactionEndDate =
      TransactionEndDate.toLocaleDateString();

    GetCashWithdrawalTxnAPI(Userdetails, CashWithDrawalTransactionsInput)
      .then((response) => {
        if (response.status != "200") {
          //LogoutUser();
        }
        SetCashWithdrawalTransactions(response.data);
        // console.log(
        //   "SetCashWithdrawalTransactions",
        //   CashWithdrawalTransactions
        // );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          //LogoutUser();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  const ResetInputs = (e) => {
    // setTransactionStartDate();
    // setTransactionEndDate();
    setTransactionStartDate(yesterday);
    setTransactionEndDate(date);
    setBankName([]);
    SetCashWithdrawalTransactions([]);
    CashWithDrawalTransactionsInput.bankName = "";

    fetchData();
    // console.log(
    //   "AllFailedTransactionsInput",
    //   AllFailedTransactionsInput.BankName,
    //   TransactionStartDate,
    //   TransactionEndDate
    // );
  };

  const [
    CashWithdrawalCassetteDetailsInput,
    GetCashWithdrawalCassetteDetailsInput,
  ] = useState({
    bankId: 0,
    transactionId: 0,
    sequenceNumber: 0,
    transactionDate: null,
  });

  const [TransactionDetailsInput, GetTransactionDetailsInput] = useState({
    transactionId: 0,
    sequenceNumber: 0,
    transactionDate: null,
  });
  const [TransactionDetails, setTransactionDetails] = useState();
  const [TransactionId, SetTransactionId] = useState();

  function GetTransactionsDetails() {
    GetTransactionDetailsAPI(Userdetails, TransactionDetailsInput)
      .then((response) => {
        // console.log("response.data", response.data);
        setTransactionDetails(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        LogoutUser();
      });
  }
  const renderHeader = (index) => {
    return (
      <tr key={index}>
        <th>Cash Withdrawal Transaction</th>
      </tr>
    );
  };
  const renderTransactionDetails = () => {
    return TransactionDetails ? (
      <tr key={0}>
        <td>
          {/* {TransactionDetails} */}
          {TransactionDetails?.split("||").map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
        </td>
      </tr>
    ) : (
      "No Records Available"
    );
  };
  const downloadPdf = async (FileName) => {
    let TextString = JSON.stringify({ TransactionDetails });
    let TextString_Split = TextString?.split("||");

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(9);
    doc.text(TextString_Split, 10, 20);

    doc.save(FileName + ".pdf");
  };
  const columns = [
    {
      label: "BankName",
      name: "bankName",
      selector: (row) => row.bankName,
      sortable: true,
    },

    {
      label: "ATM_TerminalId",
      name: "atM_TerminalId",
      selector: (row) => row.atM_TerminalId,
      sortable: true,
    },
    {
      label: "Transaction_DateTime",
      name: "transaction_DateTime",
      selector: (row) => row.transaction_DateTime,
      sortable: true,
    },
    {
      label: "Status",
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      label: "Amount",
      name: "amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      label: "CassetDetails",
      name: "cassetDetails",
      selector: (row) => row.cassetDetails,
      sortable: true,
    },
    {
      label: "SequenceNumber",
      name: "sequenceNumber",
      selector: (row) => row.sequenceNumber,
      sortable: true,
    },
    {
      label: "BankId",
      name: "bankId",
      selector: (row) => row.bankId,
      sortable: true,
      options: {
        display: false,
      },
    },
    {
      label: "TransactionDate",
      name: "transactionDate",
      selector: (row) => row.transactionDate,
      sortable: true,
      options: {
        display: false,
      },
    },
    {
      name: "sequenceNumber",
      label: "View Details",
      selector: (row) => row.transactionId,
      sortable: true,
      filter: true,
      button: true,
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="DT_Div_ViewDetails_flex-container">
              <div>
                <Popup
                  trigger={
                    <div>
                      <div className="tooltip">
                        <FaFileAlt
                          className="DataTableIcons"
                          onClick={(row) => {
                            setTransactionDetails(null);

                            TransactionDetailsInput.bankId =
                              tableMeta.rowData[7];
                            TransactionDetailsInput.sequenceNumber =
                              tableMeta.rowData[9];
                            TransactionDetailsInput.transactionDate =
                              tableMeta.rowData[8];
                            TransactionDetailsInput.atm_TerminalId =
                              tableMeta.rowData[1];

                            GetTransactionsDetails();
                          }}
                        />
                        <span className="tooltiptext">
                          View Transaction Details
                        </span>
                      </div>
                    </div>
                  }
                  className="DashboardPopup"
                  modal
                  nested
                >
                  {(close) => (
                    <div className="DashboardModal">
                      <button className="Export">
                        <BiExport
                          onClick={() => downloadPdf(tableMeta.rowData[6])}
                        ></BiExport>
                      </button>

                      <button className="close" onClick={close}>
                        &times;
                      </button>
                      <table id="DashboardPopupTable">
                        <tbody>
                          {renderHeader()}
                          {renderTransactionDetails()}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Popup>
              </div>

              <div>
                <Popup
                  trigger={
                    <div>
                      <div className="tooltip">
                        <MdOutlineAttachMoney
                          className="DataTableIcons"
                          onClick={(row) => {
                            CashWithdrawalCassetteDetailsInput.bankId =
                              tableMeta.rowData[7];
                            CashWithdrawalCassetteDetailsInput.sequenceNumber =
                              tableMeta.rowData[9];
                            CashWithdrawalCassetteDetailsInput.transactionDate =
                              tableMeta.rowData[8];
                            CashWithdrawalCassetteDetailsInput.atm_TerminalId =
                              tableMeta.rowData[1];
                          }}
                        />
                        <span className="tooltiptext">
                          View Casette Details
                        </span>
                      </div>
                    </div>
                  }
                  className="DashboardPopup"
                  modal
                  nested
                >
                  {(close) => (
                    <div className="DashboardModal">
                      <button className="Export">
                        <BiExport
                          onClick={() => downloadPdf(tableMeta.rowData[6])}
                        ></BiExport>
                      </button>

                      <button className="close" onClick={close}>
                        &times;
                      </button>
                      <table id="DashboardPopupTable">
                        <tbody>
                          <CashWithdrawalCassetteDetails
                            CashWithdrawalCassetteDetails_Input={
                              CashWithdrawalCassetteDetailsInput
                            }
                          />
                          {/* {renderHeader()}
                          {renderTransactionDetails()} */}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    // filterType: "checkbox",
    download: true,
    sort: false,
    responsive: "vertical", // standard | vertical | simple
    selectableRows: "multiple",
    selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: true,
    selectableRowsOnClick: false,
    print: true,
    viewColumns: true,
    searchOpen: false,
    search: true,
    //page: 0,
    // pageSize: 10,
    // rowsPerPage: 10,
    //rowsPerPageOptions: true,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    textLabels: {
      body: {
        noMatch: "",
        // noMatch: "Sorry, No Records Found",
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "off",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    // customToolbarSelect: (selectedRows) => console.log(selectedRows),
  };

  const theme = createTheme({
    components: {
      MUIDataTable: {
        responsiveScroll: {
          minHeight: "580px",
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#2e3885",
            padding: "0px",
            fontSize: 10,
            color: "white",
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#9DA0B1",
            padding: "0px",
            fontSize: 10,
            color: "white",
            innerHeight: 40,
            padding: 10,
          },
          sortAction: {
            "& path": {
              color: "teal",
            },
          },
          sortActive: {
            color: "blue",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            // backgroundColor: "#9DA0B1",
            padding: "0px",
            fontSize: 10,
            //color: "#ffffff",
          },
        },
      },
      MuiTableFooter: {
        styleOverrides: {
          root: {
            // backgroundColor: "#9DA0B1",
            padding: "0px",
            fontSize: 12,
            //color: "#ffffff",
            padding: 0,
          },
        },
      },
    },
  });
  return (
    <div>
      <div className="DivContainer">
        <div className="row">
          {/* <div className="column">
            <span>Bank Name</span>
            <select
              onChange={handleInput}
              name="BankName"
              className="FormControl_Select"
            >
              {BankName.map((option) => (
                <option key={option.Id} value={option.NameEn}>
                  {option.NameEn}
                </option>
              ))}
            </select>
          </div> */}

          {/* <div className="column">
          <span>Branch</span>
          <input
            className="FormControl_input"
            type="text"
            name="Branch"
            placeholder="Branch"
            onChange={handleInput}
          />
        </div>

        <div className="column">
          {" "}
          <span>ATM Terminal Id</span>
          <input
            className="FormControl_input"
            type="text"
            name="ATM_TerminalId"
            placeholder="ATM Terminal Id"
            onChange={handleInput}
          />
        </div>

        <div className="column">
          {" "}
          <span>SequenceNumber</span>
          <input
            className="FormControl_input"
            type="text"
            name="SequenceNumber"
            placeholder="SequenceNumber"
            onChange={handleInput}
          />
        </div> */}

          {/* <div className="column">
            <span>Transaction Start Date</span>
            <ReactMUIDatePicker className="FormControl_input"></ReactMUIDatePicker>
          </div> */}
          <div className="column">
            <span>Transaction Start Date</span>

            <DatePicker
              name="TransactionStartDate"
              selected={TransactionStartDate}
              onChange={(TransactionStartDate) =>
                setTransactionStartDate(TransactionStartDate)
              }
              value={TransactionStartDate}
              format="dd-MM-yyyy"
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yy"
              maxDate={date}
            />
          </div>
          <div className="column">
            <span>Transaction End Date</span>

            <DatePicker
              name="TransactionEndDate"
              onChange={setTransactionEndDate}
              value={TransactionEndDate}
              format="dd-MM-yyyy"
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yy"
              maxDate={date}
            />
          </div>
          <div className="column">
            <div className="flex-buttons">
              <div>
                <input
                  className="btn-grad-Tran"
                  type="button"
                  value="Filter"
                  onClick={GetCashWithdrawalTrans}
                />
              </div>
              <div>
                <input
                  className="btn-grad-Tran"
                  type="button"
                  value="Reset"
                  onClick={ResetInputs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="DivDataTable">
        {isLoading ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <div className="DivDataTable">
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Cash Withdrawal Transactions"}
                data={CashWithdrawalTransactions}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
