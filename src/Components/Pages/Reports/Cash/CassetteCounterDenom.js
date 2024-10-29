import { useEffect, useState } from "react";
import LoaderComp from "../../../Layout/Loader";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import {
  CasseteCounterDenomAPI,
  CassetteAvgCalcAPI,
  GetCassetteAverageConfigAPI,
} from "../../../../services/CashReplenish/CashReplenish";
import { Logout } from "../../../../services/Auth";

export default function CassetteCounterDenom() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");

  const [CasseteCounterDenom, SetCasseteCounterDenom] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    CasseteCounterDenomAPI(Userdetails)
      .then((response) => {
        if (response.status != "200") {
          LogoutUser();
        }
        // console.log("MachineDetails response", response.data);
        SetCasseteCounterDenom(response.data);
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
  }, []);
  const LogoutUser = () => {
    Logout();
  };
  const Transactioncolumns = [
    {
      label: "BankName",
      name: "bankName",
      selector: (row) => row.bankName,
      sortable: true,
      filter: true,
    },
    {
      label: "DeviceId",
      name: "deviceId",
      selector: (row) => row.deviceId,
      sortable: true,
      filter: true,
    },
    {
      label: "ContainerName",
      name: "containerName",
      selector: (row) => row.containerName,
      sortable: true,
      filter: true,
    },
    {
      label: "Denomination",
      name: "denomination",
      selector: (row) => row.denomination,
      sortable: true,
      filter: true,
    },
    {
      label: "Quantity",
      name: "quantity",
      selector: (row) => row.quantity,
      sortable: true,
      filter: true,
    },
    {
      label: "CashOut",
      name: "cashOut",
      selector: (row) => row.cashOut,
      sortable: true,
      filter: true,
    },
  ];

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
        Particular: "Particular",
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
      <div>
        {isLoading ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <div className="DivDataTable">
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Cassette Counter Denomination"}
                data={CasseteCounterDenom}
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
