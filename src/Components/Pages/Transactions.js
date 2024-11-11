import { useEffect, useState } from "react";
import LoaderComp from "../../Components/Layout/Loader";
import { GetCashWithdrawalTxnAPI } from "../../services/Transactions/Transactions";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import { Logout } from "../../services/Auth";
import { LogoutAPI } from "../../services/Api";

export default function Transactions() {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [CashWithdrawalTransactions, SetCashWithdrawalTransactions] = useState(
    []
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const LogoutUser = () => {
    Logout();
  };
  useEffect(() => {
    setIsLoading(true);
    GetCashWithdrawalTxnAPI(Userdetails)
      .then((response) => {
        if (response.status != "200") {
          LogoutAPI(Userdetails);
          LogoutUser();
        }
        //console.log("MachineDetails", response.data);
        setIsLoading(false);
        SetCashWithdrawalTransactions(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          LogoutAPI(Userdetails);
          LogoutUser();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const columns = [
    {
      name: "BankName",
      selector: (row) => row.BankName,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.Branch,
      sortable: true,
    },
    {
      name: "ATM_TerminalId",
      selector: (row) => row.ATM_TerminalId,
      sortable: true,
    },
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
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "CassetDetails",
      selector: (row) => row.CassetDetails,
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
  );
}
