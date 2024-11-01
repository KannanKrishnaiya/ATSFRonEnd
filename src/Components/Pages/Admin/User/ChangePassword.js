// import { useState } from "react";
// import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
// import { RegisterApi } from "../../../../services/Api";
// import { StoreUserData } from "../../../../services/Storage";
// import Container from "react-bootstrap/Container";

// export default function ChangePassword() {
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

//     if (event.target.name === "CurrentPassword") {
//       updatedErrors.CurrentPassword.required = event.target.value === "";
//     }

//     if (event.target.name === "NewPassword") {
//       updatedErrors.NewPassword.required = event.target.value === "";
//     }

//     if (event.target.name === "ConfirmPassword") {
//       updatedErrors.ConfirmPassword.required = event.target.value === "";
//       updatedErrors.ConfirmPassword.match =
//         event.target.value !== inputs.NewPassword;
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
//       updatedErrors.ConfirmPassword.match =
//         inputs.ConfirmPassword !== inputs.NewPassword;
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
//     <div
//       style={{
//         backgroundColor: "#00073d",
//         color: "#f0f0f0",
//         padding: "30px",
//         maxWidth: "100%",
//         height: "80vh",
//         margin: "auto",
//         borderRadius: "10px",
//         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
//       }}
//     >
//       <Container>
//         <h2
//           style={{ textAlign: "center", color: "#fff", marginBottom: "40px" }}
//         >
//           Change Password
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "15px",
//               justifyContent: "space-between",
//             }}
//           >
//             <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
//               <label>Current Password</label>
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 type="password"
//                 name="CurrentPassword"
//                 placeholder="Current Password"
//                 onChange={handleInput}
//               />
//               {errors.CurrentPassword.required && (
//                 <span style={{ color: "#ff4d4d" }}>
//                   Current Password is required.
//                 </span>
//               )}
//             </div>

//             <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
//               <label>New Password</label>
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 type="password"
//                 name="NewPassword"
//                 placeholder="New Password"
//                 onChange={handleInput}
//               />
//               {errors.NewPassword.required && (
//                 <span style={{ color: "#ff4d4d" }}>
//                   New Password is required.
//                 </span>
//               )}
//             </div>

//             <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
//               <label>Confirm Password</label>
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 type="password"
//                 name="ConfirmPassword"
//                 placeholder="Confirm Password"
//                 onChange={handleInput}
//               />
//               {errors.ConfirmPassword.required && (
//                 <span style={{ color: "#ff4d4d" }}>
//                   Confirm Password is required.
//                 </span>
//               )}
//               {errors.ConfirmPassword.match && (
//                 <span style={{ color: "#ff4d4d" }}>
//                   Passwords do not match.
//                 </span>
//               )}
//             </div>
//           </div>
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <input
//               type="submit"
//               value="Update"
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "5px",
//                 border: "none",
//                 backgroundColor: "#4CAF50",
//                 color: "#fff",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//               }}
//             />
//           </div>
//         </form>
//       </Container>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
import { RegisterApi } from "../../../../services/Api";
import { StoreUserData } from "../../../../services/Storage";
import Container from "react-bootstrap/Container";
import {
  ResetPasswordAPI,
  UpdatePasswordAPI,
} from "../../../../services/User/UserService";
import { Logout } from "../../../../services/Auth";

export default function ChangePassword() {
  // const Userdetails = localStorage.getItem("LoggedInUser");
  const Userdetails = JSON.parse(localStorage.getItem("LoggedInUser"));
  const initialErrors = {
    CurrentPassword: { required: false },
    NewPassword: { required: false },
    ConfirmPassword: { required: false, match: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialErrors);
  const [inputs, setInputs] = useState({
    Email: "", // Added email field
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      Email: Userdetails?.UserName,
    }));
  }, []);

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
      const email = Userdetails?.UserName;

      const body = {
        email: email,
        CurrentPassword: inputs.CurrentPassword,
        NewPassword: inputs.NewPassword,
      };

      UpdatePasswordAPI(Userdetails, body)
        .then((response) => {
          console.log(response?.data?.isSuccess);
          if (response?.data?.isSuccess) {
            setSuccessMessage("Password updated successfully!");

            setInputs({
              // Clear input fields
              Email: email,
              CurrentPassword: "",
              NewPassword: "",
              ConfirmPassword: "",
            });
            setTimeout(() => {
              Logout();
              window.location = "login";
            }, 2000);
          }
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
        {successMessage && ( // Display success message if it exists
          <div
            style={{
              color: "#4CAF50",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            {/* Email and Current Password */}
            <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
              <label>Email</label>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #333",
                  backgroundColor: "#2e2e2e",
                  color: "#fff",
                }}
                type="email"
                name="Email"
                value={inputs.Email} // Set the email value
                disabled // Make it disabled
                placeholder="Email"
              />
            </div>
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

            {/* New Password and Confirm Password */}
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
