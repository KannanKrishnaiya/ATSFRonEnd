import "../../assets/styles/CustomStyles/LoggedInUserDetails.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { GetUserDetailsAPI, LoggedInUser } from "../../services/Api";
import { Logout } from "../../services/Auth";
import { isAuthenticated } from "../../services/Auth";
import { Login } from "../../Components/Pages/LoginPage";
import { setUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetUserRoleDetailsByNameAPI } from "../../services/User/UserService";

export default function LoggedInUserDetails(User) {
  const dispatch = useDispatch();

  const LoggedInUserRoleDetailsData = useSelector(
    (state) => state.user.userDetails
  );
  //const [LoggedUser,setUser] =   useState({LoggedInUserName:"",LoggedInUserEmail:""});
  const [LoggedUserAvatar, setLoggedUserAvatar] = useState({
    firstNameInitial: "",
    lastNameInitial: "",
  });
  const navigate = useNavigate();

  const Userdetails = localStorage.getItem("LoggedInUser");
  const [_isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (Userdetails != null) {
      // GetUserDetailsAPI(Userdetails)
      GetUserRoleDetailsByNameAPI(Userdetails)
        .then((response) => {
          console.log(response);

          if (response.status !== 200 || response === null) {
            LogoutUser();
          }

          const data = response?.data[0];

          console.log(data);

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

          dispatch(
            setUser({
              userDetails: UserRoleDetails,
            })
          );

          // const userData = JSON.parse(localStorage.getItem("LoggedInUser"));
          data.email = response.data.Email;
          data.designation = response.data.Designation;
          data.firstName = response.data.FirstName;
          data.lastName = response.data.LastName;
          data.mobileNumber = response.data.MobileNumber;
          console.log(
            "LoggedInUserRoleDetailsData",
            LoggedInUserRoleDetailsData
          );
          setLoggedUserAvatar({
            firstNameInitial: LoggedInUserRoleDetailsData.FirstName
              ? LoggedInUserRoleDetailsData.FirstName[0]
              : "",
            lastNameInitial: LoggedInUserRoleDetailsData.LastName
              ? LoggedInUserRoleDetailsData.LastName[0]
              : "",
          });
        })
        .catch((err) => {
          if (err.response != null) {
            if (err.response.status != 200) {
              LogoutUser();
            }
          }
        })
        .finally(() => {
          // setLoading(false);
        });
    } else {
      LogoutUser();
    }
  }, []);

  const LogoutUser = () => {
    Logout();
  };

  return (
    <div className="LoggedInUserDetailsTab">
      <div className="wrap">
        <div>
          <img
            className="CompanyLogo"
            src="https://cns-me.com/wp-content/uploads/2022/07/CNS_MIDDLE_EAST_Logo-1.png"
            alt=""
          />
        </div>
        {/* <span>Two</span> */}

        <div>
          <span className="UserAvataritem">
            <Link onClick={LogoutUser} to="/login">
              Logout
            </Link>
          </span>
          <span className="UserAvataritem user-profile-image">
            {/* {LoggedUserAvatar.firstNameInitial}
            {LoggedUserAvatar.lastNameInitial} */}
            {LoggedInUserRoleDetailsData?.FirstName
              ? LoggedInUserRoleDetailsData?.FirstName[0]
              : ""}
            {LoggedInUserRoleDetailsData?.LastName
              ? LoggedInUserRoleDetailsData?.LastName[0]
              : ""}
          </span>
        </div>
      </div>
      {/* <div className="UserAvatar">
          <span className="UserAvataritem user-profile-image">
            {LoggedUserAvatar.firstNameInitial}
            {LoggedUserAvatar.lastNameInitial}
          </span>
          <span className="UserAvataritem">
            <Link onClick={LogoutUser} to="/login">
              Logout
            </Link>
          </span>
        </div> */}
    </div>
  );
}
