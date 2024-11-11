import { useEffect, useState, useMemo } from "react";
import LoaderComp from "../../../Components/Layout/Loader";
import {
  GetAllTxnAPI,
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
import "../../../assets/styles/CustomStyles/FormControls.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { BiExport, BiSolidDetail } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";

export default function ViewAllTransactions() {
     const LoggedInUserRoleDetailsData = useSelector(
       (state) => state.user.userDetails
     );
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [AllTransactions, SetAllTransactions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [AllTransactionsInput, setAllTransactionsInput] = useState({
    bankName: LoggedInUserRoleDetailsData?.BankName
      ? LoggedInUserRoleDetailsData?.BankName
      : "",
    bankId: LoggedInUserRoleDetailsData?.BankId
      ? LoggedInUserRoleDetailsData?.BankId
      : LoggedInUserRoleDetailsData?.BankId === 0
      ? 0
      : "",
    branch: "",
    atm_TerminalId: "",
    transactionStartDate: "",
    transactionEndDate: "",
  });

  const [TransactionDetailsInput, GetTransactionDetailsInput] = useState({
    transactionId: 0,
    sequenceNumber: 0,
    accountNumber: null,
    transactionDate: null,
    cardNumber: null,
  });

  const date = new Date();
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const [TransactionStartDate, setTransactionStartDate] = useState(yesterday);
  const [TransactionEndDate, setTransactionEndDate] = useState(date);

  const [TransactionDetails, setTransactionDetails] = useState();
  const [TransactionId, SetTransactionId] = useState();
  const [BankName, setBankName] = useState([]);

  const handleInput = (event) => {
    setAllTransactionsInput({
      ...AllTransactionsInput,
      [event.target.name]: event.target.value,
    });

    if (event.target.name == "BankName")
      setBankName.bankName = event.target.value;

    if (event.target.name == "TransactionStartDate")
      setTransactionStartDate.transactionStartDate = event.target.value;

    if (event.target.name == "TransactionEndDate")
      setTransactionEndDate.transactionEndDate = event.target.value;
  };

  const LogoutUser = () => {
    Logout();
  };

  const renderHeader = (index) => {
    return (
      <tr key={index}>
        <th>Transaction</th>
      </tr>
    );
  };
  const renderTransactionDetails = () => {
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

  function fetchData() {
    setIsLoading(true);
    GetLookupsAPI(Userdetails)
      .then((response) => {
        //console.log("fetchData");
        setIsLoading(false);
        // setBankName.BankName = response.data;
        const dropDownOptions = response.data.map((x) => ({
          NameEn: x.NameEn,
          Id: x.Id,
        }));
        setBankName([{ NameEn: "Select a Bank", Id: "" }, ...dropDownOptions]);
        //console.log("BankName", BankName);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          Logout();
        }

        //alert("GetLookupsAPI", err);
        // window.location = "ErrorPage_404";
        window.location = "login";
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
    // GetAllTransactions();
  }, []);

  function GetAllTransactions() {
    //console.log("AllTransactionsInput", AllTransactionsInput);
    setIsLoading(true);
    AllTransactionsInput.transactionStartDate =
      TransactionStartDate.toLocaleDateString();
    AllTransactionsInput.transactionEndDate =
      TransactionEndDate.toLocaleDateString();

    GetAllTxnAPI(Userdetails, AllTransactionsInput)
      .then((response) => {
        SetAllTransactions(response.data);
        // console.log("SetAllTransactions", response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          Logout();
        }


        // LogoutUser();
      });
  }

  function GetTransactionsDetails() {
    // setIsLoading(true);
    // alert();
    GetTransactionDetailsAPI(Userdetails, TransactionDetailsInput)
      .then((response) => {
        // console.log("response.data", response.data);
        setTransactionDetails(response.data);
        // <TransactionPopup TransactionDetailsBody={InputTransactionId} />;
        //setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status != 200) {
          Logout();
        }

        //setIsLoading(false);
        // LogoutUser();
      });
  }

  const ResetInputs = (e) => {
    // setTransactionStartDate();
    // setTransactionEndDate();
    setTransactionStartDate(yesterday);
    setTransactionEndDate(date);
    setBankName([]);
    SetAllTransactions([]);
    AllTransactionsInput.bankName = "";

    fetchData();
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

  const Transactioncolumns = useMemo(() => [
    {
      label: "BankName",
      name: "bankName",
      selector: (row) => row.bankName,
      options: {
        sort: true,
        filter: true,
      },
    },
    {
      label: "ATM_TerminalId",
      name: "atM_TerminalId",
      selector: (row) => row.atM_TerminalId,
      sortable: true,
      filter: true,
    },
    {
      label: "Transaction_DateTime",
      name: "transaction_DateTime",
      selector: (row) => row.transaction_DateTime,
      sortable: true,
      filter: true,
    },
    {
      label: "TransactionType",
      name: "transactionType",
      selector: (row) => row.transactionType,
      sortable: true,
      filter: true,
    },
    {
      label: "TransactionStatus",
      name: "transactionStatus",
      selector: (row) => row.transactionStatus,
      sortable: true,
      filter: true,
    },
    {
      label: "AccountNumber",
      name: "accountNumber",
      selector: (row) => row.accountNumber,
      sortable: true,
      filter: true,
    },
    {
      label: "CardNumber",
      name: "cardNumber",
      selector: (row) => row.cardNumber,
      sortable: true,
      filter: true,
    },
    {
      name: "sequenceNumber",
      label: "SequenceNumber",
      selector: (row) => row.sequenceNumber,
      sortable: true,
      filter: true,
    },
    {
      name: "allTransactionId",
      label: "TransactionId",
      selector: (row) => row.allTransactionId,
      sortable: true,
      filter: true,
      options: {
        display: false,
      },
    },
    {
      name: "transactionId",
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
            <div>
              {/* <button
                onClick={(row) => {
                  console.log(
                    "value =" + value,
                    "rowData =" + tableMeta.rowData[7],
                    "updateValue =" + updateValue
                  );
                  TransactionDetailsInput.TransactionId = tableMeta.rowData[7];

                  console.log(
                    "TransactionDetailsInput =",
                    TransactionDetailsInput
                  );
                  GetTransactionsDetails();
                }}
              >
                Add
              </button> */}
              <Popup
                trigger={
                  <div>
                    <div className="tooltip">
                      <FaFileAlt
                        className="DataTableIcons"
                        onClick={(row) => {
                          // console.log(
                          //   "value =" + value,
                          //   "rowData =" + tableMeta.rowData[7],
                          //   "updateValue =" + updateValue
                          // );
                          setTransactionDetails(null);
                          TransactionDetailsInput.transactionId =
                            tableMeta.rowData[8];

                          // console.log(
                          //   "TransactionDetailsInput =",
                          //   TransactionDetailsInput
                          // );
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
                        onClick={() =>
                          downloadPdf(
                            tableMeta.rowData[5] +
                              "_" +
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
                )}
              </Popup>
            </div>
          );
        },
      },
    },
  ]);

  const options = {
    filter: true,
    filterType: "checkbox",
    download: true,
    selectableRowsHeader: true,
    sort: false,
    filterType: "dropdown",
    responsive: "vertical", // standard | vertical | simple
    selectableRows: "multiple",
    selectableRowsHideCheckboxes: true,
    // selectableRowsOnClick: true,
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

    // onCellClick: (cell) => {
    //   //console.log("cell", cell);
    //   // SetTransactionId(cell);
    //   //console.log("trid", TransactionId);
    // },

    // onRowClick: (selectedRows) => {
    //   console.log("selectedRows", selectedRows[7]);
    //   GetTransactionsDetails(selectedRows[7]);
    //   // <TransactionPopup TransactionDetailsBody={selectedRows[7]} />;
    // },
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
            {" "}
            <span>Branch</span>
            <input
              className="FormControl_input"
              type="text"
              name="Branch"
              placeholder="Branch"
              onChange={handleInput}
            />
          </div> */}

          {/* <div className="column">
            {" "}
            <span>ATM Terminal Id</span>
            <input
              className="FormControl_input"
              type="text"
              name="ATM_TerminalId"
              placeholder="ATM Terminal Id"
              onChange={handleInput}
            />
          </div> */}

          {/* <div className="column">
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
            {/* <input
              className="FormControl_input"
              type="date"
              name="TransactionStartDate"
              placeholder="Transaction Start Date"
              onChange={handleDateInput}
              format="dd-MM-yyyy"
            /> */}

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
            {/* <input
              className="FormControl_input"
              type="date"
              name="TransactionEndDate"
              placeholder="Transaction End Date"
              onChange={handleDateInput}
            /> */}
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
                  onClick={GetAllTransactions}
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
                title={"All Transactions"}
                data={AllTransactions}
                columns={Transactioncolumns}
                options={options}
                selectableRows
              />
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
