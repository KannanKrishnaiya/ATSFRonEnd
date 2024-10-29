import { useEffect, useState } from "react";
import LoaderComp from "../../Layout/Loader";
import { GetVynamicViewAllTicketsAPI } from "../../../services/VynamicView/VynamicView";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import { Logout } from "../../../services/Auth";

export default function VynamicViewAllTickets() {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [VynamicViewAllTicketsData, SetVynamicViewAllTicketsData] = useState(
    []
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const LogoutUser = () => {
    Logout();
  };

  useEffect(() => {
    setIsLoading(true);
    GetVynamicViewAllTicketsAPI(Userdetails)
      .then((response) => {
        SetVynamicViewAllTicketsData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        Logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const VynamicViewAllTicketsDataColumns = [
    {
      label: "DeviceId",
      name: "deviceId",
      selector: (row) => row.deviceId,
      sortable: true,
    },
    {
      label: "TicketNumber",
      name: "ticketNumber",
      selector: (row) => row.ticketNumber,
      sortable: true,
    },

    {
      label: "TicketSubject",
      name: "ticketSubject",
      selector: (row) => row.ticketSubject,
      sortable: true,
    },
    {
      label: "TicketStatus",
      name: "ticketStatus",
      selector: (row) => row.ticketStatus,
      sortable: true,
    },
    {
      label: "CategoryName",
      name: "categoryName",
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      label: "ItemName",
      name: "ttemName",
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      label: "AssigneeGroup",
      name: "assigneeGroup",
      selector: (row) => row.assigneeGroup,
      sortable: true,
    },
    {
      label: "CreateTime",
      name: "createTime",
      selector: (row) => row.createTime,
      sortable: true,
    },
    {
      label: "ReportTime",
      name: "reportTime",
      selector: (row) => row.reportTime,
      sortable: true,
    },
    {
      label: "DispatchTime",
      name: "dispatchTime",
      selector: (row) => row.dispatchTime,
      sortable: true,
    },
    {
      label: "TicketOwner",
      name: "ticketOwner",
      selector: (row) => row.ticketOwner,
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
                title={"Vynamic View Ticket Details"}
                data={VynamicViewAllTicketsData}
                columns={VynamicViewAllTicketsDataColumns}
                options={options}
              />
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
