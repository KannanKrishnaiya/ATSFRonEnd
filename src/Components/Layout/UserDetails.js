// import "../../assets/styles/CustomStyles/LoggedInUserDetails.css";
// import { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Link,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { GetUserDetailsAPI, LoggedInUser } from "../../services/Api";
// import { Logout } from "../../services/Auth";
// import { isAuthenticated } from "../../services/Auth";
// import { Login } from "../../Components/Pages/LoginPage";
// import { setUser } from "../../redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { GetUserRoleDetailsByNameAPI } from "../../services/User/UserService";

// export default function LoggedInUserDetails(User) {
//   const dispatch = useDispatch();

//   const LoggedInUserRoleDetailsData = useSelector(
//     (state) => state.user.userDetails
//   );
//   //const [LoggedUser,setUser] =   useState({LoggedInUserName:"",LoggedInUserEmail:""});
//   const [LoggedUserAvatar, setLoggedUserAvatar] = useState({
//     firstNameInitial: "",
//     lastNameInitial: "",
//   });
//   const navigate = useNavigate();

//   const Userdetails = localStorage.getItem("LoggedInUser");
//   const [_isAuthenticated, setIsAuthenticated] = useState(true);

//   useEffect(() => {
//     if (Userdetails != null) {
//       // GetUserDetailsAPI(Userdetails)
//       GetUserRoleDetailsByNameAPI(Userdetails)
//         .then((response) => {

//           if (response.status !== 200 || response === null) {
//             LogoutUser();
//           }

//           const data = response?.data[0];

//           const UserRoleDetails = {
//             Id: data?.id,
//             BankName: data?.bankName,
//             Designation: data?.designation,
//             Email: data?.email,
//             FirstName: data?.firstName,
//             LastName: data?.lastName,
//             MobileNumber: data?.mobileNumber,
//             RoleId: data?.roleId,
//             RoleName: data?.roleName,
//             UserName: data?.userName,
//           };

//           dispatch(
//             setUser({
//               userDetails: UserRoleDetails,
//             })
//           );

//           // const userData = JSON.parse(localStorage.getItem("LoggedInUser"));
//           data.email = response.data.Email;
//           data.designation = response.data.Designation;
//           data.firstName = response.data.FirstName;
//           data.lastName = response.data.LastName;
//           data.mobileNumber = response.data.MobileNumber;

//           setLoggedUserAvatar({
//             firstNameInitial: LoggedInUserRoleDetailsData.FirstName
//               ? LoggedInUserRoleDetailsData.FirstName[0]
//               : "",
//             lastNameInitial: LoggedInUserRoleDetailsData.LastName
//               ? LoggedInUserRoleDetailsData.LastName[0]
//               : "",
//           });
//         })
//         .catch((err) => {
//           if (err.response != null) {
//             if (err.response.status != 200) {
//               LogoutUser();
//             }
//           }
//         })
//         .finally(() => {
//           // setLoading(false);
//         });
//     } else {
//       LogoutUser();
//     }
//   }, []);

//   const LogoutUser = () => {
//     Logout();
//   };

//   return (
//     <div className="LoggedInUserDetailsTab">
//       <div className="wrap">
//         <div>
//           <img
//             className="CompanyLogo"
//             src="https://cns-me.com/wp-content/uploads/2022/07/CNS_MIDDLE_EAST_Logo-1.png"
//             alt=""
//           />
//         </div>
//         {/* <span>Two</span> */}

//         <div>
//           <span className="UserAvataritem">
//             <Link onClick={LogoutUser} to="/login">
//               Logout
//             </Link>
//           </span>
//           <span className="UserAvataritem user-profile-image">

//             {LoggedInUserRoleDetailsData?.FirstName
//               ? LoggedInUserRoleDetailsData?.FirstName[0]
//               : ""}
//             {LoggedInUserRoleDetailsData?.LastName
//               ? LoggedInUserRoleDetailsData?.LastName[0]
//               : ""}
//           </span>
//         </div>
//       </div>

//     </div>
//   );
// }

import "../../assets/styles/CustomStyles/LoggedInUserDetails.css";
import { MdLogout, MdOutlineLockReset } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { GetUserRoleDetailsByNameAPI } from "../../services/User/UserService";
import { Logout } from "../../services/Auth";
import { setUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAPI } from "../../services/Api";

export default function LoggedInUserDetails(User) {
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const LoggedInUserRoleDetailsData = useSelector(
    (state) => state.user.userDetails
  );
  const [LoggedUserAvatar, setLoggedUserAvatar] = useState({
    firstNameInitial: "",
    lastNameInitial: "",
  });
  const navigate = useNavigate();
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (Userdetails != null) {
      GetUserRoleDetailsByNameAPI(Userdetails)
        .then((response) => {
          if (response.status !== 200 || response === null) {
            LogoutUser();
          }
          const data = response?.data[0];
          const UserRoleDetails = {
            Id: data?.id,
            BankName: data?.bankName,
            Designation: data?.designation,
            Email: data?.email,
            FirstName: data?.firstName,
            LastName: data?.lastName,
            MobileNumber: data?.mobileNumber,
            RoleId: data?.roleId,
            RoleName: data?.roleName,
            UserName: data?.userName,
          };
          dispatch(setUser({ userDetails: UserRoleDetails }));
          setLoggedUserAvatar({
            firstNameInitial: UserRoleDetails.FirstName
              ? UserRoleDetails.FirstName[0]
              : "",
            lastNameInitial: UserRoleDetails.LastName
              ? UserRoleDetails.LastName[0]
              : "",
          });
        })
        .catch((err) => {
          if (err.response != null && err.response.status != 200) {
            LogoutUser();
          }
        });
    } else {
      LogoutUser();
    }
  }, []);

  const LogoutUser = () => {
    Logout();
  };

  const handleLogout = async () => {
    try {
      await LogoutAPI(Userdetails);
      LogoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarClick = () => {
    setShowPopup(!showPopup);
  };

  const handleOptionSelect = (option) => {
    if (option === "logout") {
      handleLogout();
    } else if (option === "changePassword") {
      navigate("/ChangePassword");
    }
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const avatarStyle = {
  //   width: "30px",
  //   height: "30px",
  //   borderRadius: "50%",
  //   backgroundColor: "#fff",
  //   color: "black",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   fontSize: "16px",
  //   fontWeight: "bold",
  // };

  // const popupMenuStyle = {
  //   position: "absolute",
  //   top: "50px",
  //   right: "0",
  //   backgroundColor: "white",
  //   border: "1px solid #ddd",
  //   borderRadius: "4px",
  //   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  //   zIndex: "1000",
  //   width: "150px",
  // };

  // const buttonStyle = {
  //   width: "100%",
  //   padding: "10px",
  //   border: "none",
  //   background: "none",
  //   textAlign: "left",
  //   color: "#333",
  //   cursor: "pointer",
  // };

  return (
    <div className="LoggedInUserDetailsTab">
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            className="CompanyLogo"
            src="https://cns-me.com/wp-content/uploads/2022/07/CNS_MIDDLE_EAST_Logo-1.png"
            alt=""
          />
        </div>
        <div className="user-avatar-container" onClick={handleAvatarClick}>
          <div className="LoggedInUserDetailsTabName">
            Welcome{" "}
            <span className="welcomeText">
              {LoggedInUserRoleDetailsData?.UserName}
            </span>
          </div>
          <div className="avatarStyle">
            {LoggedInUserRoleDetailsData?.FirstName
              ? LoggedInUserRoleDetailsData?.FirstName[0]
              : ""}
            {LoggedInUserRoleDetailsData?.LastName
              ? LoggedInUserRoleDetailsData?.LastName[0]
              : ""}
          </div>
          {showPopup && (
            <div ref={popupRef} className="popupMenu popupMenuStyle">
              <button
                className="buttonStyle"
                onClick={() => handleOptionSelect("changePassword")}
              >
                <MdOutlineLockReset className="iconStyle" />
                Change Password
              </button>
              <hr />
              <button
                className="buttonStyle"
                onClick={() => handleOptionSelect("logout")}
              >
                <MdLogout className="iconStyle marginLeft" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
