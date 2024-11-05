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

  const handleAvatarClick = () => {
    setShowPopup(!showPopup);
  };

  const handleOptionSelect = (option) => {
    if (option === "logout") {
      LogoutUser();
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
        <div
          className="user-avatar-container"
          onClick={handleAvatarClick}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div className="LoggedInUserDetailsTabName">
            Welcome <span className="welcomeText">{LoggedInUserRoleDetailsData?.UserName}</span>
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
            <div
              ref={popupRef} // Assign ref to popup menu
              className="popupMenu popupMenuStyle"
            >
              <button
                className="buttonStyle"
                onClick={() => handleOptionSelect("changePassword")}
              >
                <svg
                  className="iconStyle"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77c1.53 0 2.78 1.24 2.78 2.77zm-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37"
                  />
                </svg>
                Change Password
              </button>
              <button
                className="buttonStyle"
                onClick={() => handleOptionSelect("logout")}
              >
                <svg
                  className="iconStyle marginLeft"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.35"
                  >
                    <path d="M12 4h-7c-0.55 0 -1 0.45 -1 1v14c0 0.55 0.45 1 1 1h7" />
                    <path d="M9 12h11.5" />
                    <path d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5" />
                  </g>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
