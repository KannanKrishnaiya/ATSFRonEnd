import { useEffect, useState } from "react";
import LoaderComp from "../../Components/Layout/Loader";
import "../../assets/styles/CustomStyles/MUIDataTable.css";
import "../../assets/styles/CustomStyles/FileUploader.css";
import { ValidateTransactions } from "../../services/Api";
import { Logout, isAuthenticated } from "../../services/Auth";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FileUploader from "../Utils/FileUploader";

export default function MsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [SuccessTransactions, setSuccessTransactions] = useState([]);
  const [FailureTransactions, setFailureTransactions] = useState([]);
  const Userdetails = localStorage.getItem("LoggedInUser");
  const navigate = useNavigate();

  function ValidateBankFileTransactions() {
    setIsLoading(true);
    //console.log("ValidateBankFileTransactions", Userdetails);
    ValidateTransactions(Userdetails)
      .then((response) => {
        setSuccessTransactions(response.data.MS_AlMasraf_Success_TransModel);
        setFailureTransactions(response.data.MS_AlMasraf_Failure_TransModel);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err.response.status != 200) {
          //console.log("LogoutUser", err.response.status );
          LogoutUser();
        }
      });
  }
  const LogoutUser = () => {
    Logout();
    isAuthenticated();
    //  navigate('/LoginPage');
  };

  const sTransactioncolumns = [
    {
      name: "SequenceNumber",
      selector: (row) => row.SequenceNumber,
      sortable: true,
    },

    {
      name: "TransactionDate",
      selector: (row) => row.TransactionDate,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.Branch,
      sortable: true,
    },
    {
      name: "TransactionTimeStamp",
      selector: (row) => row.TransactionTimeStamp,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "TransactionType",
      selector: (row) => row.TransactionType,
      sortable: true,
    },
  ];

  const fTransactioncolumns = [
    {
      name: "SequenceNumber",
      selector: (row) => row.SequenceNumber,
      sortable: true,
    },

    {
      name: "TransactionDate",
      selector: (row) => row.TransactionDate,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.Branch,
      sortable: true,
    },
    {
      name: "TransactionTimeStamp",
      selector: (row) => row.TransactionTimeStamp,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "TransactionType",
      selector: (row) => row.TransactionType,
      sortable: true,
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
        noMatch: "Sorry, No Records Found",
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
      {isLoading ? (
        <div>
          <LoaderComp />
        </div>
      ) : (
        <div>
          <h1>MS Page</h1>
          <input
            className="btn-grad"
            type="button"
            value="Validate"
            onClick={ValidateBankFileTransactions}
          />
          <br />
          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={"Other Transactions"}
              data={FailureTransactions}
              columns={fTransactioncolumns}
              options={options}
            />
          </ThemeProvider>
          <br />
          <br />
          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={"Successful Transactions"}
              data={SuccessTransactions}
              columns={sTransactioncolumns}
              options={options}
            />
          </ThemeProvider>
        </div>
      )}
      <FileUploader />
    </div>
  );
}
