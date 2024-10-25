import { useState } from "react";
import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
import { RegisterApi } from "../../../../services/Api";
import { StoreUserData } from "../../../../services/Storage";
import { isAuthenticated } from "../../../../services/Auth";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../../../../assets/styles/CustomStyles/FormControls.css";

export default function UserRegister() {
  const initialErrors = {
    Email: { required: false },
    Password: { Password: false },
    ConfirmPassword: { ConfirmPassword: false },
    FirstName: { FirstName: false },
    LastName: { LastName: false },
    MobileNumber: { MobileNumber: false },
    Designation: { Designation: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialErrors);

  // const[loading,setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialErrors;
    let hasError = false;
    if (inputs.FirstName == "") {
      errors.FirstName.required = true;
      hasError = true;
    }
    if (inputs.LastName == "") {
      errors.LastName.required = true;
      hasError = true;
    }
    if (inputs.MobileNumber == "") {
      errors.MobileNumber.required = true;
      hasError = true;
    }
    if (inputs.Designation == "") {
      errors.Designation.required = true;
      hasError = true;
    }
    if (inputs.Email == "") {
      errors.Email.required = true;
      hasError = true;
    }
    if (inputs.Password == "") {
      errors.Password.required = true;
      hasError = true;
    }
    if (inputs.ConfirmPassword == "") {
      errors.ConfirmPassword.required = true;
      hasError = true;
    }
    if (!hasError) {
      // setLoading(true);
      RegisterApi(inputs)
        .then((response) => {
          //console.log(response);
          StoreUserData(response.data.access_token);
        })
        .catch((err) => {
          // console.log(err);
          // console.log(err.response.status);
          // console.log(err.response.data.error_description);
          if (err.response.status == "400") {
            //console.log(err.response.data.error_description);
            setErrors({ ...errors, custom_error: "Error" });
          }
        })
        .finally(() => {
          //  setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    Designation: "",
  });

  const [MobileNumber, setMobileNumber] = useState("");
  const [MailId, setMailId] = useState("");
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isMobileNumber = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
  );

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });

    let errors = initialErrors;
    let hasError = false;

    if (event.target.name == "MobileNumber") {
      errors.MobileNumber.required = false;
      hasError = false;
      if (!isMobileNumber.test(event.target.value)) {
        errors.MobileNumber.required = true;
        hasError = true;
      }
    }

    if (event.target.name == "Email") {
      //console.log(event.target.value);
      errors.Email.required = false;
      hasError = false;
      if (!isEmail(event.target.value)) {
        // errors.email = "Wrong email";
        errors.Email.required = true;
        hasError = true;
      }
    }
    setErrors({ ...errors });
  };

  //   if (isAuthenticated()) {
  //     return <Navigate to="/Login" />;
  //   }

  return (
    <div className="DivContainer">
      <div className="UserRegisterPagebox">
        <Container>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <span>FirstName</span>
                <input
                  className="FormControl_input"
                  type="text"
                  name="FirstName"
                  placeholder="First Name"
                  onChange={handleInput}
                />
                {errors.FirstName.required ? (
                  <span className="text-danger">First Name is required.</span>
                ) : null}
              </div>

              <div className="column">
                <span>LastName</span>
                <input
                  className="FormControl_input"
                  type="text"
                  name="LastName"
                  placeholder="Last tName"
                  onChange={handleInput}
                />
                {errors.LastName.required ? (
                  <span className="text-danger">Last Name is required.</span>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="column">
                <span>MobileNumber</span>
                <input
                  className="FormControl_input"
                  type="text"
                  name="MobileNumber"
                  placeholder="Mobile Number"
                  onChange={handleInput}
                />
                {errors.MobileNumber.required ? (
                  <span className="text-danger">
                    Please enter valid mobile number.
                  </span>
                ) : null}
              </div>
              <div className="column">
                <span>Email Id</span>
                <input
                  className="FormControl_input"
                  type="text"
                  name="Email"
                  placeholder="Email Id"
                  onChange={handleInput}
                />
                {errors.Email.required ? (
                  <span className="text-danger">Invalid Email Id.</span>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="column">
                <span>Designation</span>
                <input
                  className="FormControl_input"
                  type="text"
                  name="Designation"
                  placeholder="Designation"
                  onChange={handleInput}
                />
                {errors.Designation.required ? (
                  <span className="text-danger">
                    Please enter valid Designation.
                  </span>
                ) : null}
              </div>
              <div className="column">
                <span>Bank Name</span>
                <input
                  className="FormControl_input"
                  type="text"
                  name="BankName"
                  placeholder="Bank Name"
                  onChange={handleInput}
                />
                {errors.Email.required ? (
                  <span className="text-danger">Enter Bank</span>
                ) : null}
              </div>
            </div>
            <div className="RegisterPageDivRow RegisterPageDivButton">
              <input type="submit" value="Register" />
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}
