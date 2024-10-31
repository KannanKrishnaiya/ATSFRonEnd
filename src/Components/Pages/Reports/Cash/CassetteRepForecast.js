import { useEffect, useState } from "react";
import LoaderComp from "../../../Layout/Loader";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { CassetteRepForecastAPI } from "../../../../services/CashReplenish/CashReplenish";
import { Logout } from "../../../../services/Auth";

export default function CassetteRepForecast() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");

  const [CassetteRepCfg, SetCassetteRepCfg] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    CassetteRepForecastAPI(Userdetails)
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
        label: "BankName",
        name: "bankName",
        selector: (row) => row.bankName,
        sortable: true,
        filter: true,
      },
      {
        label: "DeviceID",
        name: "deviceId",
        selector: (row) => row.deviceId,
        sortable: true,
        filter: true,
      },
      {
        label: "ContainerName",
        name: "vV_Cass1_ContainerName",
        selector: (row) => row.vV_Cass1_ContainerName,
        sortable: true,
        filter: true,
      },
      {
        label: "ContainerName",
        name: "vV_Cass2_ContainerName",
        selector: (row) => row.vV_Cass2_ContainerName,
        sortable: true,
        filter: true,
      },
      {
        label: "ContainerName",
        name: "vV_Cass3_ContainerName",
        selector: (row) => row.vV_Cass3_ContainerName,
        sortable: true,
        filter: true,
      },
      {
        label: "ContainerName",
        name: "vV_Cass4_ContainerName",
        selector: (row) => row.vV_Cass4_ContainerName,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_1_Denomination",
        name: "cassette1_Denom",
        selector: (row) => row.cassette1_Denom,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_2_Denomination",
        name: "cassette2_Denom",
        selector: (row) => row.cassette2_Denom,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_3_Denomination",
        name: "cassette3_Denom",
        selector: (row) => row.cassette3_Denom,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_4_Denomination",
        name: "cassette4_Denom",
        selector: (row) => row.cassette4_Denom,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_1_Average",
        name: "cassette1_Avg",
        selector: (row) => row.cassette1_Avg,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_1_Current_Quantity",
        name: "cas1_CurrentQuan",
        selector: (row) => row.cas1_CurrentQuan,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_2_Average",
        name: "cassette2_Avg",
        selector: (row) => row.cassette2_Avg,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_2_Current_Quantity",
        name: "cas2_CurrentQuan",
        selector: (row) => row.cas2_CurrentQuan,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_3_Average",
        name: "cassette3_Avg",
        selector: (row) => row.cassette3_Avg,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_3_Current_Quantity",
        name: "cas3_CurrentQuan",
        selector: (row) => row.cas3_CurrentQuan,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_4_Average",
        name: "cassette4_Avg",
        selector: (row) => row.cassette4_Avg,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_4_Current_Quantity",
        name: "cas4_CurrentQuan",
        selector: (row) => row.cas4_CurrentQuan,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_1_Replenish_Notes",
        name: "cassette1_ReplenishNotes",
        selector: (row) => row.cassette1_ReplenishNotes,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_2_Replenish_Notes",
        name: "cassette2_ReplenishNotes",
        selector: (row) => row.cassette2_ReplenishNotes,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_3_Replenish_Notes",
        name: "cassette3_ReplenishNotes",
        selector: (row) => row.cassette3_ReplenishNotes,
        sortable: true,
        filter: true,
      },
      {
        label: "Cassette_4_Replenish_Notes",
        name: "cassette4_ReplenishNotes",
        selector: (row) => row.cassette4_ReplenishNotes,
        sortable: true,
        filter: true,
      },
    ];
//     {
//       label: "BankName",
//       name: "bankName",
//       selector: (row) => row.bankName,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "DeviceId",
//       name: "deviceId",
//       selector: (row) => row.deviceId,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette1_Denom",
//       name: "cassette1_Denom",
//       selector: (row) => row.cassette1_Denom,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette2_Denom",
//       name: "cassette2_Denom",
//       selector: (row) => row.cassette2_Denom,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette3_Denom",
//       name: "cassette3_Denom",
//       selector: (row) => row.cassette3_Denom,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette4_Denom",
//       name: "cassette4_Denom",
//       selector: (row) => row.cassette4_Denom,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette1_Avg",
//       name: "cassette1_Avg",
//       selector: (row) => row.cassette1_Avg,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette2_Avg",
//       name: "cassette2_Avg",
//       selector: (row) => row.cassette2_Avg,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette3_Avg",
//       name: "cassette3_Avg",
//       selector: (row) => row.cassette3_Avg,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette4_Avg",
//       name: "cassette4_Avg",
//       selector: (row) => row.cassette4_Avg,
//       sortable: true,
//       filter: true,
//     },

//     {
//       label: "Cassette1_AvgAmt",
//       name: "cassette1_AvgAmt",
//       selector: (row) => row.cassette1_AvgAmt,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette2_AvgAmt",
//       name: "cassette2_AvgAmt",
//       selector: (row) => row.cassette4_Denom,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette3_AvgAmt",
//       name: "cassette3_AvgAmt",
//       selector: (row) => row.cassette3_AvgAmt,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette4_AvgAmt",
//       name: "cassette4_AvgAmt",
//       selector: (row) => row.cassette4_AvgAmt,
//       sortable: true,
//       filter: true,
//     },

//     {
//       label: "DeviceCassettes_TotAmt",
//       name: "deviceCassettes_TotAmt",
//       selector: (row) => row.deviceCassettes_TotAmt,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Per_Cassette1_TotAmt",
//       name: "per_Cassette1_TotAmt",
//       selector: (row) => row.per_Cassette1_TotAmt,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Per_Cassette2_TotAmt",
//       name: "per_Cassette2_TotAmt",
//       selector: (row) => row.per_Cassette2_TotAmt,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Per_Cassette3_TotAmt",
//       name: "per_Cassette3_TotAmt",
//       selector: (row) => row.per_Cassette3_TotAmt,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Per_Cassette4_TotAmt",
//       name: "per_Cassette4_TotAmt",
//       selector: (row) => row.per_Cassette4_TotAmt,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette1_ReplenishAmount",
//       name: "cassette1_ReplenishAmount",
//       selector: (row) => row.cassette1_ReplenishAmount,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette2_ReplenishAmount",
//       name: "cassette2_ReplenishAmount",
//       selector: (row) => row.cassette2_ReplenishAmount,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette3_ReplenishAmount",
//       name: "cassette3_ReplenishAmount",
//       selector: (row) => row.cassette3_ReplenishAmount,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette4_ReplenishAmount",
//       name: "cassette4_ReplenishAmount",
//       selector: (row) => row.cassette4_ReplenishAmount,
//       sortable: true,
//       filter: true,
//     },

//     {
//       label: "Machine_CapAmount",
//       name: "machine_CapAmount",
//       selector: (row) => row.machine_CapAmount,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette1_ReplenishNotes",
//       name: "cassette1_ReplenishNotes",
//       selector: (row) => row.cassette1_ReplenishNotes,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette2_ReplenishNotes",
//       name: "cassette2_ReplenishNotes",
//       selector: (row) => row.cassette2_ReplenishNotes,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette3_ReplenishNotes",
//       name: "cassette3_ReplenishNotes",
//       selector: (row) => row.cassette3_ReplenishNotes,
//       sortable: true,
//       filter: true,
//     },
//     {
//       label: "Cassette4_ReplenishNotes",
//       name: "cassette4_ReplenishNotes",
//       selector: (row) => row.cassette4_ReplenishNotes,
//       sortable: true,
//       filter: true,
//     },
//   ];

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
