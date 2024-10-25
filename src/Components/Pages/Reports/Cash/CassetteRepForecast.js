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
  CassetteRepCfgAPI,
  GetCassetteAverageConfigAPI,
} from "../../../../services/CashReplenish/CashReplenish";
import { Logout } from "../../../../services/Auth";

export default function CassetteRepForecast() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");

  const [CassetteRepCfg, SetCassetteRepCfg] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    CassetteRepCfgAPI(Userdetails)
      .then((response) => {
        if (response.status != "200") {
          LogoutUser();
        }
        // console.log("MachineDetails response", response.data);
        SetCassetteRepCfg(response.data);
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
      name: "BankName",
      selector: (row) => row.BankName,
      sortable: true,
      filter: true,
    },
    {
      name: "DeviceId",
      selector: (row) => row.DeviceId,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette1_Denom",
      selector: (row) => row.Cassette1_Denom,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette2_Denom",
      selector: (row) => row.Cassette2_Denom,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette3_Denom",
      selector: (row) => row.Cassette3_Denom,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette4_Denom",
      selector: (row) => row.Cassette4_Denom,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette1_Avg",
      selector: (row) => row.Cassette1_Avg,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette2_Avg",
      selector: (row) => row.Cassette2_Avg,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette3_Avg",
      selector: (row) => row.Cassette3_Avg,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette4_Avg",
      selector: (row) => row.Cassette4_Avg,
      sortable: true,
      filter: true,
    },

    {
      name: "Cassette1_AvgAmt",
      selector: (row) => row.Cassette1_AvgAmt,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette2_AvgAmt",
      selector: (row) => row.Cassette4_Denom,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette3_AvgAmt",
      selector: (row) => row.Cassette3_AvgAmt,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette4_AvgAmt",
      selector: (row) => row.Cassette4_AvgAmt,
      sortable: true,
      filter: true,
    },

    {
      name: "DeviceCassettes_TotAmt",
      selector: (row) => row.DeviceCassettes_TotAmt,
      sortable: true,
      filter: true,
    },
    {
      name: "Per_Cassette1_TotAmt",
      selector: (row) => row.Per_Cassette1_TotAmt,
      sortable: true,
      filter: true,
    },
    {
      name: "Per_Cassette2_TotAmt",
      selector: (row) => row.Per_Cassette2_TotAmt,
      sortable: true,
      filter: true,
    },
    {
      name: "Per_Cassette3_TotAmt",
      selector: (row) => row.Per_Cassette3_TotAmt,
      sortable: true,
      filter: true,
    },
    {
      name: "Per_Cassette4_TotAmt",
      selector: (row) => row.Per_Cassette4_TotAmt,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette1_ReplenishAmount",
      selector: (row) => row.Cassette1_ReplenishAmount,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette2_ReplenishAmount",
      selector: (row) => row.Cassette2_ReplenishAmount,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette3_ReplenishAmount",
      selector: (row) => row.Cassette3_ReplenishAmount,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette4_ReplenishAmount",
      selector: (row) => row.Cassette4_ReplenishAmount,
      sortable: true,
      filter: true,
    },

    {
      name: "Machine_CapAmount",
      selector: (row) => row.Machine_CapAmount,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette1_ReplenishNotes",
      selector: (row) => row.Cassette1_ReplenishNotes,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette2_ReplenishNotes",
      selector: (row) => row.Cassette2_ReplenishNotes,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette3_ReplenishNotes",
      selector: (row) => row.Cassette3_ReplenishNotes,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette4_ReplenishNotes",
      selector: (row) => row.Cassette4_ReplenishNotes,
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
                title={"Cash Replenish Forecast"}
                data={CassetteRepCfg}
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
