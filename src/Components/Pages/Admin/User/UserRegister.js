// import { useState, useEffect } from "react";
// import "../../../../assets/styles/CustomStyles/RegistrationPage.css";
// import { RegisterApi } from "../../../../services/Api";
// import { StoreUserData } from "../../../../services/Storage";
// import Container from "react-bootstrap/Container";
// import "../../../../assets/styles/CustomStyles/FormControls.css";
// import { GetLookupsAPI } from "../../../../services/Lookups/Lookups_Api";

// export default function UserRegister() {
//   const Userdetails = localStorage.getItem("LoggedInUser");
//   const initialErrors = {
//     Email: { required: false },
//     FirstName: { required: false },
//     LastName: { required: false },
//     MobileNumber: { required: false },
//     Bank: { required: false },
//     custom_error: null,
//   };
//   const [errors, setErrors] = useState(initialErrors);
//   const [inputs, setInputs] = useState({
//     Email: "",
//     FirstName: "",
//     LastName: "",
//     MobileNumber: "",
//     Bank: "",
//   });
//   const [banks, setBanks] = useState([]);

//   // Fetch banks for dropdown
//   useEffect(() => {
//     GetLookupsAPI(Userdetails, "banks").then((response) => {
//       setBanks(response.data);
//     });
//   }, []);

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
//       if (!isMobileNumber.test(event.target.value)) {
//         errors.MobileNumber.required = true;
//         hasError = true;
//       }
//     }

//     if (event.target.name === "Email") {
//       errors.Email.required = false;
//       if (!isEmail(event.target.value)) {
//         errors.Email.required = true;
//         hasError = true;
//       }
//     }
//     setErrors({ ...errors });
//   };

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
//     if (inputs.Bank === "") {
//       errors.Bank.required = true;
//       hasError = true;
//     }

//     if (!hasError) {
//       RegisterApi({ ...inputs, Bank: inputs.Bank })
//         .then((response) => {
//           StoreUserData(response.data.access_token);
//         })
//         .catch((err) => {
//           if (err.response.status === "400") {
//             setErrors({ ...errors, custom_error: "Error" });
//           }
//         });
//     }
//     setErrors({ ...errors });
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
//           Create User
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
//               <label
//                 style={{
//                   marginBottom: "40px",
//                 }}
//               >
//                 First Name
//               </label>
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 type="text"
//                 name="FirstName"
//                 placeholder="First Name"
//                 onChange={handleInput}
//               />
//               {errors.FirstName.required && (
//                 <span style={{ color: "#ff4d4d" }}>
//                   First Name is required.
//                 </span>
//               )}
//             </div>

//             <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
//               <label>Last Name</label>
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 type="text"
//                 name="LastName"
//                 placeholder="Last Name"
//                 onChange={handleInput}
//               />
//               {errors.LastName.required && (
//                 <span style={{ color: "#ff4d4d" }}>Last Name is required.</span>
//               )}
//             </div>

//             <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
//               <label>Mobile Number</label>
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 type="text"
//                 name="MobileNumber"
//                 placeholder="Mobile Number"
//                 onChange={handleInput}
//               />
//               {errors.MobileNumber.required && (
//                 <span style={{ color: "#ff4d4d" }}>
//                   Please enter a valid mobile number.
//                 </span>
//               )}
//             </div>

//             <div style={{ flex: "1 1 45%", lineHeight: "30px" }}>
//               <label>Email Id</label>
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 type="text"
//                 name="Email"
//                 placeholder="Email Id"
//                 onChange={handleInput}
//               />
//               {errors.Email.required && (
//                 <span style={{ color: "#ff4d4d" }}>Invalid Email Id.</span>
//               )}
//             </div>

//             <div style={{ flex: "1 1 100%", lineHeight: "30px" }}>
//               <label>Bank</label>
//               <select
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   border: "1px solid #333",
//                   backgroundColor: "#2e2e2e",
//                   color: "#fff",
//                 }}
//                 name="Bank"
//                 onChange={handleInput}
//                 value={inputs.Bank}
//               >
//                 <option value="">Select Bank</option>
//                 {banks.map((bank) => (
//                   <option key={bank.id} value={bank.id}>
//                     {bank.nameEn}
//                   </option>
//                 ))}
//               </select>
//               {errors.Bank.required && (
//                 <span style={{ color: "#ff4d4d" }}>Please select a bank.</span>
//               )}
//             </div>

//             <div style={{ textAlign: "center", width: "100%" }}>
//               <input
//                 type="submit"
//                 value="Register"
//                 style={{
//                   padding: "10px 20px",
//                   borderRadius: "5px",
//                   border: "none",
//                   backgroundColor: "#4CAF50",
//                   color: "#fff",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               />
//             </div>
//           </div>
//         </form>
//       </Container>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import LoaderComp from "../../../Layout/Loader";
// import MUIDataTable from "mui-datatables";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import { TbUserEdit } from "react-icons/tb";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { GetUserListAPI, ResetPasswordAPI } from "../../../../services/User/UserService";
// import { color } from "framer-motion";

// export default function UserRegister() {
//   const [isLoading, setIsLoading] = useState(false);
//   const Userdetails = localStorage.getItem("LoggedInUser");
//   const [userList, setUserList] = useState([]);
//   const [userEditInput, setUserEditInput] = useState({
//     firstName: "",
//     lastName: "",
//     userName: "",
//     email: "",
//     phoneNumber: null,
//     companyId: 0,
//     isActive: false,
//   });

//   // Fetch user list on component mount
//   useEffect(() => {
//     setIsLoading(true);
//     GetUserListAPI(Userdetails)
//       .then((response) => {
//         setUserList(response.data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.error("Error fetching user data", err);
//       });
//   }, []);

//   // Columns configuration for MUIDataTable
//   const userColumns = [
//     { label: "FirstName", name: "firstName", options: { filter: true } },
//     { label: "LastName", name: "lastName", options: { filter: true } },
//     { label: "UserName", name: "userName", options: { filter: true } },
//     { label: "Email", name: "email", options: { filter: true } },
//     { label: "PhoneNumber", name: "phoneNumber", options: { filter: true } },
//     // { label: "Company ID", name: "companyId", options: { filter: true } },
//     {
//       name: "Edit",
//       options: {
//         filter: false,
//         sort: false,
//         empty: true,
//         customBodyRender: (value, tableMeta) => (
//           <Popup
//             trigger={
//               <TbUserEdit
//                 className="DataTableIcons"
//                 onClick={() => handleEdit(tableMeta.rowData)}
//               />
//             }
//             modal
//             nested
//           >
//             {(close) => (
//               <div className="DashboardModal">
//                 <button className="close" onClick={close}>
//                   &times;
//                 </button>
//                 <EditUserForm userEditInput={userEditInput} />
//               </div>
//             )}
//           </Popup>
//         ),
//       },
//     },
//     {
//       name: "ResetPassword",
//       options: {
//         filter: false,
//         sort: false,
//         empty: true,
//         customBodyRender: (value, tableMeta) => (
//           <RiLockPasswordLine
//             className="DataTableIcons"
//             onClick={() => handleResetPassword(tableMeta.rowData[3])}
//           />
//         ),
//       },
//     },
//   ];

//   const handleEdit = (rowData) => {

//   setUserEditInput({
//     firstName: rowData[0],
//     lastName: rowData[1],
//     userName: rowData[2],
//     email: rowData[3],
//     phoneNumber: rowData[4],
//     companyId: rowData[5],
//     isActive: rowData[6],
//   });
// };
//   const handleResetPassword = (email) => {
//     ResetPasswordAPI(email)
//       .then(() => alert("Password reset email sent successfully"))
//       .catch((err) => console.error("Failed to reset password:", err));
//   };

//   const theme = createTheme({
//     components: {
//       MUIDataTableBodyCell: {
//         styleOverrides: {
//           root: {
//             backgroundColor: "#2e3885",
//             padding: "0px",
//             fontSize: 12,
//             color:`#fff`
//           },
//         },
//       },
//       MUIDataTableHeadCell: {
//         styleOverrides: {
//           root: {
//             backgroundColor: "#9DA0B1",
//             padding: "0px",
//             fontSize: 12,
//             color: "white",
//           },
//         },
//       },
//     },
//   });

//   return (
//     <div>
//       {isLoading ? (
//         <LoaderComp />
//       ) : (
//         <ThemeProvider theme={theme}>
//           <MUIDataTable
//             title={"User Management"}
//             data={userList}
//             columns={userColumns}
//             options={{
//               filter: true,
//               responsive: "vertical",
//               rowsPerPageOptions: [5, 10, 25],
//               selectableRows: "none",
//             }}
//           />
//         </ThemeProvider>
//       )}
//     </div>
//   );
// }

// function EditUserForm({ userEditInput, handleStatusChange, onUpdate }) {
//   return (
//     <div className="EditPopup">
//       <div className="row">
//         <div className="Column">
//           <label className="EditPopupLabel">First Name</label>
//           <input
//             className="FormControl_input"
//             type="text"
//             value={userEditInput.firstName || ""}
//             readOnly
//           />
//         </div>
//         <div className="Column">
//           <label className="EditPopupLabel">Last Name</label>
//           <input
//             className="FormControl_input"
//             type="text"
//             value={userEditInput.lastName || ""}
//             readOnly
//           />
//         </div>
//       </div>
//       <div className="row">
//         <div className="Column">
//           <label className="EditPopupLabel">Username</label>
//           <input
//             className="FormControl_input"
//             type="text"
//             value={userEditInput.userName || ""}
//             readOnly
//           />
//         </div>
//         <div className="Column">
//           <label className="EditPopupLabel">Email</label>
//           <input
//             className="FormControl_input"
//             type="email"
//             value={userEditInput.email || ""}
//             readOnly
//           />
//         </div>
//       </div>
//       <div className="row">
//         <div className="Column">
//           <label className="EditPopupLabel">Phone Number</label>
//           <input
//             className="FormControl_input"
//             type="tel"
//             value={userEditInput.phoneNumber || ""}
//             readOnly
//           />
//         </div>
//         {/* <div className="Column">
//           <label className="EditPopupLabel">Company ID</label>
//           <input
//             className="FormControl_input"
//             type="text"
//             value={userEditInput.companyId || ""}
//             readOnly
//           />
//         </div> */}
//       </div>
//       <div className="row">
//         <div className="Column">
//           <label className="EditPopupLabel">Active Status</label>
//           <select
//             className="FormControl_input"
//             value={userEditInput.isActive ? "Active" : "Inactive"}
//             onChange={(e) => handleStatusChange(e.target.value)}
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="Column">
//           <input
//             type="button"
//             name="Update"
//             value="Update"
//             className="FormControl_button"
//             onClick={onUpdate}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import LoaderComp from "../../../Layout/Loader";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TbUserEdit } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  GetUserListAPI,
  ResetPasswordAPI,
} from "../../../../services/User/UserService";

export default function UserRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [userList, setUserList] = useState([]);
  const [userEditInput, setUserEditInput] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: null,
    companyId: 0,
    isActive: false,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch user list on component mount
  useEffect(() => {
    setIsLoading(true);
    GetUserListAPI(Userdetails)
      .then((response) => {
        setUserList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error fetching user data", err);
      });
  }, []);

  // Columns configuration for MUIDataTable
  const userColumns = [
    { label: "FirstName", name: "firstName", options: { filter: true } },
    { label: "LastName", name: "lastName", options: { filter: true } },
    { label: "UserName", name: "userName", options: { filter: true } },
    { label: "Email", name: "email", options: { filter: true } },
    { label: "PhoneNumber", name: "phoneNumber", options: { filter: true } },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          <TbUserEdit
            className="DataTableIcons"
            onClick={() => handleEdit(tableMeta.rowData)}
          />
        ),
      },
    },
    {
      name: "ResetPassword",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          <RiLockPasswordLine
            className="DataTableIcons"
            onClick={() => handleResetPassword(tableMeta.rowData[3])}
          />
        ),
      },
    },
  ];

  const handleEdit = (rowData) => {
    setUserEditInput({
      firstName: rowData[0],
      lastName: rowData[1],
      userName: rowData[2],
      email: rowData[3],
      phoneNumber: rowData[4],
      companyId: rowData[5],
      isActive: rowData[6],
    });
    setIsEditModalOpen(true);
  };

  const handleResetPassword = (email) => {
    ResetPasswordAPI(Userdetails, email)
      .then(() => alert("Password reset email sent successfully"))
      .catch((err) => console.error("Failed to reset password:", err));
  };

  const theme = createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#2e3885",
            padding: "0px",
            fontSize: 12,
            color: "#fff",
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#9DA0B1",
            padding: "0px",
            fontSize: 12,
            color: "white",
          },
        },
      },
    },
  });

  return (
    <div>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"User Management"}
            data={userList}
            columns={userColumns}
            options={{
              filter: true,
              responsive: "vertical",
              rowsPerPageOptions: [5, 10, 25],
              selectableRows: "none",
            }}
          />
          <Popup
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            modal
            nested
          >
            <div className="DashboardModal">
              <EditUserForm
                userEditInput={userEditInput}
                onUpdate={() => console.log("Updated data:", userEditInput)}
              />
            </div>
          </Popup>
        </ThemeProvider>
      )}
    </div>
  );
}

function EditUserForm({ userEditInput, onUpdate }) {
  const [formData, setFormData] = useState(userEditInput);

  useEffect(() => {
    setFormData(userEditInput);
  }, [userEditInput]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (status) => {
    setFormData({ ...formData, isActive: status === "Active" });
  };

  return (
    <div className="EditPopup">
      <div className="row">
        <div className="Column">
          <label className="EditPopupLabel">First Name</label>
          <input
            className="FormControl_input"
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="EditPopupLabel">Last Name</label>
          <input
            className="FormControl_input"
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <label className="EditPopupLabel">Username</label>
          <input
            className="FormControl_input"
            type="text"
            name="userName"
            value={formData.userName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="EditPopupLabel">Email</label>
          <input
            disabled
            className="FormControl_input"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <label className="EditPopupLabel">Phone Number</label>
          <input
            className="FormControl_input"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="EditPopupLabel">Active Status</label>
          <select
            className="FormControl_input"
            value={formData.isActive ? "Active" : "Inactive"}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <input
            type="button"
            name="Update"
            value="Update"
            className="FormControl_button"
            onClick={() => onUpdate(formData)}
          />
        </div>
      </div>
    </div>
  );
}
