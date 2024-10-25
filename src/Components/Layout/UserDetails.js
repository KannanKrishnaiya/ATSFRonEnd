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

export default function LoggedInUserDetails(User) {
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
      GetUserDetailsAPI(Userdetails)
        .then((response) => {
          if (response.status != "200" || response == null) {
            LogoutUser();
          }
          const userData = JSON.parse(localStorage.getItem("LoggedInUser"));
          userData.Email = response.data.Email;
          userData.Designation = response.data.Designation;
          userData.FirstName = response.data.FirstName;
          userData.LastName = response.data.LastName;
          userData.MobileNumber = response.data.MobileNumber;
          console.log("userData", userData.FirstName, userData.LastName);
          setLoggedUserAvatar({
            // firstNameInitial: response.data.UserName
            //   ? response.data.UserName.split("@")[0][0]
            //   : "",
            // lastNameInitial: response.data.Email
            //   ? response.data.UserName.split("@")[0][0]
            //   : "",

            firstNameInitial: userData.FirstName
              ? userData.FirstName.split("@")[0][0]
              : "",
            lastNameInitial: userData.LastName
              ? userData.LastName.split("@")[0][0]
              : "",
          });
        })
        .catch((err) => {
          if (err.response != null) {
            if (err.response.status != 200) {
              LogoutUser();
            }
          } else {
            LogoutUser();
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
            {LoggedUserAvatar.firstNameInitial}
            {LoggedUserAvatar.lastNameInitial}
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
