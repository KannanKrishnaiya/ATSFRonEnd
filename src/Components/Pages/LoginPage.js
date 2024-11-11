import "../../assets/styles/CustomStyles/LoginPage.css";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { LoginApi, LoggedInUser, GetUserDetailsAPI } from "../../services/Api";
import { StoreUserData } from "../../services/Storage";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/Auth";
import { color } from "framer-motion";

import { Logout } from "../../services/Auth";
import { SetLoggedInUserRoleDetails } from "../../services/Storage";
import { GetUserRoleDetailsByNameAPI } from "../../services/User/UserService";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
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
          StoreUserData(response.data);
          GetUserRoleDetailsByNameAPI(response.data);
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
    GetUserRoleDetailsByNameAPI(Userdetails)
      .then((response) => {
        if (response.status != 200 || response == null) {
          LogoutUser();
        }
        SetLoggedInUserRoleDetails(response.data[0]);

        setLoading(false);
        window.location = "Dashboard";
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status != 200) {
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
