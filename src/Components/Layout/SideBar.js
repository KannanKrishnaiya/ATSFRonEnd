import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaChartBar,
  FaFileContract,
  FaMoneyCheck,
  FaMoneyCheckAlt,
  FaChartLine,
  FaFileInvoiceDollar,
  FaCheck,
  FaSearchengin,
  FaAngleDoubleRight,
  FaArchive,
  FaTicketAlt,
} from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { IoSpeedometerOutline, IoSpeedometerSharp } from "react-icons/io5";
import { GrUserAdmin, GrDocumentStore } from "react-icons/gr";
import {
  AiOutlineBank,
  AiFillHeart,
  AiTwotoneFileExclamation,
} from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import LoggedInUserDetails from "./UserDetails";
import { Logout } from "../../services/Auth";
import VynamicViewDashboard from "../Pages/VynamicView/VynamicViewAllTickets";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiDiscussion } from "react-icons/gi";
import { GoDiscussionClosed } from "react-icons/go";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiNotePencilBold, PiVanLight } from "react-icons/pi";
import "../../assets/styles/CustomStyles/Custom.css";
import { useSelector } from "react-redux";

const Userdetails = localStorage.getItem("LoggedInUser");

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const LoggedInUserRoleDetailsData = useSelector(
    (state) => state.user.userDetails
  );
  const LoggedInUserRoleDetails = JSON.parse(
    localStorage.getItem("LoggedInUserRoleDetails")
  );



  const routes = [
    {
      path: "/Dashboard",
      name: (
        <div className="Sidebartooltip">
          Dashboard
          <span className="tooltiptext">Dashboard</span>
        </div>
      ),
      icon: (
        <div className="Sidebartooltip">
          <FaHome />
          <span className="tooltiptext">Dashboard</span>
        </div>
      ),
    },
    // {
    //   path: "/Chartspage",
    //   name: "Chartspage",
    //   icon: <FaChartBar />,
    // },
    LoggedInUserRoleDetailsData?.RoleId !== null &&
    LoggedInUserRoleDetailsData?.RoleId == "1"
      ? {
          path: "/",
          name: (
            <div className="Sidebartooltip">
              Discussion Board
              <span className="tooltiptext"> Discussion Board</span>
            </div>
          ),
          icon: (
            <div className="Sidebartooltip">
              <FaChalkboardTeacher />
              <span className="tooltiptext"> Discussion Board</span>
            </div>
          ),
          subRoutes: [
            {
              path: "/Requests",
              name: "Request Submission",
              icon: <VscGitPullRequestGoToChanges />,
            },
            {
              path: "/PendingRequests",
              name: "Pending Actions View",
              icon: <MdOutlinePendingActions />,
            },
            {
              path: "/DiscussionPage",
              name: "Discussion Board",
              icon: <GoDiscussionClosed />,
            },
          ],
        }
      : { path: "/" },
    {
      path: "ViewTransactions",
      name: (
        <div className="Sidebartooltip">
          ViewTransactions
          <span className="tooltiptext">View Transactions</span>
        </div>
      ),
      icon: (
        <div className="Sidebartooltip">
          <FaChartLine />
          <span className="tooltiptext">View Transactions</span>
        </div>
      ),
      subRoutes: [
        {
          path: "/CashWithdrawTransactions",
          name: "Cash WithDrawal",
          icon: <FaFileInvoiceDollar />,
        },
        {
          path: "/CashDepositTransactions",
          name: "Cash Deposit",
          icon: <FaMoneyCheckAlt />,
        },
        {
          path: "/ViewAllTransactions",
          name: "View All Transactions",
          icon: <FaMoneyCheck />,
        },
        {
          path: "/ViewAllFailedTransactions",
          name: "View All Failed Transactions",
          icon: <FaFileContract />,
        },
        {
          path: "/ViewOtherTransactions",
          name: "Non Cash Transactions",
          icon: <AiOutlineBank />,
        },
      ],
    },
    // {
    //   path: "/MsPage",
    //   name: "MsPage",
    //   icon: <GrValidate />,
    // },
    // {
    //   path: "/DataTable",
    //   name: "DataTable",
    //   icon: <BiAnalyse />,
    // } ,
    // {
    //   path: "/TestPage",
    //   name: "TestPage",
    //   icon: <FaUser />,
    // },
    // {
    //   path: "/TestPage",
    //   name: "TestPage",
    //   icon: <BiSearch />,
    // },

    {
      path: "Reports",
      name: (
        <div className="Sidebartooltip">
          Reports
          <span className="tooltiptext">Reports</span>
        </div>
      ),
      icon: (
        <div className="Sidebartooltip">
          <PiNotePencilBold />
          <span className="tooltiptext">Reports</span>
        </div>
      ),
      subRoutes: [
        {
          path: "/GetVV_MachinesUpTime",
          name: "Machines UpTime",
          icon: <IoSpeedometerOutline />,
        },
        {
          path: "/CashReplenish",
          name: "Cash Replenish",
          icon: <PiVanLight />,
        },
      ],
    },
    LoggedInUserRoleDetailsData?.RoleId !== null &&
    LoggedInUserRoleDetailsData?.RoleId == "1"
      ? {
          path: "/",
          name: "Lookups",
          icon: <FaSearchengin />,
          subRoutes: [
            {
              path: "/VynamicViewDashboard",
              name: "Active Tickets",
              icon: <FaTicketAlt />,
            },
            {
              path: "/MachineDetails",
              name: "MachineDetails ",
              icon: <FaAngleDoubleRight />,
            },
            {
              path: "/Lookups_Bank",
              name: "Lookups_Bank ",
              icon: <FaAngleDoubleRight />,
            },
            // {
            //   path: "/settings/2fa",
            //   name: "2FA",
            //   icon: <FaLock />,
            // },
            // {
            //   path: "/settings/billing",
            //   name: "Billing",
            //   icon: <FaMoneyBill />,
            // },
          ],
        }
      : { path: "/" },
    LoggedInUserRoleDetailsData?.RoleId !== null &&
    LoggedInUserRoleDetailsData?.RoleId == "1"
      ? {
          path: "/",
          name: "CMDB",
          icon: <GrDocumentStore />,
          subRoutes: [
            {
              path: "/Lookups_Bank",
              name: "Items",
              icon: <FaAngleDoubleRight />,
            },
            {
              path: "/Lookups_Bank",
              name: "Groups",
              icon: <FaAngleDoubleRight />,
            },
            // {
            //   path: "/settings/2fa",
            //   name: "2FA",
            //   icon: <FaLock />,
            // },
            // {
            //   path: "/settings/billing",
            //   name: "Billing",
            //   icon: <FaMoneyBill />,
            // },
          ],
        }
      : { path: "/" },
    // {
    //   path: "/order",
    //   name: "Order",
    //   icon: <BsCartCheck />,
    // },
    // {
    //   path: "/settings",
    //   name: "Settings",
    //   icon: <BiCog />,
    //   exact: true,
    //   subRoutes: [
    //     {
    //       path: "/settings/profile",
    //       name: "Profile ",
    //       icon: <FaUser />,
    //     },
    //     {
    //       path: "/settings/2fa",
    //       name: "2FA",
    //       icon: <FaLock />,
    //     },
    //     {
    //       path: "/settings/billing",
    //       name: "Billing",
    //       icon: <FaMoneyBill />,
    //     },
    //   ],
    // },
    // {
    //   path: "/saved",
    //   name: "Saved",
    //   icon: <AiFillHeart />,
    // },
    // {
    //   path: "/LoggedInUserDetails",
    //   name: "LoggedInUserDetails",
    //   icon: <AiFillHeart />,
    // },

    LoggedInUserRoleDetailsData?.RoleId !== null &&
    LoggedInUserRoleDetailsData?.RoleId == "1"
      ? {
          path: "/",
          name: "Admin",
          icon: <GrUserAdmin />,
          subRoutes: [
            {
              path: "/UserRegister",
              name: "Create User",
              icon: <FaAngleDoubleRight />,
            },
            {
              path: "/ChangePassword",
              name: "Change Password",
              icon: <FaAngleDoubleRight />,
            },
            {
              path: "/ResetPassword",
              name: "Reset Password",
              icon: <FaAngleDoubleRight />,
            },
            {
              path: "/Lookups_Bank",
              name: "SLA Configuration",
              icon: <FaAngleDoubleRight />,
            },
            {
              path: "/SendMail",
              name: "Mail Config",
              icon: <FaAngleDoubleRight />,
            },
            // {
            //   path: "/settings/2fa",
            //   name: "2FA",
            //   icon: <FaLock />,
            // },
            // {
            //   path: "/settings/billing",
            //   name: "Billing",
            //   icon: <FaMoneyBill />,
            // },
          ],
        }
      : { path: "/" },
  ];
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <div>
        <LoggedInUserDetails />
        <div className="main-container">
          <motion.div
            animate={{
              width: isOpen ? "20%" : "3%",
              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
            className={"sidebar"}
          >
            <div className="top_section">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="AppName"
                  >
                    <div>Managed Services ATS-2K</div>
                  </motion.h1>
                )}
              </AnimatePresence>

              <div className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>
            {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
            <section className="routes">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      key={index}
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <div key={index}>
                    <NavLink to={route.path} key={index} className="link">
                      <div className="icon">{route.icon}</div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text"
                          >
                            {route.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </div>
                );
              })}
            </section>
          </motion.div>
          <div className="Contentbar">
            <div className="MainContent">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
