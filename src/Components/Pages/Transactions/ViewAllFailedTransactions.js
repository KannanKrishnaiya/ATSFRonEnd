import { useEffect, useState } from "react";
import LoaderComp from "../../Layout/Loader";
import {
  GetAllFailedTxnAPI,
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
import { CSVLink, CSVDownload } from "react-csv";
import { BiExport } from "react-icons/bi";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { FaFileAlt } from "react-icons/fa";
import { jsPDF } from "jspdf";

export default function ViewAllFailedTransactions() {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [AllFailedTransactions, SetAllFailedTransactions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [AllFailedTransactionsInput, setAllFailedTransactionsInput] = useState({
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
    setAllFailedTransactionsInput({
      ...AllFailedTransactionsInput,
      [event.target.name]: event.target.value,
    });

    if (event.target.name == "bankName")
      setBankName.bankName = event.target.value;

    if (event.target.name == "transactionStartDate")
      setTransactionStartDate.transactionStartDate = event.target.value;

    if (event.target.name == "transactionEndDate")
      setTransactionEndDate.transactionEndDate = event.target.value;

    // console.log(
    //   "AllFailedTransactionsInput",
    //   setBankName.BankName,
    //   setTransactionStartDate.TransactionStartDate,
    //   setTransactionEndDate.TransactionEndDate
    // );
  };

  // const handleDateInput = (event) => {

  // };

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
    // GetAllFailedTransactions();
  }, []);

  function GetAllFailedTransactions() {
    // console.log("AllFailedTransactionsInput", AllFailedTransactionsInput);
    // console.log(
    //   "AllFailedTransactionsInput",
    //   AllFailedTransactionsInput.BankName,
    //   TransactionStartDate,
    //   TransactionEndDate
    // );
    AllFailedTransactionsInput.transactionStartDate =
      TransactionStartDate.toLocaleDateString();
    AllFailedTransactionsInput.transactionEndDate =
      TransactionEndDate.toLocaleDateString();

    setIsLoading(true);
    GetAllFailedTxnAPI(Userdetails, AllFailedTransactionsInput)
      .then((response) => {
        SetAllFailedTransactions(response.data);
        // console.log("SetAllFailedTransactions", response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        LogoutUser();
      });
  }

  const ResetInputs = (e) => {
    setTransactionStartDate();
    setTransactionEndDate();
    setBankName([]);
    SetAllFailedTransactions([]);
    AllFailedTransactionsInput.bankName = "";

    fetchData();
  };

  const [TransactionDetailsInput, GetTransactionDetailsInput] = useState({
    transactionId: 0,
    sequenceNumber: 0,
    accountNumber: null,
    transactionDate: null,
    cardNumber: null,
  });
  const [TransactionDetails, setTransactionDetails] = useState();
  const [TransactionId, SetTransactionId] = useState();
  function GetTransactionsDetails() {
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
        <th>Failed Transaction</th>
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
  const downloadPdf = async (FileName) => {
    let TextString = JSON.stringify({ TransactionDetails });
    let TextString_Split = TextString.split("||");

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(9);
    doc.text(TextString_Split, 10, 20);

    doc.save(FileName + ".pdf");
  };
  const Transactioncolumns = [
    {
      label: "BankName",
      name: "bankName",
      selector: (row) => row.bankName,
      sortable: true,
    },

    // {
    //   name: "Branch",
    //   selector: (row) => row.Branch,
    //   sortable: true,
    // },

    {
      name: "atM_TerminalId",
      selector: (row) => row.atM_TerminalId,
      sortable: true,
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "TransactionDate",
    //   selector: (row) => row.TransactionDate,
    //   sortable: true,
    // },
    {
      label: "Transaction_DateTime",
      name: "transaction_DateTime",
      selector: (row) => row.transaction_DateTime,
      sortable: true,
    },
    {
      label: "TransactionType",
      name: "transactionType",
      selector: (row) => row.transactionType,
      sortable: true,
    },
    {
      label: "TransactionStatus",
      name: "transactionStatus",
      selector: (row) => row.transactionStatus,
      sortable: true,
    },
    // {
    //   name: "PaymentMethod",
    //   selector: (row) => row.PaymentMethod,
    //   sortable: true,
    // },

    {
      label: "MultipleTxnsSeqNumber",
      name: "multipleTxnsSeqNumber",
      selector: (row) => row.multipleTxnsSeqNumber,
      sortable: true,
    },

    {
      name: "allTransactionId",
      label: "View Details",
      selector: (row) => row.allTransactionId,
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
                          TransactionDetailsInput.transactionId = 0;
                          TransactionDetailsInput.transactionId =
                            tableMeta.rowData[6];

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
                        onClick={() => downloadPdf(tableMeta.rowData[5])}
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

  // const [openModal, setOpenModal] = useState(false);

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
                  onClick={GetAllFailedTransactions}
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
                title={"Failed Transactions"}
                data={AllFailedTransactions}
                columns={Transactioncolumns}
                options={options}
              />
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
