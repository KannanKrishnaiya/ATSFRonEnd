import { useEffect, useState } from "react";
import LoaderComp from "../../../Layout/Loader";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TbUserEdit } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiPlusCircle } from "react-icons/bi";
import {
  CheckUserExistsAPI,
  GetUserListAPI,
  ResetPasswordAPI,
} from "../../../../services/User/UserService";
import { useSelector } from "react-redux";
import {
  GetLookupsAPI,
  GetLookupsUserRoleAPI,
} from "../../../../services/Lookups/Lookups_Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterUserAPI } from "../../../../services/Api";

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
    roleId: 0,
    isDisabled: false,
    isCNSEmployee: true,
  });

  const LoggedInUserRoleDetailsData = useSelector(
    (state) => state.user.userDetails
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const userColumns = [
    { label: "FirstName", name: "firstName", options: { filter: true } },
    { label: "LastName", name: "lastName", options: { filter: true } },
    { label: "UserName", name: "userName", options: { filter: true } },
    {
      label: "Email",
      name: "email",
      options: {
        filter: true,
        setCellProps: () => ({
          className: "custom_table_cell_width",
        }),
      },
    },
    { label: "PhoneNumber", name: "phoneNumber", options: { filter: true } },
    { label: "CompanyName", name: "companyName", options: { filter: true } },
    { label: "RoleName", name: "roleName", options: { filter: true } },
    {
      label: "Status",
      name: "isDisabled",
      options: {
        filter: true,
        customBodyRender: (value) => (value ? "In Active" : "Active"),
      },
    },
    {
      label: "CNSEmployee",
      name: "isCNSEmployee",
      options: {
        filter: true,
        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          <div className="DT_Div_ViewDetails_flex-container">
            <div className="tooltip">
              <TbUserEdit
                className="DataTableIcons"
                onClick={() => handleEdit(tableMeta.rowData)}
              />
              <span className="tooltiptext">Edit User</span>
            </div>

            {LoggedInUserRoleDetailsData?.RoleId === 1 ? (
              <div className="tooltip">
                <RiLockPasswordLine
                  className="DataTableIcons"
                  onClick={() => handleResetPassword(tableMeta.rowData[3])}
                />
                <span className="tooltiptext">Reset Password</span>
              </div>
            ) : (
              ""
            )}
          </div>
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
      roleIdId: rowData[6],
      isDisabled: rowData[7],
      isCNSEmployee: rowData[8],
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

  const handleCreateUser = (newUser) => {
    setUserList((prev) => [...prev, newUser]);
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <div className="UserRegisterHeader">
              <button
                className="CreateUserButton"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <BiPlusCircle /> Add User
              </button>
            </div>

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
              {(close) => (
                <div className="DashboardModal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div>
                    <EditUserForm
                      userEditInput={userEditInput}
                      onUpdate={() =>
                        console.log("Updated data:", userEditInput)
                      }
                    />
                  </div>
                </div>
              )}
              {/* <div className="DashboardModal">
              <EditUserForm
                userEditInput={userEditInput}
                onUpdate={() => console.log("Updated data:", userEditInput)}
              />
            </div> */}
            </Popup>
            <Popup
              open={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              modal
              nested
            >
              {/* <div className="DashboardModal">
              <CreateUserForm onCreate={handleCreateUser} />
            </div> */}
              {(close) => (
                <div className="DashboardModal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div>
                    <CreateUserForm onCreate={handleCreateUser} />
                  </div>
                </div>
              )}
            </Popup>
          </ThemeProvider>
        </>
      )}
    </div>
  );
}

function EditUserForm({ userEditInput, onUpdate }) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    companyId: "",
    roleId: "",
    isDisabled: false,
    isCNSEmployee: false,
    ...userEditInput,
  });

  const [companyOptions, setCompanyOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const roleData = await GetLookupsUserRoleAPI(Userdetails);
        setRoleOptions(roleData?.data || []);
        const companyData = await GetLookupsAPI(Userdetails);
        setCompanyOptions(companyData?.data || []);
      } catch (error) {
        console.error("Error fetching lookups:", error);
      }
    };
    fetchLookups();
  }, [Userdetails]);

  useEffect(() => {
    if (userEditInput) {
      setFormData((prev) => ({
        ...prev,
        companyId: userEditInput.companyId,
        roleId: userEditInput.roleIdId,
        isCNSEmployee: userEditInput.isCNSEmployee,
      }));
    }
  }, [userEditInput]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isCNSEmployee" ? value === "Yes" : value,
    }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, isDisabled: status === "Active" }));
  };

  const handleUpdateClick = () => {
    onUpdate(formData);
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
          <label className="EditPopupLabel">Company</label>
          <select
            className="FormControl_input"
            name="companyId"
            value={formData.companyId || ""}
            onChange={handleChange}
          >
            <option value="">Select Company</option>
            {companyOptions.map((company) => (
              <option key={company.id} value={company.id}>
                {company.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <label className="EditPopupLabel">Active Status</label>
          <select
            className="FormControl_input"
            value={formData.isDisabled ? "Inactive" : "Active"}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="Column">
          <label className="EditPopupLabel">Role</label>
          <select
            className="FormControl_input"
            name="roleId"
            value={formData.roleId || ""}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            {roleOptions.map((role) => (
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <label className="EditPopupLabel">Is CNS Employee</label>
          <select
            className="FormControl_input"
            name="isCNSEmployee"
            value={formData.isCNSEmployee ? "Yes" : "No"}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="Column">
          <input
            type="button"
            name="Update"
            value="Update"
            className="FormControl_button"
            onClick={handleUpdateClick}
          />
        </div>
      </div>
    </div>
  );
}



// function CreateUserForm({ onCreate }) {
//   const Userdetails = localStorage.getItem("LoggedInUser");
//   const [newUser, setNewUser] = useState({
//     userName: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     companyId: "",
//     roleId: "",
//     isDisabled: true,
//     isCNSEmployee: false,
//   });
//   const [companyOptions, setCompanyOptions] = useState([]);
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [emailError, setEmailError] = useState("");
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     const fetchLookups = async () => {
//       try {
//         const roleData = await GetLookupsUserRoleAPI(Userdetails);
//         setRoleOptions(roleData?.data || []);

//         const companyData = await GetLookupsAPI(Userdetails);
//         setCompanyOptions(companyData?.data || []);
//       } catch (error) {
//         console.error("Error fetching lookups:", error);
//       }
//     };

//     fetchLookups();
//   }, [Userdetails]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prev) => {
//       if (name === "isCNSEmployee") {
//         return {
//           ...prev,
//           isCNSEmployee: value === "true",
//           // isDisabled: value === "false",
//           roleId: value === "true" ? prev.roleId : "",
//         };
//       }
//       return { ...prev, [name]: value };
//     });
//   };

//   const handleEmailBlur = async () => {
//     const email = newUser.email;
//     const exists = await CheckUserExistsAPI(Userdetails, email);
//     setEmailError(exists?.data?.isUSerExists ? "User already exists" : "");
//   };

//   const handleCreate = async () => {
//     if (emailError) return;
//     if (
//       !newUser.firstName ||
//       !newUser.lastName ||
//       !newUser.email ||
//       !newUser.userName ||
//       !newUser.phoneNumber ||
//       !newUser.companyId ||
//       !newUser.roleId
//     ) {
//       setFormError("Please fill in all required fields");
//       return;
//     }
//     try {
//       await RegisterUserAPI(Userdetails, newUser);
//       onCreate(newUser);
//       setNewUser({
//         userName: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNumber: "",
//         companyId: "",
//         roleId: "",
//         isDisabled: true,
//         isCNSEmployee: false,
//       });
//       setFormError("");
//       toast.success("User successfully registered", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "light",
//       });
//     } catch (error) {
//       toast.error("Registration failed. Please try again.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "light",
//       });
//     }
//   };

//   const filteredRoles = newUser.isCNSEmployee
//     ? roleOptions
//     : roleOptions.filter((role) => [4, 5, 6].includes(role.id));

//   return (
//     <div className="EditPopup">
//       <center>
//         {" "}
//         {formError && (
//           <span style={{ color: "#FF0000" }} className="error">
//             {formError}
//           </span>
//         )}
//       </center>
//       <div className="row">
//         <div className="Column">
//           <label className="AddPopupLabel">First Name *</label>
//           <input
//             className="FormControl_input"
//             type="text"
//             name="firstName"
//             value={newUser.firstName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="Column">
//           <label className="AddPopupLabel">Last Name *</label>
//           <input
//             className="FormControl_input"
//             type="text"
//             name="lastName"
//             value={newUser.lastName}
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//       <div className="row">
//         <div className="Column">
//           <label className="AddPopupLabel">Username *</label>
//           <input
//             className="FormControl_input"
//             type="text"
//             name="userName"
//             value={newUser.userName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="Column">
//           <label className="AddPopupLabel">Email *</label>
//           <input
//             className="FormControl_input"
//             type="email"
//             name="email"
//             value={newUser.email}
//             onChange={handleChange}
//             onBlur={handleEmailBlur}
//           />
//           {emailError && (
//             <span style={{ color: "#FF0000" }} className="error">
//               {emailError}
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="row">
//         <div className="Column">
//           <label className="AddPopupLabel">Phone Number *</label>
//           <input
//             className="FormControl_input"
//             type="tel"
//             name="phoneNumber"
//             value={newUser.phoneNumber}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="Column">
//           <label className="AddPopupLabel">Company *</label>
//           <select
//             className="FormControl_input"
//             name="companyId"
//             value={newUser.companyId}
//             onChange={handleChange}
//           >
//             <option value="">Select Company</option>
//             {companyOptions.map((company) => (
//               <option key={company.id} value={company.id}>
//                 {company.nameEn}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="row">
//         <div className="Column">
//           <label className="AddPopupLabel">CNS Employee *</label>
//           <select
//             className="FormControl_input"
//             name="isCNSEmployee"
//             value={newUser.isCNSEmployee}
//             onChange={handleChange}
//           >
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//         </div>
//         <div className="Column">
//           <label className="AddPopupLabel">Role *</label>
//           <select
//             className="FormControl_input"
//             name="roleId"
//             value={newUser.roleId}
//             onChange={handleChange}
//           >
//             <option value="">Select Role</option>
//             {filteredRoles.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.roleName}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="row">
//         <input
//           size="small"
//           type="button"
//           name="Create"
//           value="Create"
//           className="FormControl_button"
//           onClick={handleCreate}
//         />
//       </div>
//     </div>
//   );
// }

function CreateUserForm({ onCreate }) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [newUser, setNewUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyId: "",
    roleId: "",
    isDisabled: true,
    isCNSEmployee: false,
  });
  const [companyOptions, setCompanyOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const roleData = await GetLookupsUserRoleAPI(Userdetails);
        setRoleOptions(roleData?.data || []);
        const companyData = await GetLookupsAPI(Userdetails);
        setCompanyOptions(companyData?.data || []);
      } catch (error) {
        console.error("Error fetching lookups:", error);
      }
    };
    fetchLookups();
  }, [Userdetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      if (name === "isCNSEmployee") {
        return {
          ...prev,
          isCNSEmployee: value === "true",
          roleId: value === "true" ? prev.roleId : "",
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleEmailBlur = async () => {
    const email = newUser.email;
    const exists = await CheckUserExistsAPI(Userdetails, email);
    setEmailError(exists?.data?.isUSerExists ? "User already exists" : "");
  };

  const handleCreate = async () => {
    if (emailError) return;
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.userName ||
      !newUser.phoneNumber ||
      !newUser.companyId ||
      !newUser.roleId
    ) {
      setFormError("Please fill in all required fields");
      return;
    }
    try {
      await RegisterUserAPI(Userdetails, newUser);
      onCreate(newUser);
      setNewUser({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyId: "",
        roleId: "",
        isDisabled: true,
        isCNSEmployee: false,
      });
      setFormError("");
      setShowModal(true);
    } catch (error) {
      setFormError("Registration failed. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    GetUserListAPI(Userdetails);
  };

  const filteredRoles = newUser.isCNSEmployee
    ? roleOptions
    : roleOptions.filter((role) => [4, 5, 6].includes(role.id));

  const modalStyles = {
    display: showModal ? "flex" : "none",
    position: "fixed",
    zIndex: 1000,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalContentStyles = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    position: "relative",
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "20px",
  };

  return (
    <div className="EditPopup">
      {formError && (
        <span style={{ color: "#FF0000" }} className="error">
          {formError}
        </span>
      )}
      <div className="row">
        <div className="Column">
          <label className="AddPopupLabel">First Name *</label>
          <input
            className="FormControl_input"
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="AddPopupLabel">Last Name *</label>
          <input
            className="FormControl_input"
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <label className="AddPopupLabel">Username *</label>
          <input
            className="FormControl_input"
            type="text"
            name="userName"
            value={newUser.userName}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="AddPopupLabel">Email *</label>
          <input
            className="FormControl_input"
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
          />
          {emailError && (
            <span style={{ color: "#FF0000" }} className="error">
              {emailError}
            </span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <label className="AddPopupLabel">Phone Number *</label>
          <input
            className="FormControl_input"
            type="tel"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="AddPopupLabel">Company *</label>
          <select
            className="FormControl_input"
            name="companyId"
            value={newUser.companyId}
            onChange={handleChange}
          >
            <option value="">Select Company</option>
            {companyOptions.map((company) => (
              <option key={company.id} value={company.id}>
                {company.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="Column">
          <label className="AddPopupLabel">CNS Employee *</label>
          <select
            className="FormControl_input"
            name="isCNSEmployee"
            value={newUser.isCNSEmployee}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="Column">
          <label className="AddPopupLabel">Role *</label>
          <select
            className="FormControl_input"
            name="roleId"
            value={newUser.roleId}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            {filteredRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <input
          size="small"
          type="button"
          name="Create"
          value="Create"
          className="FormControl_button_test"
          onClick={handleCreate}
        />
      </div>
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <span style={closeButtonStyles} onClick={handleCloseModal}>
              &times;
            </span>
            <p>User successfully registered</p>
            <button onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
