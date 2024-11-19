import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, Logout } from "./services/Auth";
import "./assets/styles/CustomStyles/Custom.css";
import LoaderComp from "./Components/Layout/Loader";
import Dashboard from "./Components/Pages/Dashboard";
import LoginPage from "./Components/Pages/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage";
import SideBar from "./Components/Layout/SideBar";
import TestPage from "./Components/Pages/TestPage";
import MsPage from "./Components/Pages/MSPage";
import DataTablePage from "./Components/Pages/DataTable";
import Chartspage from "./Components/Pages/Chartspage";
import MachineDetails from "./Components/Pages/Lookup/MachineDetails";
import Transactions from "./Components/Pages/Transactions";
import CashWithdrawTransactions from "./Components/Pages/Transactions/CashWithdrawTransactions";
import CashDepositTransactions from "./Components/Pages/Transactions/CashDepositTransactions";
import ViewAllTransactions from "./Components/Pages/Transactions/ViewAllTransactions";
import ViewAllFailedTransactions from "./Components/Pages/Transactions/ViewAllFailedTransactions";
import Lookups_Bank from "./Components/Pages/Lookup/Lookups_Bank";
import VynamicViewDashboard from "./Components/Pages/VynamicView/VynamicViewAllTickets";
import UserRegister from "./Components/Pages/Admin/User/UserRegister";
import ChangePassword from "./Components/Pages/Admin/User/ChangePassword";
import ResetPassword from "./Components/Pages/Admin/User/ResetPassword";
import SendMail from "./Components/Pages/Admin/Mail/SendMail";
import RequestSubmission from "./Components/Pages/Discussion/PendingRequests";
import DiscussionPage from "./Components/Pages/Discussion/DiscussionPage";
import PendingRequests from "./Components/Pages/Discussion/PendingRequests";
import Requests from "./Components/Pages/Discussion/Requests";
import ErrorPage_404 from "./Components/Pages/Error/ErrorPage_404";
import ViewOtherTransactions from "./Components/Pages/Transactions/ViewOtherTransactions";
import GetVV_MachinesUpTime from "./Components/Pages/MachineUptimeCalculation/GetVV_MachinesUpTime";
import CashReplenish from "./Components/Pages/Reports/Cash/CashReplenish";
import DepositClearanceRpt from "./Components/Pages/Reports/Cash/DepositClearanceRpt";
import ChequeClearanceRpt from "./Components/Pages/Reports/Cash/ChequeClearanceRpt";
import { Box, Button, Modal, Typography,Stack } from "@mui/material";
import { fetchRefreshTokenAPI, LogoutAPI } from "./services/Api";

function App() {
    const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [_isAuthenticated, setIsAuthenticated] = useState(true);
  //const navigate = useNavigate();
  const LoggedInUserRole = localStorage.getItem("LoggedInUserRoleDetails");

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  useEffect(() => {
    setIsAuthenticated(isAuthenticated);
  });

  const modalStyles = {
    display: showModal ? "flex" : "none",
    position: "fixed",
    zIndex: 1000,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalContentStyles = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    position: "relative",
  };

   const Userdetails = localStorage.getItem("LoggedInUser");
  
    const handleLogout = async () => {
      try {
        await LogoutAPI(Userdetails);
        Logout();
      } catch (error) {
        console.log(error);
      }
    };
  
  const handleContinue = async () => {
    try {
      const newTokenData = await fetchRefreshTokenAPI(Userdetails);
    
     
    } catch (error) {
      if (error.response?.status !== 200) {
        LogoutAPI(Userdetails);
        Logout();
      }
    }
    setShowModal(false);
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <LoaderComp />
        </div>
      ) : (
        <div>
          <Router>
            {_isAuthenticated ? (
              <>
                {/* <div>
                  {showModal && (
                    <div className="modalStyles" style={modalStyles}>
                      <div
                        className="modalContentStyles"
                        style={modalContentStyles}
                      >
                        <h3>
                          Your Session has expired. Do you want to proceed?
                        </h3>
                        <br />
                          <Button
                            color="error"
                          size="small"
                          variant="contained"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>{" "}
                        &nbsp; &nbsp; &nbsp;{" "}
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleContinue}
                        >
                        Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </div> */}
                <SideBar>
                  <Routes>
                    <Route
                      path="*"
                      element={<Navigate to="/Dashboard" replace />}
                    />
                    {/* <Route path="*" element={<> not found </>} /> */}
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Chartspage" element={<Chartspage />} />
                    <Route path="/MsPage" element={<MsPage />} />
                    <Route path="/DataTable" element={<DataTablePage />} />
                    <Route
                      path="/MachineDetails"
                      element={<MachineDetails />}
                    />
                    <Route path="/Lookups_Bank" element={<Lookups_Bank />} />
                    <Route path="/UserRegister" element={<UserRegister />} />
                    <Route
                      path="/ChangePassword"
                      element={<ChangePassword />}
                    />
                    {/* <Route path="/ResetPassword" element={<ResetPassword />} /> */}

                    <Route path="/SendMail" element={<SendMail />} />
                    <Route
                      path="/ViewAllTransactions"
                      element={<ViewAllTransactions />}
                    />
                    <Route
                      path="/ViewAllFailedTransactions"
                      element={<ViewAllFailedTransactions />}
                    />
                    <Route
                      path="/CashWithdrawTransactions"
                      element={<CashWithdrawTransactions />}
                    />
                    <Route
                      path="/CashDepositTransactions"
                      element={<CashDepositTransactions />}
                    />
                    <Route
                      path="/ViewOtherTransactions"
                      element={<ViewOtherTransactions />}
                    />
                    <Route
                      path="/VynamicViewDashboard"
                      element={<VynamicViewDashboard />}
                    />
                    <Route path="/Requests" element={<Requests />} />
                    <Route
                      path="/PendingRequests"
                      element={<PendingRequests />}
                    />
                    <Route
                      path="/DiscussionPage"
                      element={<DiscussionPage />}
                    />
                    <Route path="/ErrorPage_404" element={<ErrorPage_404 />} />

                    <Route
                      path="/GetVV_MachinesUpTime"
                      element={<GetVV_MachinesUpTime />}
                    />
                    <Route path="/CashReplenish" element={<CashReplenish />} />
                    <Route
                      path="/DepositClearanceRpt"
                      element={<DepositClearanceRpt />}
                    />
                    <Route
                      path="/ChequeClearanceRpt"
                      element={<ChequeClearanceRpt />}
                    />
                  </Routes>
                </SideBar>
              </>
            ) : (
              <Routes>
                <Route path="/" element={<LoginPage />} exact />
                <Route path="/Login" element={<LoginPage />} />

                {/* <Route path="/Register" element={<RegisterPage />} />
                 <Route path="/Dashboard" element={<Dashboard />} />   */}
              </Routes>
            )}
            {/* {isAuthenticated ? <LoggedInUserDetails/>   */}
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
