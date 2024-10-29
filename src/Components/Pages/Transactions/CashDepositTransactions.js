import { useEffect, useState } from "react";
import LoaderComp from "../../../Components/Layout/Loader";
import { GetLookupsAPI } from "../../../services/Lookups/Lookups_Api";
import {
  GetCashDepositTxnAPI,
  GetTransactionDetailsAPI,
} from "../../../services/Transactions/Transactions";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import { Logout } from "../../../services/Auth";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { FaFileAlt } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { jsPDF } from "jspdf";
import { Visibility } from "@mui/icons-material";
import CashDepositCassetteDetails from "./CashDepositCassetteDetails";
import ChequeDepositDetails from "./ChequeDepositDetails";

export default function CashDepositTransactions() {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [CashDepositTransactions, SetCashDepositTransactions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [CashDepositTransactionsInput, setCashDepositTransactionsInput] =
    useState({
      BankName: "",
      Branch: "",
      Atm_TerminalId: "",
      TransactionStartDate: "",
      TransactionEndDate: "",
    });
  var date = new Date();

  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const [TransactionStartDate, setTransactionStartDate] = useState(yesterday);
  const [TransactionEndDate, setTransactionEndDate] = useState(date);

  const [BankName, setBankName] = useState([]);

  const handleInput = (event) => {
    setCashDepositTransactionsInput({
      ...CashDepositTransactionsInput,
      [event.target.name]: event.target.value,
    });

    if (event.target.name == "BankName")
      setBankName.BankName = event.target.value;

    if (event.target.name == "TransactionStartDate")
      setTransactionStartDate.TransactionStartDate = event.target.value;

    if (event.target.name == "TransactionEndDate")
      setTransactionEndDate.TransactionEndDate = event.target.value;
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
    fetchData();
  }, []);

  function GetCashDepositTransactions() {
    // console.log("CashDepositTransactionsInput", CashDepositTransactionsInput);
    setIsLoading(true);
    CashDepositTransactionsInput.TransactionStartDate =
      TransactionStartDate.toLocaleDateString();
    CashDepositTransactionsInput.TransactionEndDate =
      TransactionEndDate.toLocaleDateString();

    GetCashDepositTxnAPI(Userdetails, CashDepositTransactionsInput)
      .then((response) => {
        SetCashDepositTransactions(response.data);
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

  const ResetInputs = (e) => {
    setTransactionStartDate();
    setTransactionEndDate();
    setBankName([]);
    SetCashDepositTransactions([]);
    CashDepositTransactions.BankName = "";
    fetchData();
  };

  const [TransactionDetailsInput, GetTransactionDetailsInput] = useState({
    bankId: 0,
    transactionId: 0,
    sequenceNumber: 0,
    accountNumber: null,
    transactionDate: null,
    cardNumber: null,
  });

  const [TransactionDetails, setTransactionDetails] = useState();
  const [TransactionId, SetTransactionId] = useState();

  function GetTransactionsDetails() {

    // console.log(TransactionDetailsInput);
    
    // setIsLoading(true);
    // alert();
    GetTransactionDetailsAPI(Userdetails, TransactionDetailsInput)
      .then((response) => {
        // console.log("response.data", response.data);
        setTransactionDetails(response.data);
      })
      .catch((err) => {
        //setIsLoading(false);
        // LogoutUser();
      });
  }
  const renderHeader = (index) => {
    return (
      <tr key={index}>
        <th>Cash Deposit Transaction</th>
      </tr>
    );
  };
  const renderTransactionDetails = () => {
    return TransactionDetails ? (
      <tr key={0}>
        <td>
          {TransactionDetails.split("||").map((i, key) => {
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
    let TextString_Split = TextString.split("||");

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(9);
    doc.text(TextString_Split, 10, 20);

    doc.save(FileName + ".pdf");
  };

  const [CashDepositCassetteInput, GetCashDepositCassetteInput] = useState({
    bankId: 0,
    transactionId: 0,
    sequenceNumber: 0,
    accountNumber: null,
    transactionDate: null,
    cardNumber: null,
  });

  const [ChequeDeposit_Input, GetChequeDeposit_Input] = useState({
    bankId: 0,
    transactionId: 0,
    sequenceNumber: 0,
    accountNumber: null,
    transactionDate: null,
    cardNumber: null,
  });


  

  const columns = [
    {
      label: "BankName",
      name: "bankName",
      selector: (row) => row.bankName,
      sortable: true,
    },

    {
      label: "AtM_TerminalId",
      name: "atM_TerminalId",
      selector: (row) => row.atM_TerminalId,
      sortable: true,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "transaction_DateTime",
      label: "TransactionDate",
      selector: (row) => row.transaction_DateTime,
      sortable: true,
    },
    {
      label: "TransactionID",
      name: "transactionID",
      selector: (row) => row.transactionID,
      sortable: true,
    },
    {
      label: "PaymentMethod",
      name: "paymentMethod",
      selector: (row) => row.paymentMethod,
      sortable: true,
    },
    {
      label: "PaymentType",
      name: "paymentType",
      selector: (row) => row.paymentType,
      sortable: true,
    },
    // {
    //   name: "AccountTitle",
    //   selector: (row) => row.AccountTitle,
    //   sortable: true,
    // },
    {
      label: "AccountNumber",
      name: "accountNumber",
      selector: (row) => row.accountNumber,
      sortable: true,
    },
    {
      label: "SequenceNumber",
      name: "sequenceNumber",
      selector: (row) => row.sequenceNumber,
      sortable: true,
    },
    {
      name: "bankId",
      selector: (row) => row.bankId,
      sortable: true,
      options: {
        display: false,
      },
    },
    {
      name: "sequenceNumber",
      label: "View Details",
      selector: (row) => row.sequenceNumber,
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
                              tableMeta.rowData[8];
                            TransactionDetailsInput.sequenceNumber =
                              tableMeta.rowData[9];

                            TransactionDetailsInput.transactionDate =
                              tableMeta.rowData[2];
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
                    <div>
                      <div className="DashboardModal">
                        <button className="Export">
                          <BiExport
                            onClick={() =>
                              downloadPdf(
                                tableMeta.rowData[6] +
                                  "_" +
                                  tableMeta.rowData[7]
                              )
                            }
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
                    </div>
                  )}
                </Popup>
              </div>
              <div>
                <Popup
                  trigger={
                    <div>
                      <div className="tooltip">
                        {tableMeta.rowData[4]?.toLowerCase() === "cash" ? (
                          <div>
                            <MdOutlineAttachMoney
                              className="DataTableIcons"
                              onClick={(row) => {
                                CashDepositCassetteInput.bankId =
                                  tableMeta.rowData[8];
                                CashDepositCassetteInput.sequenceNumber =
                                  tableMeta.rowData[9];

                                CashDepositCassetteInput.transactionDate =
                                  tableMeta.rowData[2];
                                CashDepositCassetteInput.atm_TerminalId =
                                  tableMeta.rowData[1];
                              }}
                            />
                            <span className="tooltiptext">
                              View Cash Transaction Details
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  }
                  className="DashboardPopup"
                  modal
                  nested
                >
                  {(close) => (
                    <div>
                      <div className="DashboardModal">
                        <button className="Export">
                          <BiExport
                            onClick={() =>
                              downloadPdf(
                                tableMeta.rowData[6] +
                                  "_" +
                                  tableMeta.rowData[7]
                              )
                            }
                          ></BiExport>
                        </button>

                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <table id="DashboardPopupTable">
                          <tbody>
                            <CashDepositCassetteDetails
                              CashDepositCassette_Input={
                                CashDepositCassetteInput
                              }
                            />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
              <div>
                <Popup
                  trigger={
                    <div>
                      <div className="tooltip">
                        {tableMeta.rowData[4].toLowerCase() === "cheque" ? (
                          <div>
                            <FaMoneyCheckDollar
                              className="DataTableIcons"
                              onClick={(row) => {
                                ChequeDeposit_Input.bankId =
                                  tableMeta.rowData[8];
                                ChequeDeposit_Input.sequenceNumber =
                                  tableMeta.rowData[9];

                                ChequeDeposit_Input.transactionDate =
                                  tableMeta.rowData[2];
                                ChequeDeposit_Input.atm_TerminalId =
                                  tableMeta.rowData[1];
                              }}
                            />
                            <span className="tooltiptext">
                              View Cheque Transaction Details
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  }
                  className="DashboardPopup"
                  modal
                  nested
                >
                  {(close) => (
                    <div>
                      <div className="DashboardModal">
                        <button className="Export">
                          <BiExport
                            onClick={() =>
                              downloadPdf(
                                tableMeta.rowData[6] +
                                  "_" +
                                  tableMeta.rowData[7]
                              )
                            }
                          ></BiExport>
                        </button>

                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <table id="DashboardPopupTable">
                          <tbody>
                            <ChequeDepositDetails
                              ChequeDeposit_Input={ChequeDeposit_Input}
                            />
                          </tbody>
                        </table>
                      </div>
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
        //  noMatch:"Sorry, No Records Found",
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
                  onClick={GetCashDepositTransactions}
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

      <div>
        {isLoading ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <div className="DivDataTable">
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Cash Deposit Transactions"}
                data={CashDepositTransactions}
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
