// import { useState } from "react";
// import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
// import { RegisterApi } from "../../../../services/Api";
// import { StoreUserData } from "../../../../services/Storage";
// import Container from "react-bootstrap/Container";
// import "../../../../assets/styles/CustomStyles/FormControls.css";

// export default function UserRegister() {
//   const initialErrors = {
//     Email: { required: false },
//     FirstName: { FirstName: false },
//     LastName: { LastName: false },
//     MobileNumber: { MobileNumber: false },
//     custom_error: null,
//   };
//   const [errors, setErrors] = useState(initialErrors);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let errors = initialErrors;
//     let hasError = false;
//     if (inputs.FirstName === "") {
//       errors.FirstName.required = true;
//       hasError = true;
//     }
//     if (inputs.LastName === "") {
//       errors.LastName.required = true;
//       hasError = true;
//     }
//     if (inputs.MobileNumber === "") {
//       errors.MobileNumber.required = true;
//       hasError = true;
//     }

//     if (inputs.Email === "") {
//       errors.Email.required = true;
//       hasError = true;
//     }

//     if (!hasError) {
//       RegisterApi(inputs)
//         .then((response) => {
//           StoreUserData(response.data.access_token);
//         })
//         .catch((err) => {
//           if (err.response.status === "400") {
//             setErrors({ ...errors, custom_error: "Error" });
//           }
//         })
//         .finally(() => {
//         });
//     }
//     setErrors({ ...errors });
//   };

//   const [inputs, setInputs] = useState({
//     Email: "",
//     FirstName: "",
//     LastName: "",
//     MobileNumber: "",
//   });

//   const isEmail = (email) =>
//     /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

//   const isMobileNumber = new RegExp(
//     /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
//   );

//   const handleInput = (event) => {
//     setInputs({ ...inputs, [event.target.name]: event.target.value });

//     let errors = initialErrors;
//     let hasError = false;

//     if (event.target.name === "MobileNumber") {
//       errors.MobileNumber.required = false;
//       hasError = false;
//       if (!isMobileNumber.test(event.target.value)) {
//         errors.MobileNumber.required = true;
//         hasError = true;
//       }
//     }

//     if (event.target.name === "Email") {
//       //console.log(event.target.value);
//       errors.Email.required = false;
//       hasError = false;
//       if (!isEmail(event.target.value)) {
//         errors.Email.required = true;
//         hasError = true;
//       }
//     }
//     setErrors({ ...errors });
//   };

//   return (
//     <div className="DivContainer">
//       <div className="UserRegisterPagebox">
//         <Container>
//           <h2>Register</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="column">
//                 <span>FirstName</span>
//                 <input
//                   className="FormControl_input"
//                   type="text"
//                   name="FirstName"
//                   placeholder="First Name"
//                   onChange={handleInput}
//                 />
//                 {errors.FirstName.required ? (
//                   <span className="text-danger">First Name is required.</span>
//                 ) : null}
//               </div>

//               <div className="column">
//                 <span>LastName</span>
//                 <input
//                   className="FormControl_input"
//                   type="text"
//                   name="LastName"
//                   placeholder="Last tName"
//                   onChange={handleInput}
//                 />
//                 {errors.LastName.required ? (
//                   <span className="text-danger">Last Name is required.</span>
//                 ) : null}
//               </div>
//             </div>
//             <div className="row">
//               <div className="column">
//                 <span>MobileNumber</span>
//                 <input
//                   className="FormControl_input"
//                   type="text"
//                   name="MobileNumber"
//                   placeholder="Mobile Number"
//                   onChange={handleInput}
//                 />
//                 {errors.MobileNumber.required ? (
//                   <span className="text-danger">
//                     Please enter valid mobile number.
//                   </span>
//                 ) : null}
//               </div>
//               <div className="column">
//                 <span>Email Id</span>
//                 <input
//                   className="FormControl_input"
//                   type="text"
//                   name="Email"
//                   placeholder="Email Id"
//                   onChange={handleInput}
//                 />
//                 {errors.Email.required ? (
//                   <span className="text-danger">Invalid Email Id.</span>
//                 ) : null}
//               </div>
//             </div>
//             <div className="RegisterPageDivRow RegisterPageDivButton">
//               <input type="submit" value="Register" />
//             </div>
//           </form>
//         </Container>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
import { RegisterApi } from "../../../../services/Api";
import { StoreUserData } from "../../../../services/Storage";
import Container from "react-bootstrap/Container";
import "../../../../assets/styles/CustomStyles/FormControls.css";
import { GetLookupsAPI } from "../../../../services/Lookups/Lookups_Api";

export default function UserRegister() {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const initialErrors = {
    Email: { required: false },
    FirstName: { required: false },
    LastName: { required: false },
    MobileNumber: { required: false },
    Bank: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialErrors);
  const [inputs, setInputs] = useState({
    Email: "",
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    Bank: "",
  });
  const [banks, setBanks] = useState([]);

  // Fetch banks for dropdown
  useEffect(() => {
    GetLookupsAPI(Userdetails, "banks").then((response) => {
      setBanks(response.data);
    });
  }, []);

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const isMobileNumber = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
  );

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    let errors = initialErrors;
    let hasError = false;

    if (event.target.name === "MobileNumber") {
      errors.MobileNumber.required = false;
      if (!isMobileNumber.test(event.target.value)) {
        errors.MobileNumber.required = true;
        hasError = true;
      }
    }

    if (event.target.name === "Email") {
      errors.Email.required = false;
      if (!isEmail(event.target.value)) {
        errors.Email.required = true;
        hasError = true;
      }
    }
    setErrors({ ...errors });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialErrors;
    let hasError = false;
    if (inputs.FirstName === "") {
      errors.FirstName.required = true;
      hasError = true;
    }
    if (inputs.LastName === "") {
      errors.LastName.required = true;
      hasError = true;
    }
    if (inputs.MobileNumber === "") {
      errors.MobileNumber.required = true;
      hasError = true;
    }
    if (inputs.Email === "") {
      errors.Email.required = true;
      hasError = true;
    }
    if (inputs.Bank === "") {
      errors.Bank.required = true;
      hasError = true;
    }

    if (!hasError) {
      RegisterApi({ ...inputs, Bank: inputs.Bank })
        .then((response) => {
          StoreUserData(response.data.access_token);
        })
        .catch((err) => {
          if (err.response.status === "400") {
            setErrors({ ...errors, custom_error: "Error" });
          }
        });
    }
    setErrors({ ...errors });
  };

  return (
    <div
      style={{
        backgroundColor: "#00073d",
        color: "#f0f0f0",
        padding: "30px",
        maxWidth: "100%",
        height: "80vh",
        margin: "auto",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Container>
        <h2
          style={{ textAlign: "center", color: "#fff", marginBottom: "40px" }}
        >
          Create User
        </h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
              <label
                style={{
                  marginBottom: "40px",
                }}
              >
                First Name
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="text"
                name="FirstName"
                placeholder="First Name"
                onChange={handleInput}
              />
              {errors.FirstName.required && (
                <span style={{ color: "#ff4d4d" }}>
                  First Name is required.
                </span>
              )}
            </div>

            <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
              <label>Last Name</label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="text"
                name="LastName"
                placeholder="Last Name"
                onChange={handleInput}
              />
              {errors.LastName.required && (
                <span style={{ color: "#ff4d4d" }}>Last Name is required.</span>
              )}
            </div>

            <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
              <label>Mobile Number</label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="text"
                name="MobileNumber"
                placeholder="Mobile Number"
                onChange={handleInput}
              />
              {errors.MobileNumber.required && (
                <span style={{ color: "#ff4d4d" }}>
                  Please enter a valid mobile number.
                </span>
              )}
            </div>

            <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
              <label>Email Id</label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="text"
                name="Email"
                placeholder="Email Id"
                onChange={handleInput}
              />
              {errors.Email.required && (
                <span style={{ color: "#ff4d4d" }}>Invalid Email Id.</span>
              )}
            </div>

            <div style={{ flex: "1 1 100%", lineHeight: "30px" }}>
              <label>Bank</label>
              <select
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                name="Bank"
                onChange={handleInput}
                value={inputs.Bank}
              >
                <option value="">Select Bank</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.nameEn}
                  </option>
                ))}
              </select>
              {errors.Bank.required && (
                <span style={{ color: "#ff4d4d" }}>Please select a bank.</span>
              )}
            </div>

            <div style={{ textAlign: "center", width: "100%" }}>
              <input
                type="submit"
                value="Register"
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
