import { useState } from "react";
import "../../assets/styles/CustomStyles/LoginPage.css";
import { RegisterApi } from "../../services/Api";
import { StoreUserData } from "../../services/Storage";
import { isAuthenticated } from "../../services/Auth";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function RegisterPage() {
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
          StoreUserData(response?.data?.token);
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

  if (isAuthenticated()) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      <div>
        {/* <h2>Register Page</h2>
          <section className="register-block">
          <div className="container">
            <div className="row ">
                <div className="col register-sec">
                  <h2 className="text-center">Register Now</h2>
                  <form onSubmit={handleSubmit} className="register-form" action="" >
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
        
                      <input type="text" className="form-control" name="name" onChange={handleInput} />
                        { errors.name.required?
                          (<span className="text-danger" >
                              Name is required.
                          </span>): null
                          }
                  </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
        
                      <input type="text"  className="form-control" name="email"  onChange={handleInput} />
                      { errors.email.required?
                        (  <span className="text-danger" >
                          Email is required.
                          </span>) : null
                        }
                    
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                      <input  className="form-control" type="password"  name="password"  onChange={handleInput}/>
                      { errors.password.required?
                        ( 
                      <span className="text-danger" >
                          Password is required.
                      </span>) : null
                        }
                  </div>
                  <div className="form-group">
                       
                      <span className="text-danger" name="custom_error">
                      { errors.custom_error?
                        (<p>{errors.custom_error}</p>) : null
                        }
                        </span> 
                      <div  className="text-center">
                        { loading ?
                          (<div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>) : null
                        }
                      </div>
        
                      <input type="submit"  className="btn btn-login float-right" disabled={loading}  value="Register" />
                  </div>
                  <div className="clearfix"></div>
                  <div className="form-group">
                    Already have account ? Please <Link to="/Login">Login</Link> 
                  </div>
        
        
                  </form>
        
        
                </div>
        
            </div>
        
        
          </div>
         </section> */}
      </div>

      <div className="Loginbody">
        <div className="RegisterPagebox">
          <Container>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="RegisterPageDivRow">
                <div className="RegisterPageDivColumn">
                  <div className="inputBox">
                    {/* <input type="email" name="email" required onkeyup="this.setAttribute('value', this.value);" value=""/> */}
                    <input
                      type="text"
                      name="FirstName"
                      placeholder="First Name"
                      onChange={handleInput}
                    />
                    {errors.FirstName.required ? (
                      <span className="text-danger">
                        First Name is required.
                      </span>
                    ) : null}
                    {/* <label>First Name</label> */}
                  </div>
                </div>
                <div className="RegisterPageDivColumn">
                  <div className="inputBox">
                    {/* <input type="email" name="email" required onkeyup="this.setAttribute('value', this.value);" value=""/> */}
                    <input
                      type="text"
                      name="LastName"
                      placeholder="Last tName"
                      onChange={handleInput}
                    />
                    {errors.LastName.required ? (
                      <span className="text-danger">
                        Last Name is required.
                      </span>
                    ) : null}
                    {/* <label>Last Name</label> */}
                  </div>
                </div>
              </div>

              <div className="RegisterPageDivRow">
                <div className="RegisterPageDivColumn">
                  <div className="inputBox">
                    {/* <input type="email" name="email" required onkeyup="this.setAttribute('value', this.value);" value=""/> */}
                    <input
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
                    {/* <label>Mobile Number</label> */}
                  </div>
                </div>
                <div className="RegisterPageDivColumn">
                  <div className="inputBox">
                    <input
                      type="text"
                      name="Email"
                      placeholder="Email Id"
                      onChange={handleInput}
                    />
                    {errors.Email.required ? (
                      <span className="text-danger">Invalid Email Id.</span>
                    ) : null}
                    {/* <label>Email</label> */}
                  </div>
                </div>
                <div className="RegisterPageDivColumn">
                  <div className="inputBox">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      name="Password"
                      onChange={handleInput}
                    />
                    {errors.Password.required ? (
                      <span className="text-danger">Password is required.</span>
                    ) : null}
                    {/* <label>Password</label> */}
                  </div>
                </div>

                <div className="RegisterPageDivColumn">
                  <div className="inputBox">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Confirm Password"
                      name="ConfirmPassword"
                      onChange={handleInput}
                    />
                    {errors.ConfirmPassword.required ? (
                      <span className="text-danger">
                        Confirm Password is required.
                      </span>
                    ) : null}
                    {/* <label>Confirm Password</label> */}
                  </div>
                </div>
              </div>
              <div className="RegisterPageDivRow">
                <div className="RegisterPageDivColumn">
                  <div className="inputBox">
                    {/* <input type="email" name="email" required onkeyup="this.setAttribute('value', this.value);" value=""/> */}
                    <input
                      type="text"
                      name="Designation"
                      placeholder="Designation"
                      onChange={handleInput}
                    />
                    {errors.Designation.required ? (
                      <span className="text-danger">
                        Designation is required.
                      </span>
                    ) : null}
                    {/* <label>Designation</label> */}
                  </div>
                </div>
              </div>
              {/* <div className="RegisterPageDivRow">
          <Col md={4}>
            test 1  
          </div>
          <Col md={4}>
            test 1  
          </div>
          </div>    */}
              <div className="RegisterPageDivRow RegisterPageDivButton">
                <input type="submit" value="Register" />
              </div>
              <div className="RegisterPageDivRow">
                <div className="">
                  <h5>
                    {" "}
                    Already have account ? Please{" "}
                    <Link to="/Login" style={{ color: "yellow" }}>
                      Login
                    </Link>{" "}
                  </h5>
                </div>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
}
