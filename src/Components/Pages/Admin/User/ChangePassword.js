// import { useState } from "react";
// import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
// import { RegisterApi } from "../../../../services/Api";
// import { StoreUserData } from "../../../../services/Storage";
// import "../../../../assets/styles/CustomStyles/FormControls.css";
// import Container from "react-bootstrap/Container";

// export default function ResetPassword() {
//   const initialErrors = {
//     CurrentPassword: { required: false },
//     NewPassword: { required: false },
//     ConfirmPassword: { required: false, match: false },
//     custom_error: null,
//   };

//   const [errors, setErrors] = useState(initialErrors);
//   const [inputs, setInputs] = useState({
//     CurrentPassword: "",
//     NewPassword: "",
//     ConfirmPassword: "",
//   });

//   const handleInput = (event) => {
//     setInputs({ ...inputs, [event.target.name]: event.target.value });
//     let updatedErrors = { ...initialErrors };
//     let hasError = false;
//     if (event.target.name === "CurrentPassword") {
//       updatedErrors.CurrentPassword.required = event.target.value === "";
//     }

//     if (event.target.name === "NewPassword") {
//       updatedErrors.NewPassword.required = event.target.value === "";
//     }

//     if (event.target.name === "ConfirmPassword") {
//       updatedErrors.ConfirmPassword.required = event.target.value === "";
//       updatedErrors.ConfirmPassword.match = event.target.value !== inputs.NewPassword;
//     }

//     setErrors(updatedErrors);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let updatedErrors = { ...initialErrors };
//     let hasError = false;

//     if (inputs.CurrentPassword === "") {
//       updatedErrors.CurrentPassword.required = true;
//       hasError = true;
//     }
//     if (inputs.NewPassword === "") {
//       updatedErrors.NewPassword.required = true;
//       hasError = true;
//     }
//     if (inputs.ConfirmPassword === "" || errors.ConfirmPassword.match) {
//       updatedErrors.ConfirmPassword.required = true;
//       updatedErrors.ConfirmPassword.match = inputs.ConfirmPassword !== inputs.NewPassword;
//       hasError = true;
//     }

//     if (!hasError) {
//       RegisterApi(inputs)
//         .then((response) => {
//           StoreUserData(response.data.access_token);
//         })
//         .catch((err) => {
//           setErrors({ ...updatedErrors, custom_error: "Error" });
//         });
//     }
//     setErrors(updatedErrors);
//   };

//   return (
//     <div className="DivContainer">
//       <div className="UserRegisterPagebox">
//         <Container>
//           <h2>Reset Password</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="column">
//                 <span>Current Password</span>
//                 <input
//                   className="FormControl_input"
//                   type="password"
//                   name="CurrentPassword"
//                   placeholder="Current Password"
//                   onChange={handleInput}
//                 />
//                 {errors.CurrentPassword.required && (
//                   <span className="text-danger">
//                     Current Password is required.
//                   </span>
//                 )}
//               </div>
//               <div className="column">
//                 <span>New Password</span>
//                 <input
//                   className="FormControl_input"
//                   type="password"
//                   name="NewPassword"
//                   placeholder="New Password"
//                   onChange={handleInput}
//                 />
//                 {errors.NewPassword.required && (
//                   <span className="text-danger">New Password is required.</span>
//                 )}
//               </div>

//               <div className="column">
//                 <span>Confirm Password</span>
//                 <input
//                   className="FormControl_input"
//                   type="password"
//                   name="ConfirmPassword"
//                   placeholder="Confirm Password"
//                   onChange={handleInput}
//                 />
//                 {errors.ConfirmPassword.required && (
//                   <span className="text-danger">
//                     Confirm Password is required.
//                   </span>
//                 )}
//                 {errors.ConfirmPassword.match && (
//                   <span className="text-danger">Passwords do not match.</span>
//                 )}
//               </div>

//             </div>
//               <div className="RegisterPageDivRow RegisterPageDivButton">
//                 <input type="submit" value="Update" />
//               </div>
//           </form>
//         </Container>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
import { RegisterApi } from "../../../../services/Api";
import { StoreUserData } from "../../../../services/Storage";
import Container from "react-bootstrap/Container";

export default function ChangePassword() {
  const initialErrors = {
    CurrentPassword: { required: false },
    NewPassword: { required: false },
    ConfirmPassword: { required: false, match: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialErrors);
  const [inputs, setInputs] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    let updatedErrors = { ...initialErrors };

    if (event.target.name === "CurrentPassword") {
      updatedErrors.CurrentPassword.required = event.target.value === "";
    }

    if (event.target.name === "NewPassword") {
      updatedErrors.NewPassword.required = event.target.value === "";
    }

    if (event.target.name === "ConfirmPassword") {
      updatedErrors.ConfirmPassword.required = event.target.value === "";
      updatedErrors.ConfirmPassword.match =
        event.target.value !== inputs.NewPassword;
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedErrors = { ...initialErrors };
    let hasError = false;

    if (inputs.CurrentPassword === "") {
      updatedErrors.CurrentPassword.required = true;
      hasError = true;
    }
    if (inputs.NewPassword === "") {
      updatedErrors.NewPassword.required = true;
      hasError = true;
    }
    if (inputs.ConfirmPassword === "" || errors.ConfirmPassword.match) {
      updatedErrors.ConfirmPassword.required = true;
      updatedErrors.ConfirmPassword.match =
        inputs.ConfirmPassword !== inputs.NewPassword;
      hasError = true;
    }

    if (!hasError) {
      RegisterApi(inputs)
        .then((response) => {
          StoreUserData(response.data.access_token);
        })
        .catch((err) => {
          setErrors({ ...updatedErrors, custom_error: "Error" });
        });
    }
    setErrors(updatedErrors);
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
          Change Password
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
              <label>Current Password</label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="password"
                name="CurrentPassword"
                placeholder="Current Password"
                onChange={handleInput}
              />
              {errors.CurrentPassword.required && (
                <span style={{ color: "#ff4d4d" }}>
                  Current Password is required.
                </span>
              )}
            </div>

            <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
              <label>New Password</label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="password"
                name="NewPassword"
                placeholder="New Password"
                onChange={handleInput}
              />
              {errors.NewPassword.required && (
                <span style={{ color: "#ff4d4d" }}>
                  New Password is required.
                </span>
              )}
            </div>

            <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
              <label>Confirm Password</label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="password"
                name="ConfirmPassword"
                placeholder="Confirm Password"
                onChange={handleInput}
              />
              {errors.ConfirmPassword.required && (
                <span style={{ color: "#ff4d4d" }}>
                  Confirm Password is required.
                </span>
              )}
              {errors.ConfirmPassword.match && (
                <span style={{ color: "#ff4d4d" }}>
                  Passwords do not match.
                </span>
              )}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <input
              type="submit"
              value="Update"
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
        </form>
      </Container>
    </div>
  );
}
