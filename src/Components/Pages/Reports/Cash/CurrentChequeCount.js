import { useEffect, useState } from "react";
import LoaderComp from "../../../Layout/Loader";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import { GetChequeClearanceRptAPI } from "../../../../services/VynamicView/VynamicView";
import { Logout } from "../../../../services/Auth";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TbUserEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import { LogoutAPI } from "../../../../services/Api";

export default function CurrentChequeCount() {
  const LoggedInUserRoleDetailsData = useSelector(
    (state) => state.user.userDetails
  );
  const Userdetails = localStorage.getItem("LoggedInUser");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [CurrentChequeCountTrans, SetCurrentChequeCountTrans] = useState([]);
  const [CurrentChequeCountTransInput, setCurrentChequeCountTransInput] =
    useState({
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

  const LogoutUser = () => {
    Logout();
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    GetChequeClearanceRptAPI(Userdetails)
      .then((response) => {
        SetCurrentChequeCountTrans(response?.data.allMachinesFree);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          LogoutAPI(Userdetails);
          Logout();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const Transactioncolumns = [
    {
      label: "Bank Name",
      name: "bankName",
      selector: (row) => row.bankName,
      sort: true,
      sortDirection: true,
    },

    {
      label: "Device Model",
      name: "deviceModel",
      selector: (row) => row.deviceModel,
      sort: true,
      sortDirection: true,
    },
    {
      label: "Device Type",
      name: "deviceType",
      selector: (row) => row.deviceType,
      sortable: true,
      sort: true,
      sortDirection: true,
    },
    {
      label: "Terminal Id",
      name: "deviceid",
      selector: (row) => row.deviceid,
      sortable: true,
      sort: true,
      sortDirection: true,
    },
    {
      label: "Timestamp",
      name: "servertimestamp",
      selector: (row) => row.servertimestamp,
      sortable: true,
      sort: true,
      sortDirection: true,
    },
    {
      label: "Eventno",
      name: "eventno",
      selector: (row) => row.eventno,
      sortable: true,
      sort: true,
      sortDirection: true,
    },
    {
      label: "Message",
      name: "orgmessage",
      selector: (row) => row.orgmessage,
      sortable: true,
      sort: true,
      sortDirection: true,
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
                title={"Current Cheque Count"}
                data={CurrentChequeCountTrans}
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
