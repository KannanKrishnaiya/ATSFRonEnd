import { useEffect, useState } from "react";
import LoaderComp from "../../../Components/Layout/Loader";
import { GetMachineDetailAPI } from "../../../services/Lookups/Lookups_Api";
import { GetAllMachineDetailsAPI } from "../../../services/VynamicView/VynamicView";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import { Logout } from "../../../services/Auth";

import Button from "@material-ui/core/Button";
export default function MachineDetails() {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [MachineDetails, SetMachineDetails] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("MachineDetails");
    setIsLoading(true);
    GetAllMachineDetailsAPI(Userdetails)
      .then((response) => {
        if (response.status != "200") {
          LogoutUser();
        }
        // console.log("MachineDetails", response.data);
        setIsLoading(false);
        SetMachineDetails(response.data);
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
    navigate("/", { state: { refresh: true } });
  };

  const columns = [
    {
      name: "BankName",
      selector: (row) => row.BankName,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.Country,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.Branch,
      sortable: true,
    },
    {
      name: "DeviceId",
      selector: (row) => row.DeviceId,
      sortable: true,
    },

    {
      name: "TerminalId",
      selector: (row) => row.TerminalId,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.City,
      sortable: true,
    },

    {
      name: "Location",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "SerialNumber",
      selector: (row) => row.SerialNumber,
      sortable: true,
    },
    {
      name: "Device_Model",
      selector: (row) => row.Device_Model,
      sortable: true,
    },
    {
      name: "Device_Type",
      selector: (row) => row.Device_Type,
      sortable: true,
    },

    {
      name: "Vendor",
      selector: (row) => row.Vendor,
      sortable: true,
    },

    // {
    //   name: "Actions",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRenderLite: (dataIndex, rowIndex) => {
    //       return (
    //         <input
    //           className="btn-grad"
    //           type="button"
    //           value="View"
    //           onClick={() => {
    //             alert(MachineDetails[dataIndex].Emirates);
    //           }}
    //         />
    //       );
    //     },
    //   },
    // },
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
              title={"Machine Details"}
              data={MachineDetails}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
