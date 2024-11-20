import { useEffect, useState } from "react";
import LoaderComp from "../../Layout/Loader";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { Logout } from "../../../services/Auth";
import { GetAllMailConfigAPI } from "../../../services/Transactions/Transactions";
import { LogoutAPI } from "../../../services/Api";

export default function MailConfig() {

  const Userdetails = localStorage.getItem("LoggedInUser");
  const [allMailConfigData, SetallMailConfigData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    GetAllMailConfigAPI(Userdetails)
      .then((response) => {
        SetallMailConfigData(response?.data?.lookup_MailId_Config);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
          if (err.response.status != 200) {
        LogoutAPI(Userdetails);
          Logout();
        }

        // Logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const allMailConfigDataColumns = [
    {
      label: "Mail Config Name",
      name: "mailConfigName",
      selector: (row) => row.mailConfigName,
      sortable: true,
    },
    {
      label: "Mail ID",
      name: "mailId",
      selector: (row) => row.mailId,
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
      <div>
        {isLoading ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <div className="MUI_DataTable">
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Mail Configuration"}
                data={allMailConfigData}
                columns={allMailConfigDataColumns}
                options={options}
              />
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
