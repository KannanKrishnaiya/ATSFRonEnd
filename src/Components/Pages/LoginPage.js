import "../../assets/styles/CustomStyles/LoginPage.css";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  LoginApi,
  LoggedInUser,
  GetUserDetailsAPI,
  LogoutAPI,
  fetchRefreshTokenAPI,
} from "../../services/Api";
import { StoreUserData } from "../../services/Storage";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/Auth";
import { color } from "framer-motion";

import { Logout } from "../../services/Auth";
import { SetLoggedInUserRoleDetails } from "../../services/Storage";
import { GetUserRoleDetailsByEmailAPI } from "../../services/User/UserService";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const [isApiSuccess, setIsApiSuccess] = useState(false);

  const dispatch = useDispatch();
  const initialErrors = {
    password: { password: false },
    name: { name: false },
    custom_error: null,
  };
  var IsLoaded = 0;
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [errors, setErrors] = useState(initialErrors);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialErrors;
    let hasError = false;
    if (inputs.name == "") {
      errors.name.required = true;
      hasError = true;
    }

    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }
    if (!hasError) {
      LoginApi(inputs)
        .then((response) => {
          setIsApiSuccess(true);
          StoreUserData(response.data);
          GetUserRoleDetailsByEmailAPI(response.data);

          //  59.99999972333333 minutes
          setIsApiSuccess(true);

          // localStorage.setItem("EnableRefreshToken", JSON.stringify(true));
          localStorage.setItem("myBoolean", JSON.stringify(isApiSuccess));
          //  const interval = setInterval(() => {
          //    localStorage.setItem("EnableRefreshToken", true);
          //    const status = JSON.parse(
          //      localStorage.getItem("EnableRefreshToken")
          //    );
          //    console.log("Refresh token enabled:", status);
          //  }, 6000); // Call every 6 seconds
          //  return () => clearInterval(interval);

          // Refresh Token Code
          // setTimeout(() => {
          //   localStorage.setItem("EnableRefreshToken", true); // Enable after delay

          //     const status = JSON.parse(
          //       localStorage.getItem("EnableRefreshToken")
          //     );
          //   console.log("Refresh token enabled.", status);
          // }, 6000); // 5000ms = 5 seconds
        })
        .catch((err) => {
          console.log("err", err);
          if (err.response != null) {
            if (err.response.status != "200") {
              console.log(err?.response?.data?.error?.title);
              setErrors({
                ...errors,
                custom_error: "Email or Password is incorrect.",
              });
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  useEffect(() => {
    console.log("IAm from useeffects");
    console.log("isApiSuccess", isApiSuccess);

    if (isApiSuccess) {
    }
  }, [isApiSuccess]);

  const [inputs, setInputs] = useState({
    password: "",
    name: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  if (isAuthenticated() && IsLoaded == 0) {
    // console.log("IsLoaded", IsLoaded);
    IsLoaded++;

    // GetUserDetailsAPI(Userdetails)
    GetUserRoleDetailsByEmailAPI(Userdetails)
      .then((response) => {
        if (response.status != 200 || response == null) {
          LogoutAPI(Userdetails);
          LogoutUser();
        }
        SetLoggedInUserRoleDetails(response.data[0]);

        const data = response.data[0];

        // console.log(response);

        const UserRoleDetails = {
          Id: data.userId,
          BankName: data.bankName,
          BankId: data.bankId,
          Designation: data.designation,
          Email: data.email,
          FirstName: data.firstName,
          LastName: data.lastName,
          MobileNumber: data.mobileNumber,
          RoleId: data.roleId,
          RoleName: data.roleName,
          UserName: data.userName,
        };

        console.log(UserRoleDetails);

        dispatch(
          setUser({
            userDetails: UserRoleDetails,
          })
        );

        setLoading(false);

        window.location = "Dashboard";
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status != 200) {
          LogoutAPI(Userdetails);
          LogoutUser();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const LogoutUser = () => {
    Logout();
  };

  return (
    <div>
      <ToastContainer />
      <div className="Loginbody">
        <div className="LoginPagebox">
          <div className="divCompanyLogo_Login">
            <img
              className="CompanyLogo_Login"
              src="https://cns-me.com/wp-content/uploads/2022/07/CNS_MIDDLE_EAST_Logo-1.png"
              alt=""
            />
          </div>
          <h2>Login</h2>
          <form className="formLogin" onSubmit={handleSubmit}>
            <div className="inputBox">
              <span className="fa fa-envelope"></span>
              <input
                type="text"
                name="name"
                placeholder="E-mail Address"
                onChange={handleInput}
              />

              {errors.name.required ? (
                <span className="text-danger">User Name is required.</span>
              ) : null}
            </div>
            <div className="inputBox">
              <span class="fa fa-lock"></span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInput}
              />
              {errors.password.required ? (
                <span className="text-danger">Password is required.</span>
              ) : null}
              {/* <label>Password</label> */}
            </div>

            <center>
              {" "}
              <div className="text-danger">
                <span>
                  {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                </span>
              </div>
            </center>

            <div className="RegisterPageDivRow RegisterPageDivButton">
              <input type="submit" name="sign-in" value="Sign In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
