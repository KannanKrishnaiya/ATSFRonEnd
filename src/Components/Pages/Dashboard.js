import "../../assets/styles/CustomStyles/LoggedInUserDetails.css";
import "../../assets/styles/CustomStyles/LeftSideBar.css";
import "../../assets/styles/CustomStyles/DashBoard.css";
import LoaderComp from "../Layout/Loader";
import { useEffect, useState, setState } from "react";
import {
  FaRegPauseCircle,
  FaCreditCard,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbCashBanknoteOff } from "react-icons/tb";
import { BiNoSignal } from "react-icons/bi";
import { HiMiniTicket } from "react-icons/hi2";
import { LuRefreshCw } from "react-icons/lu";
import {
  GetVVDashboardDataAPI,
  GetVV_AllMachinesUpTimePercentageAPI,
} from "../../services/VynamicView/VynamicView";
import { GetAllFailedTxnAPI } from "../../services/Transactions/Transactions";
import { VscError } from "react-icons/vsc";
import { BiExport } from "react-icons/bi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DependentDropdown from "react-dependent-dropdown";
import { ColorizeSharp } from "@mui/icons-material";
import DashboardTab from "./Dashboard/DashboardTab";
import { Logout } from "../../services/Auth";
import { CSVLink, CSVDownload } from "react-csv";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { BsBootstrapReboot } from "react-icons/bs";
import {
  MdOutlineAssignmentInd,
  MdAccountBalanceWallet,
  MdMiscellaneousServices,
} from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";
import { GiReceiveMoney, GiMoneyStack } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { GrServices } from "react-icons/gr";
import { NumericFormat } from "react-number-format";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [DashboardDropDownValues, setDashboardDropDownValues] = useState([]);

  const [SelectedDashboardDropDownValues, setSelectDashboardDropDownValues] =
    useState({
      // BankName: "",
      // Branch: "",
      // Atm_TerminalId: "",
      // TransactionStartDate: "",
      // TransactionEndDate: "",
      bankName: "",
      city: "",
      location: "",
      device_Type: "",
      device_Model: "",
    });
  const [DashboardBankNameDropDown, setDashboardBankNameDropDown] = useState(
    []
  );
  const [DashboardCityDropDown, setDashboardCityDropDown] = useState([]);
  const [DashboardLocationDropDown, setDashboardLocationDropDown] = useState(
    []
  );
  const [DashboardDeviceTypeDropDown, setDashboardDeviceTypeDropDown] =
    useState([]);
  const [DashboardModelDropDown, setDashboardModelDropDown] = useState([]);

  const [VVDashboardCards, setVVDashboardCards] = useState({
    Count_VV_BankDeviceDetails: "0",
    Count_VV_MachineIdleCalculation: "0",
    Count_VV_OutOfCash: "0",
    Count_VV_DownTime_OutOfService: "0",
    Count_VV_AllTicket: "0",
    Count_VV_CardsCaptured: "0",
    Per_VV_CashAvailability: "0",
    Count_AllFailedTransactions: "0",
    Count_VV_RepeatedTickets: "0",
    _VV_MachineIdleCalculation: [],
    _VV_OutOfCash: [],
    _VV_CardsCaptured: [],
    _VV_DownTime_OutOfService: [],
    _VV_AllTicket: [],
    _VV_AllMachinesCashAvailable: [],
    AllFailedTransactions: [],
    _VV_RepeatedTickets: [],

    _VV_RebootedMachines: [],
    Count_VV_RebootedMachines: "0",
    Avg_VV_AverageAssignmentTime: "0",
    Avg_VV_AverageResolutionTime: "0",
  });

  const [VV_AllMachinesUpTimePercentage, Set_VV_AllMachinesUpTimePercentage] =
    useState();

  const [AllFailedTransactions, SetAllFailedTransactions] = useState([]);

  const [AllFailedTransactionsInput, setAllFailedTransactionsInput] = useState({
    BankName: "",
    Branch: "",
    Atm_TerminalId: "",
    TransactionStartDate: "",
    TransactionEndDate: "",
  });
  const LogoutUser = () => {
    Logout();
  };

  function Init() {
    setIsLoading(true);
    GetVVDashboardData();
    GetAllFailedData();
    GetVV_AllMachinesUpTimePercentageData();
  }

  useEffect(() => {
    Init();
    let interval = setInterval(() => {
      Init();
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  function GetVVDashboardData() {
    GetVVDashboardDataAPI(Userdetails, SelectedDashboardDropDownValues)
      .then((response) => {
        //console.log(response.data);
        setVVDashboardCards(response.data);
        setDashboardDropDownValues(response.data._VV_BankDeviceDetails);
        const DistinctBankName = new Set(
          response.data._VV_BankDeviceDetails.map((a) => a.bankName)
        );
        setDashboardBankNameDropDown([...DistinctBankName]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        LogoutUser();
      });
    //setIsLoading(false);
  }

  function GetAllFailedData() {
    GetAllFailedTxnAPI(Userdetails, SelectedDashboardDropDownValues)
      .then((response) => {
        SetAllFailedTransactions(response.data);
        if (AllFailedTransactions != null)
          VVDashboardCards.Count_AllFailedTransactions =
            AllFailedTransactions.length ?? "0";
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  function GetVV_AllMachinesUpTimePercentageData() {
    GetVV_AllMachinesUpTimePercentageAPI(
      Userdetails,
      SelectedDashboardDropDownValues
    )
      .then((response) => {
        Set_VV_AllMachinesUpTimePercentage(response.data);
        // console.log("Set_VV_AllMachinesUpTimePercentage", VV_AllMachinesUpTimePercentage);
        //setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  const ResetDropDown = (e) => {
    SelectedDashboardDropDownValues.bankName = "";
    SelectedDashboardDropDownValues.city = "";
    SelectedDashboardDropDownValues.branch = "";
    SelectedDashboardDropDownValues.atm_TerminalId = "";
    SelectedDashboardDropDownValues.transactionStartDate = "";
    SelectedDashboardDropDownValues.transactionEndDate = "";

    setDashboardBankNameDropDown([]);
    setDashboardCityDropDown([]);
    setDashboardLocationDropDown([]);
    setDashboardDeviceTypeDropDown([]);
    setDashboardModelDropDown([]);
    GetVVDashboardData();
    Init();
  };
  const renderMachineIdleCalculation = () => {
    return VVDashboardCards._VV_MachineIdleCalculation
      ? VVDashboardCards._VV_MachineIdleCalculation.map(
          ({
            BankName,
            DeviceId,
            Timestamp,
            // OrgMessage,
            // ServerTimestamp,
            // DeviceState,
            // EventNo,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{Timestamp}</td>
                {/* <td>{OrgMessage}</td>
                <td>{ServerTimestamp}</td>
                <td>{DeviceState}</td>
                <td>{EventNo}</td> */}
              </tr>
            );
          }
        )
      : "No Records Available";
  };
  const renderOutOfCash = () => {
    return VVDashboardCards._VV_OutOfCash
      ? VVDashboardCards._VV_OutOfCash.map(
          ({
            BankName,
            DeviceId,
            ContainerName,
            Denomination,
            Quantity,
            // CashOut,
            // CashIn,
            // Reject,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{ContainerName}</td>
                <td>{Denomination}</td>
                <td>{Quantity}</td>
                {/* <td>{CashOut}</td>
                <td>{CashIn}</td>
                <td>{Reject}</td> */}
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  const renderOutOfCashWithSearch = (SearchBank) => {
    let List_DistinctBankName = [];
    SearchBank
      ? (List_DistinctBankName = VVDashboardCards._VV_OutOfCash.filter((a) =>
          a?.BankName?.includes(SearchBank?.BankName)
        ))
      : (List_DistinctBankName = VVDashboardCards._VV_OutOfCash);
    return List_DistinctBankName.map(
      ({ BankName, DeviceId, ContainerName, Denomination, Quantity }) => {
        return (
          <tr key={DeviceId}>
            <td>{BankName}</td>
            <td>{DeviceId}</td>
            <td>{ContainerName}</td>
            <td>{Denomination}</td>
            <td>{Quantity}</td>
          </tr>
        );
      }
    );
  };

  const renderCardsCaptured = () => {
    return VVDashboardCards._VV_CardsCaptured
      ? VVDashboardCards._VV_CardsCaptured.map(
          ({
            BankName,
            DeviceId,
            Timestamp,
            OrgMessage,
            // ServerTimestamp,
            // DeviceState,
            // EventNo,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{Timestamp}</td>
                <td>{OrgMessage}</td>
                {/* <td>{ServerTimestamp}</td>
                <td>{DeviceState}</td>
                <td>{EventNo}</td> */}
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  const renderOutOfServiceCalculation = () => {
    return VVDashboardCards._VV_DownTime_OutOfService
      ? VVDashboardCards._VV_DownTime_OutOfService.map(
          ({
            BankName,
            DeviceId,
            MachineDownTime,
            MachineRecoverTime,
            StatusMessage,
            // DeviceIntervalTime,
            // StartEventNumber,
            // EndEventNumber,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{MachineDownTime}</td>
                <td>{MachineRecoverTime}</td>
                <td>{StatusMessage}</td>
                {/* <td>{DeviceIntervalTime}</td>
                <td>{StartEventNumber}</td>
                <td>{EndEventNumber}</td> */}
              </tr>
            );
          }
        )
      : "No Records Available";
  };
  const renderActiveTickets = () => {
    return VVDashboardCards._VV_AllTicket
      ? VVDashboardCards._VV_AllTicket.map(
          ({
            BankName,
            DeviceId,
            TicketNumber,
            CategoryName,
            TicketSubject,
            // TicketStatus,
            ItemName,

            AssigneeGroup,
            CreateTime,
            ReportTime,
            DispatchTime,
            // TicketOwner,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{TicketNumber}</td>
                <td>{CategoryName}</td>
                <td>{TicketSubject}</td>
                {/* <td>{TicketStatus}</td> */}

                <td>{ItemName}</td>
                <td>{AssigneeGroup}</td>
                <td>{CreateTime}</td>
                <td>{ReportTime}</td>
                <td>{DispatchTime}</td>
                {/* <td>{TicketOwner}</td> */}
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  const renderHeaderEvent = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>DeviceId</th>
        <th>Timestamp</th>
        {/* <th>OrgMessage</th>
        <th>ServerTimestamp</th>
        <th>DeviceState</th>
        <th>EventNo</th> */}
      </tr>
    );
  };

  const renderHeaderCardsCaptured = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>DeviceId</th>
        <th>Timestamp</th>
        <th>Message</th>
        {/* <th>ServerTimestamp</th>
        <th>DeviceState</th>
        <th>EventNo</th> */}
      </tr>
    );
  };
  const renderHeaderAllFailedTransactions = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>Branch</th>
        <th>TransactionDate</th>
        <th>SequenceNumber</th>
        <th>TransactionType</th>
        <th>PaymentMethod</th>
        <th>TransactionDetails</th>
      </tr>
    );
  };
  const renderAllFailedTransactions = () => {
    return { AllFailedTransactions }
      ? AllFailedTransactions.map(
          ({
            BankName,
            Branch,
            TransactionDate,
            SequenceNumber,
            TransactionDetails,
            TransactionType,
            PaymentMethod,
          }) => {
            return (
              <tr key={SequenceNumber}>
                <td>{BankName}</td>
                <td>{Branch}</td>
                <td>{TransactionDate}</td>
                <td>{SequenceNumber}</td>
                <td>{TransactionDetails}</td>
                <td>{TransactionType}</td>
                <td>{PaymentMethod}</td>
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  const renderHeaderOutOfService = (index) => {
    return (
      <tr key={index}>
        <th>Bank Name</th>
        <th>DeviceId</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Message</th>
        {/* <th>DeviceIntervalTime</th>
        <th>StartEventNumber</th>
        <th>EndEventNumber</th> */}
      </tr>
    );
  };
  const renderHeaderActiveTickets = (index) => {
    return (
      <tr key={index}>
        <th> Bank Name</th>
        <th> DeviceId</th>
        <th> TicketNumber</th>
        <th> CategoryName</th>
        <th> TicketSubject</th>
        {/* <th> TicketStatus</th> */}
        <th> ItemName</th>
        <th> AssigneeGroup</th>
        <th> CreateTime</th>
        <th> ReportTime</th>
        <th> DispatchTime</th>
        {/* <th> TicketOwner</th> */}
      </tr>
    );
  };

  const renderHeaderOutofCash = (index) => {
    return (
      <tr key={index}>
        <th> BankName</th>
        <th> DeviceId</th>
        <th> ContainerName</th>
        <th> Denomination</th>
        <th> Quantity</th>
        {/* <th> CashOut</th>
        <th> CashIn</th>
        <th> Reject</th> */}
      </tr>
    );
  };

  const renderHeaderCashAvailability = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>DeviceId</th>
        <th>ContainerName</th>
        <th>Denomination</th>
        <th>Quantity</th>
        <th>CashOut</th>
        <th>CashIn</th>
        <th>Reject</th>
      </tr>
    );
  };

  const renderCashAvailability = () => {
    return VVDashboardCards._VV_AllMachinesCashAvailable
      ? VVDashboardCards._VV_AllMachinesCashAvailable.map(
          ({
            BankName,
            DeviceId,
            ContainerName,
            Denomination,
            Quantity,
            CashOut,
            CashIn,
            Reject,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{ContainerName}</td>
                <td>{Denomination}</td>
                <td>{Quantity}</td>
                <td>{CashOut}</td>
                <td>{CashIn}</td>
                <td>{Reject}</td>
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  const renderCashAvailabilityWithSearch = () => {
    let List_DistinctBankName = [];
    const SearchBank = SelectedDashboardDropDownValues.BankName;
    SearchBank
      ? (List_DistinctBankName =
          VVDashboardCards._VV_AllMachinesCashAvailable.filter((a) =>
            a.BankName.includes(SearchBank.BankName)
          ))
      : (List_DistinctBankName = VVDashboardCards._VV_AllMachinesCashAvailable);
    return List_DistinctBankName.map(
      ({
        BankName,
        DeviceId,
        ContainerName,
        Denomination,
        Quantity,
        CashOut,
        CashIn,
        Reject,
      }) => {
        return (
          <tr key={DeviceId}>
            <td>{BankName}</td>
            <td>{DeviceId}</td>
            <td>{ContainerName}</td>
            <td>{Denomination}</td>
            <td>{Quantity}</td>
            <td>{CashOut}</td>
            <td>{CashIn}</td>
            <td>{Reject}</td>
          </tr>
        );
      }
    );
  };
  //renderCashAvailabilityWithSearch("Al-Maryah");

  const handleInput_BankNameDropDown = (event) => {
    SelectedDashboardDropDownValues.BankName = "";
    SelectedDashboardDropDownValues.City = "";
    SelectedDashboardDropDownValues.Location = "";
    SelectedDashboardDropDownValues.Device_Model = "";
    SelectedDashboardDropDownValues.Device_Type = "";

    SelectedDashboardDropDownValues.bankName = event.target.value;
    const FilterCity = DashboardDropDownValues.filter((c) =>
      c.bankName?.includes(event.target.value)
    );
    // console.log("FilterCity", FilterCity);
    const DistinctCity = new Set(FilterCity.map((c) => c.city));
    // Update state with unique
    setDashboardCityDropDown([...DistinctCity]);
    // console.log("DistinctCity1", DistinctCity);
  };

  const handleInput_CityDropDown = (event) => {
    // console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.city = "";
    SelectedDashboardDropDownValues.location = "";
    SelectedDashboardDropDownValues.device_Model = "";
    SelectedDashboardDropDownValues.device_Type = "";
    SelectedDashboardDropDownValues.city = event.target.value;

    const FilterLocation = DashboardDropDownValues.filter(
      (c) =>
        c.bankName.includes(SelectedDashboardDropDownValues.bankName) &&
        c.city.includes(event.target.value)
    );
    // console.log("FilterCity", FilterCity);
    const DistinctLocation = new Set(FilterLocation.map((c) => c.location));
    // Update state with unique
    setDashboardLocationDropDown([...DistinctLocation]);
    //console.log("DistinctCity1", DistinctLocation);
  };

  const handleInput_LocationDropDown = (event) => {
    //console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.location = "";
    SelectedDashboardDropDownValues.device_Model = "";
    SelectedDashboardDropDownValues.device_Type = "";
    SelectedDashboardDropDownValues.location = event.target.value;

    const FilterDeviceType = DashboardDropDownValues.filter(
      (c) =>
        c.bankName.includes(SelectedDashboardDropDownValues.bankName) &&
        c.city.includes(SelectedDashboardDropDownValues.city) &&
        c.location.includes(event.target.value)
    );

    const DistinctDeviceType = new Set(
      FilterDeviceType.map((c) => c.device_Type)
    );
    // Update state with unique
    setDashboardDeviceTypeDropDown([...DistinctDeviceType]);
  };
  const handleInput_DeviceTypeDropDown = (event) => {
    //console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.device_Model = "";
    SelectedDashboardDropDownValues.device_Type = "";
    SelectedDashboardDropDownValues.device_Type = event.target.value;
    const FilterModel = DashboardDropDownValues.filter(
      (c) =>
        c.bankName.includes(SelectedDashboardDropDownValues.bankName) &&
        c.city.includes(SelectedDashboardDropDownValues.city) &&
        c.location.includes(SelectedDashboardDropDownValues.location) &&
        //c.Device_Type.includes(event.target.value)

        c.device_Type.trim().toLowerCase() ==
          SelectedDashboardDropDownValues.device_Type.trim().toLowerCase()
    );

    const DistinctModel = new Set(FilterModel.map((c) => c.device_Model));
    // Update state with unique
    setDashboardModelDropDown([...DistinctModel]);
  };

  const handleInput_DeviceModelDropDown = (event) => {
    //console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.device_Model = "";
    SelectedDashboardDropDownValues.device_Model = event.target.value;

    const FilterModel = DashboardDropDownValues.filter(
      (c) =>
        c.bankName.includes(SelectedDashboardDropDownValues.bankName) &&
        c.city.includes(SelectedDashboardDropDownValues.city) &&
        c.location.includes(SelectedDashboardDropDownValues.location) &&
        c.device_Type.includes(SelectedDashboardDropDownValues.device_Type) &&
        c.device_Model.includes(event.target.value)
    );

    const DistinctDeviceModel = new Set(FilterModel.map((c) => c.device_Model));
    // Update state with unique
    setDashboardModelDropDown([...DistinctDeviceModel]);
  };

  const renderHeader_RepeatedTickets = (index) => {
    return (
      <tr key={index}>
        <th> BankName</th>
        <th> DeviceId</th>
        <th> Item_name</th>
        <th> First_Reported</th>
        <th> Latest_Reported (Hours)</th>
        <th> Repeated_Count</th>
        {/* <th> CashOut</th>
        <th> CashIn</th>
        <th> Reject</th> */}
      </tr>
    );
  };

  const render_RepeatedTickets = () => {
    return VVDashboardCards._VV_RepeatedTickets
      ? VVDashboardCards._VV_RepeatedTickets.map(
          ({
            BankName,
            DeviceId,
            Item_name,
            First_Reported,
            Latest_Reported,
            Repeated_Count,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{Item_name}</td>
                <td>{First_Reported}</td>
                <td>{Latest_Reported}</td>
                <td>{Repeated_Count}</td>
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  const renderHeader_RebootedMachines = (index) => {
    return (
      <tr key={index}>
        <th>BankName</th>
        <th>DeviceId</th>
        <th>TimeStamp</th>
        <th>Message</th>
      </tr>
    );
  };

  const render_RebootedMachines = () => {
    return VVDashboardCards._VV_RebootedMachines
      ? VVDashboardCards._VV_RebootedMachines.map(
          ({
            BankName,
            DeviceId,
            Timestamp,
            OrgMessage,
            // ServerTimestamp,
            // DeviceState,
            // EventNo,
          }) => {
            return (
              <tr key={DeviceId}>
                <td>{BankName}</td>
                <td>{DeviceId}</td>
                <td>{Timestamp}</td>
                <td>{OrgMessage}</td>
                {/*  <td>{ServerTimestamp}</td>
              <td>{DeviceState}</td>
              <td>{EventNo}</td> */}
              </tr>
            );
          }
        )
      : "No Records Available";
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <LoaderComp />
        </div>
      ) : (
        <div>
          {/* <div>Bank Name</div> */}
          <div className="row">
            <div className="DashboardBank_DropDownDiv">
              <div className="row">
                <div className="DashboardColumn">
                  <label className="LabelDashboardDropDown">Bank Name</label>
                  <select
                    onChange={handleInput_BankNameDropDown}
                    name="Select_BankName"
                    className="FormControl_Select"
                    selected={
                      (setSelectDashboardDropDownValues.bankName =
                        SelectedDashboardDropDownValues.bankName)
                    }
                    value={SelectedDashboardDropDownValues.bankName}
                  >
                    <option value={""}>Select Bank</option>
                    {DashboardBankNameDropDown.length > 0}?
                    {DashboardBankNameDropDown.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                    :null)
                  </select>
                </div>
                <div className="DashboardColumn">
                  <label className="LabelDashboardDropDown">City</label>
                  <select
                    className="FormControl_Select"
                    name="Select_City"
                    onChange={handleInput_CityDropDown}
                    selected={
                      (setSelectDashboardDropDownValues.city =
                        SelectedDashboardDropDownValues.city)
                    }
                    value={SelectedDashboardDropDownValues.city}
                  >
                    <option value={""}>Select City</option>
                    {DashboardCityDropDown.length > 0}?
                    {DashboardCityDropDown.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                    :null)
                  </select>
                </div>
                <div className="DashboardColumn">
                  <label className="LabelDashboardDropDown">Location</label>
                  <select
                    name="Location"
                    className="FormControl_Select"
                    onChange={handleInput_LocationDropDown}
                    selected={
                      (setSelectDashboardDropDownValues.location =
                        SelectedDashboardDropDownValues.location)
                    }
                    value={SelectedDashboardDropDownValues.location}
                  >
                    <option value={""}>Select Location</option>
                    {DashboardLocationDropDown.length > 0}?
                    {DashboardLocationDropDown.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                    :null)
                  </select>
                </div>
                <div className="DashboardColumn">
                  <label className="LabelDashboardDropDown">Device Type</label>
                  <select
                    name="DeviceType"
                    className="FormControl_Select"
                    onChange={handleInput_DeviceTypeDropDown}
                    selected={
                      (setSelectDashboardDropDownValues.device_Type =
                        SelectedDashboardDropDownValues.device_Type)
                    }
                    value={SelectedDashboardDropDownValues.device_Type}
                  >
                    <option value={""}>Select Device Type</option>
                    {DashboardDeviceTypeDropDown.length > 0}?
                    {DashboardDeviceTypeDropDown.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                    :null)
                  </select>
                </div>
                <div className="DashboardColumn">
                  <label className="LabelDashboardDropDown">Model</label>
                  <select
                    name="Model"
                    className="FormControl_Select"
                    onChange={handleInput_DeviceModelDropDown}
                    selected={
                      (setSelectDashboardDropDownValues.device_Model =
                        SelectedDashboardDropDownValues.device_Model)
                    }
                    value={SelectedDashboardDropDownValues.device_Model}
                  >
                    <option value={""}>Select Device Model</option>
                    {DashboardModelDropDown.length > 0}?
                    {DashboardModelDropDown.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                    :null)
                  </select>
                </div>
                <div className="">
                  <div className="flex-buttons">
                    <div>
                      <input
                        className="btn-grad"
                        type="button"
                        value="Apply"
                        onClick={Init}
                      />
                    </div>
                    <div>
                      <input
                        className="btn-grad"
                        type="button"
                        value="Clear"
                        onClick={ResetDropDown}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="column">
                  <div className="flex-buttons">
                    <div>
                      <input
                        className="btn-grad"
                        type="button"
                        value="Filter"
                        onClick={GetVVDashboardData}
                      />
                    </div>
                    <div>
                      <input
                        className="btn-grad"
                        type="button"
                        value="Clear"
                        onClick={ResetDropDown}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* Cards */}
          <div className="row">
            <div className="column">
              <div className="Dashboardcard  bg-c-darkhash  order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <div>
                      <LuRefreshCw />
                    </div>
                    <span className="DashboardCardTitle">
                      Last 1 hour Up time
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VV_AllMachinesUpTimePercentage}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Last 1 hour Up time</span> */}
                    </div>
                    <div className="flexRight">{/* <span>0</span> */}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="Dashboardcard bg-c-blue order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <FaRegPauseCircle />
                        </div>
                      }
                      className="DashboardPopup"
                      // position="right center"
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {VVDashboardCards?._VV_MachineIdleCalculation
                            ?.length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={
                                  VVDashboardCards?._VV_MachineIdleCalculation
                                }
                                filename={"MachineIdleCalculation.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <table id="DashboardPopupTable">
                            <tbody>
                              {renderHeaderEvent()}
                              {renderMachineIdleCalculation()}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Popup>
                    <span className="DashboardCardTitle">
                      Idle more than 3 hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        {VVDashboardCards.count_VV_MachineIdleCalculation}
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Idle more than 3 hours</span> */}
                    </div>
                    <div className="flexRight">
                      <span>
                        {/* {VVDashboardCards.Count_VV_MachineIdleCalculation} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-yellow order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <BiNoSignal />
                        </div>
                      }
                      className="DashboardPopup"
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {VVDashboardCards._VV_DownTime_OutOfService.length >
                          0 ? (
                            <button className="Export">
                              <CSVLink
                                data={
                                  VVDashboardCards._VV_DownTime_OutOfService
                                }
                                filename={"OutOfService.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <table id="DashboardPopupTable">
                            <tbody>
                              {renderHeaderOutOfService()}
                              {renderOutOfServiceCalculation()}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Popup>
                    <span className="DashboardCardTitle">
                      Down more than 1 hour
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        {VVDashboardCards.count_VV_DownTime_OutOfService}
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Down more than 2 hours</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_DownTime_OutOfService}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="Dashboardcard bg-c-pink order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <HiMiniTicket />
                        </div>
                      }
                      className="DashboardPopup"
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {VVDashboardCards._VV_AllTicket.length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={VVDashboardCards._VV_AllTicket}
                                filename={"AllTicket.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <table id="DashboardPopupTable">
                            <tbody>
                              {renderHeaderActiveTickets()}
                              {renderActiveTickets()}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Popup>
                    <span className="DashboardCardTitle">Active tickets</span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VVDashboardCards.count_VV_AllTicket}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Active tickets</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_AllTicket}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div className="column">
              <div className="Dashboardcard  bg-c-darkbrown order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <FaMoneyBillTransfer />
                        </div>
                      }
                      modal
                      nested
                      className="DashboardPopup"
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {" "}
                          {VVDashboardCards._VV_AllMachinesCashAvailable
                            .length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={
                                  VVDashboardCards._VV_AllMachinesCashAvailable
                                }
                                filename={"CashAvailabilityAllMachines.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <table id="DashboardPopupTable">
                            <tbody>
                              {renderHeaderCashAvailability()}
                              {renderCashAvailability()}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Popup>

                    <span className="DashboardCardTitle">
                      Cash Availability
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VVDashboardCards.Per_VV_CashAvailability}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      <span>Cash Availability</span>
                    </div>
                    <div className="flexRight">
                      <span>{VVDashboardCards.Per_VV_CashAvailability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}{" "}
            <div className="column">
              <div className="Dashboardcard  bg-c-darkbrown order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <GiMoneyStack />
                        </div>
                      }
                      modal
                      nested
                      className="DashboardPopup"
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {" "}
                          {VVDashboardCards._VV_AllMachinesCashAvailable
                            .length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={
                                  VVDashboardCards._VV_AllMachinesCashAvailable
                                }
                                filename={"CashAvailabilityAllMachines.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          {SelectedDashboardDropDownValues.BankName == "" ? (
                            DashboardBankNameDropDown.map((BankName, index) => (
                              <div
                                key={index}
                                className="DashboardPopupAccordian"
                              >
                                <Accordion>
                                  <div className="DashboardPopupAccordian_header">
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                    >
                                      <Typography>{BankName}</Typography>
                                    </AccordionSummary>{" "}
                                  </div>
                                  <AccordionDetails>
                                    <Typography>
                                      <table id="DashboardPopupTable">
                                        <tbody>
                                          {renderHeaderCashAvailability()}
                                          {renderCashAvailabilityWithSearch({
                                            BankName,
                                          })}
                                        </tbody>
                                      </table>
                                    </Typography>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                            ))
                          ) : (
                            <div className="DashboardPopupAccordian">
                              <Accordion defaultExpanded>
                                <div className="DashboardPopupAccordian_header">
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                  >
                                    <Typography>
                                      {SelectedDashboardDropDownValues.BankName}
                                    </Typography>
                                  </AccordionSummary>{" "}
                                </div>
                                <AccordionDetails>
                                  <Typography>
                                    <table id="DashboardPopupTable">
                                      <tbody>
                                        {renderHeaderCashAvailability()}
                                        {renderCashAvailability()}
                                      </tbody>
                                    </table>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          )}
                        </div>
                      )}
                    </Popup>

                    <span className="DashboardCardTitle">
                      Cash Availability
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VVDashboardCards.per_VV_CashAvailability}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cash Availability</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Per_VV_CashAvailability}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-green order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <TbCashBanknoteOff />
                        </div>
                      }
                      className="DashboardPopup"
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {VVDashboardCards._VV_OutOfCash.length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={VVDashboardCards._VV_OutOfCash}
                                filename={"OutOfCash.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          {SelectedDashboardDropDownValues.BankName == "" ? (
                            DashboardBankNameDropDown.map((BankName, index) => (
                              <div
                                key={index}
                                className="DashboardPopupAccordian"
                              >
                                <Accordion>
                                  <div className="DashboardPopupAccordian_header">
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                    >
                                      <Typography>{BankName}</Typography>
                                    </AccordionSummary>{" "}
                                  </div>
                                  <AccordionDetails>
                                    <Typography>
                                      <table id="DashboardPopupTable">
                                        <tbody>
                                          {renderHeaderOutofCash()}
                                          {renderOutOfCashWithSearch({
                                            BankName,
                                          })}
                                        </tbody>
                                      </table>
                                    </Typography>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                            ))
                          ) : (
                            <div className="DashboardPopupAccordian">
                              <Accordion defaultExpanded>
                                <div className="DashboardPopupAccordian_header">
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                  >
                                    <Typography>
                                      {SelectedDashboardDropDownValues.BankName}
                                    </Typography>
                                  </AccordionSummary>{" "}
                                </div>
                                <AccordionDetails>
                                  <Typography>
                                    <table id="DashboardPopupTable">
                                      <tbody>
                                        {renderHeaderOutofCash()}
                                        {renderOutOfCash()}
                                      </tbody>
                                    </table>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          )}
                        </div>
                      )}
                    </Popup>
                    <span className="DashboardCardTitle">
                      Currently Out Of Cash (Less than 500 Notes)
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VVDashboardCards.count_VV_OutOfCash}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Out Of Cash</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_OutOfCash}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <FaCreditCard />
                        </div>
                      }
                      modal
                      nested
                      className="DashboardPopup"
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {VVDashboardCards._VV_CardsCaptured.length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={VVDashboardCards._VV_CardsCaptured}
                                filename={"CardsCaptured.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>

                          <table id="DashboardPopupTable">
                            <tbody>
                              {renderHeaderCardsCaptured()}
                              {renderCardsCaptured()}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Popup>
                    <span className="DashboardCardTitle">
                      Cards Captured Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VVDashboardCards.count_VV_CardsCaptured}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <HiOutlineDocumentDuplicate />
                        </div>
                      }
                      modal
                      nested
                      className="DashboardPopup"
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {VVDashboardCards._VV_RepeatedTickets.length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={VVDashboardCards._VV_RepeatedTickets}
                                filename={"RepeatedTickets.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <table id="DashboardPopupTable">
                            <tbody>
                              {renderHeader_RepeatedTickets()}
                              {render_RepeatedTickets()}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Popup>
                    <span className="DashboardCardTitle">
                      Repeated Tickets Last 5 Days
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VVDashboardCards.count_VV_RepeatedTickets}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <Popup
                      trigger={
                        <div className="DashboardIcons">
                          <BsBootstrapReboot />
                        </div>
                      }
                      modal
                      nested
                      className="DashboardPopup"
                    >
                      {(close) => (
                        <div className="DashboardModal">
                          {VVDashboardCards._VV_RebootedMachines.length > 0 ? (
                            <button className="Export">
                              <CSVLink
                                data={VVDashboardCards._VV_RebootedMachines}
                                filename={"RebootedMachine.csv"}
                                target="_blank"
                              >
                                <BiExport />
                              </CSVLink>
                            </button>
                          ) : null}
                          <button className="close" onClick={close}>
                            &times;
                          </button>

                          <table id="DashboardPopupTable">
                            <tbody>
                              {renderHeader_RebootedMachines()}
                              {render_RebootedMachines()}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Popup>
                    <span className="DashboardCardTitle">
                      Reboots last 24 hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>{VVDashboardCards.count_VV_RebootedMachines}</span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    {" "}
                    <MdOutlineAssignmentInd />
                    <span className="DashboardCardTitle">
                      Average Assignment time Last 1 Month
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        {VVDashboardCards.avg_VV_AverageAssignmentTime} Minutes
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <div className="">
                      <FaFileCircleCheck />
                    </div>

                    <span className="DashboardCardTitle">
                      Average Resolution time Last 1 Month
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        {VVDashboardCards.avg_VV_AverageResolutionTime > 1
                          ? VVDashboardCards.avg_VV_AverageResolutionTime +
                            " Hours"
                          : VVDashboardCards.avg_VV_AverageResolutionTime +
                            " Hour"}
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <TbReportMoney />
                    <span className="DashboardCardTitle">
                      Statement Request Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        {" "}
                        {VVDashboardCards.count_VV_StatementRequestTransaction}
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <GiReceiveMoney />
                    <span className="DashboardCardTitle">
                      Cash Wihdrawals Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        <NumericFormat
                          className="flexCenter"
                          thousandSeparator
                          value={
                            VVDashboardCards.count_VV_CashWithDrawalTransaction
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <MdAccountBalanceWallet />
                    <span className="DashboardCardTitle">
                      Balance Enquiry Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        <NumericFormat
                          className="flexCenter"
                          thousandSeparator
                          value={
                            VVDashboardCards.count_VV_BalanceEnquiryTransaction
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <FaMoneyBillTransfer />
                    <span className="DashboardCardTitle">
                      Deposit Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        <NumericFormat
                          className="flexCenter"
                          thousandSeparator
                          value={VVDashboardCards.count_VV_DepositTransaction}
                        />
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <FaMoneyBillTransfer />
                    <span className="DashboardCardTitle">
                      Pin change Requests Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        <NumericFormat
                          className="flexCenter"
                          thousandSeparator
                          value={VVDashboardCards.count_VV_PinChangeTransaction}
                        />
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <MdMiscellaneousServices />
                    <span className="DashboardCardTitle">
                      Success Transactions Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        <NumericFormat
                          className="flexCenter"
                          thousandSeparator
                          value={
                            VVDashboardCards.count_VV_SuccessfulTransaction
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgray order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <VscError />
                    <span className="DashboardCardTitle">
                      Failed Transactions Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        <NumericFormat
                          className="flexCenter"
                          thousandSeparator
                          value={
                            AllFailedTransactions.length > 0
                              ? AllFailedTransactions.length
                              : 0
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Failed Transactions</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{AllFailedTransactions.length}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <MdMiscellaneousServices />
                    <span className="DashboardCardTitle">
                      Cancelled Transactions Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        {VVDashboardCards.count_VV_CancelledTransaction}
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="Dashboardcard bg-c-darkgreen order-card">
                <div className="Dashboardcard-block">
                  <div className="flex-container">
                    <GrServices />
                    <span className="DashboardCardTitle">
                      Timeout Transactions Last 48 Hours
                    </span>
                  </div>
                  <div className="">
                    <div className="flexCenter">
                      <span>
                        {VVDashboardCards.count_VV_TimeoutTransaction}
                      </span>
                    </div>
                  </div>
                  <div className=" flex-container">
                    <div className="DashboardCardContent">
                      {/* <span>Cards Captured</span> */}
                    </div>
                    <div className="flexRight">
                      {/* <span>{VVDashboardCards.Count_VV_CardsCaptured}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
