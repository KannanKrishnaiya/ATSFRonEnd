import { useState } from "react";
import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
// import { ResetPasswordApi } from "../../../../services/Api";
import Container from "react-bootstrap/Container";

export default function ResetPassword() {
  const initialErrors = {
    Email: { required: false },
    NewPassword: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialErrors);
  const [inputs, setInputs] = useState({
    Email: "",
    NewPassword: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    let updatedErrors = { ...initialErrors };

    if (event.target.name === "Email") {
      updatedErrors.Email.required = event.target.value === "";
    }

    if (event.target.name === "NewPassword") {
      updatedErrors.NewPassword.required = event.target.value === "";
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedErrors = { ...initialErrors };
    let hasError = false;

    if (inputs.Email === "") {
      updatedErrors.Email.required = true;
      hasError = true;
    }
    if (inputs.NewPassword === "") {
      updatedErrors.NewPassword.required = true;
      hasError = true;
    }

    // if (!hasError) {
    //   ResetPasswordApi(inputs)
    //     .then(() => {
    //       alert("Password reset successfully!");
    //     })
    //     .catch((err) => {
    //       setErrors({
    //         ...updatedErrors,
    //         custom_error: "Error resetting password.",
    //       });
    //     });
    // }
    setErrors(updatedErrors);
  };

  return (
    <div
      style={{
        backgroundColor: "#00073d",
        color: "#f0f0f0",
        padding: "30px",
        margin: "auto",
        maxWidth: "100%",
        height: "80vh",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Container>
        <h2
          style={{ textAlign: "center", color: "#fff", marginBottom: "40px" }}
        >
          Reset Password
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
                placeholder="Email"
                onChange={handleInput}
              />
              {errors.Email.required && (
                <span style={{ color: "#ff4d4d" }}>Email is required.</span>
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
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <input
              type="submit"
              value="Reset Password"
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
