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
          console.log(response.data);

          StoreUserData(response.data);
        })
        .catch((err) => {
          console.log("err", err);
          if (err.response != null) {
            if (err.response.status != "200") {
              console.log(err.response.data.error_description);
              setErrors({
                ...errors,
                custom_error: err.response.data.error_description,
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
    console.log("IsLoaded", IsLoaded);
    IsLoaded++;
    console.log(Userdetails);
    // GetUserDetailsAPI(Userdetails)
      GetUserRoleDetailsByNameAPI(Userdetails)
      .then((response) => {
        if (response.status != "200" || response == null) {
          LogoutUser();
        }
        SetLoggedInUserRoleDetails(response.data[0]);
        console.log(response.data[0]);

        // const data = response.data[0];
        // const UserRoleDetails = {
        //   Id: data.Id,
        //   BankName: data.BankName,
        //   Designation: data.Designation,
        //   Email: data.Email,
        //   FirstName: data.FirstName,
        //   LastName: data.LastName,
        //   MobileNumber: data.MobileNumber,
        //   RoleId: data.RoleId,
        //   RoleName: data.RoleName,
        //   UserName: data.UserName,
        // };

        // dispatch(
        //   setUser({
        //     userDetails: UserRoleDetails,
        //   })
        // );

        setLoading(false);
        window.location = "Dashboard";
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status != 200) {
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
      <div className="Loginbody">
        <div className="LoginPagebox">
          <div style={{ textAlign: "center" }}>
            <img
              className="CompanyLogo_Login"
              src="https://cns-me.com/wp-content/uploads/2022/07/CNS_MIDDLE_EAST_Logo-1.png"
              alt=""
            />
          </div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <span className="fa fa-user"></span>
              <input
                type="text"
                name="name"
                placeholder="User Name"
                onChange={handleInput}
              />

              {errors.name.required ? (
                <span className="text-danger">User Name is required.</span>
              ) : null}
            </div>
            <div className="inputBox">
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

            <div className="text-danger">
              <span>
                {errors.custom_error ? <p>{errors.custom_error}</p> : null}
              </span>
            </div>
            <div className="RegisterPageDivRow RegisterPageDivButton">
              <input type="submit" name="sign-in" value="Sign In" />
            </div>
            {/* 
            <div className="">
              <h5>
                {" "}
                Create new account ? Please{" "}
                <Link to="/Register" style={{ color: "yellow" }}>
                  Register
                </Link>{" "}
              </h5>
            </div> */}

            <div className="">
              <h5>
                <Link to="/ForgotPassword" style={{ color: "yellow" }}>
                  Forgot Password
                </Link>
              </h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
