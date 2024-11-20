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
import { LogoutAPI, RegisterUserAPI, UpdateUserAPI } from "../../../../services/Api";
import { Typography } from "@mui/material";
import { Logout } from "../../../../services/Auth";

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
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);
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
         if (err.response?.status !== 200) {
           LogoutAPI(Userdetails);
           Logout();
         }
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
    { name: "roleId", options: { display: false } },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          // <div className="DT_Div_ViewDetails_flex-container">
          //   {tableMeta.rowData[7] === 1 ? (
          //     <TbUserEdit className="DataTableIcons" />
          //   ) : (
          //     <div className="tooltip">
          //       <TbUserEdit
          //         className="DataTableIcons"
          //         onClick={() => handleEdit(tableMeta.rowData, value)}
          //       />
          //       <span className="tooltiptext">Edit User</span>
          //     </div>
          //   )}

          //   {LoggedInUserRoleDetailsData?.RoleId === 1 && (
          //     <div className="tooltip">
          //       <RiLockPasswordLine
          //         className="DataTableIcons"
          //         onClick={() => handleResetPasswordModal(tableMeta.rowData[3])}
          //       />
          //       <span className="tooltiptext">Reset Password</span>
          //     </div>
          //   )}
          // </div>
          <div className="DT_Div_ViewDetails_flex-container">
            {LoggedInUserRoleDetailsData?.RoleId > 1 &&
            tableMeta.rowData[9] === 1 ? (
              ""
            ) : (
              // <TbUserEdit className="DataTableIcons" />""
              <div className="tooltip">
                <TbUserEdit
                  className="DataTableIcons"
                  onClick={() => handleEdit(tableMeta.rowData, value)}
                />
                <span className="tooltiptext">Edit User</span>
              </div>
            )}

            {LoggedInUserRoleDetailsData?.RoleId === 1 && (
              <div className="tooltip">
                <RiLockPasswordLine
                  className="DataTableIcons"
                  onClick={() => handleResetPasswordModal(tableMeta.rowData[3])}
                />
                <span className="tooltiptext">Reset Password</span>
              </div>
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
      roleId: rowData[6],
      isDisabled: rowData[7],
      isCNSEmployee: rowData[8],
    });
    setIsEditModalOpen(true);
  };

  const [email, setEmail] = useState();

  const handleResetPasswordModal = (email) => {
    setIsResetPassModalOpen(true);
    setEmail(email);
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
    // setIsCreateModalOpen(false);
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
                <BiPlusCircle size={18} />
                &nbsp;Add User
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
                      close={close}
                      userEditInput={userEditInput}
                      onUpdate={handleCreateUser}
                    />
                  </div>
                </div>
              )}
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
                    <CreateUserForm close={close} onCreate={handleCreateUser} />
                  </div>
                </div>
              )}
            </Popup>
            <Popup
              open={isResetPassModalOpen}
              onClose={() => setIsResetPassModalOpen(false)}
              modal
              nested
            >
              {(close) => (
                <div className="DashboardModal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div>
                    <ResetUser email={email} close={close} />
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

function ResetUser({ email, close }) {
  const [formError, setFormError] = useState("");
  const Userdetails = localStorage.getItem("LoggedInUser");

  const handleResetPassword = async () => {
    try {
      await ResetPasswordAPI(Userdetails, email);
      GetUserListAPI(Userdetails);
      toast.success("Password reset successfully.", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      setFormError("");
      close();
    } catch (error) {
      if (error?.response?.status != 200) {
        LogoutAPI(Userdetails);
        Logout();
      }
      setFormError("Reset password failed. Please try again.");
    }
  };

  const handleResetPasswordClose = () => {
    close();
  };

  return (
    <div className="EditPopup">
      <center>
        {formError && (
          <span style={{ color: "#FF0000" }} className="error">
            {formError}
          </span>
        )}
      </center>

      <div className="row">
        <Typography>
          Do you want to reset the password for{" "}
          <b>
            <u>{email}</u>
          </b>
        </Typography>
      </div>
      <div className="row">
        <center>
          {" "}
          <input
            type="button"
            value="Yes"
            className="FormControl_button"
            onClick={handleResetPassword}
          />
          <input
            type="button"
            value="No"
            className="FormControl_button"
            onClick={handleResetPasswordClose}
          />
        </center>
      </div>
    </div>
  );
}

function EditUserForm({ userEditInput, onUpdate, close }) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    companyId: "0",
    roleId: "",
    isDisabled: false,
    isCNSEmployee: false,
    ...userEditInput,
  });

  const [companyOptions, setCompanyOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [filteredRoleOptions, setFilteredRoleOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const roleData = await GetLookupsUserRoleAPI(Userdetails);
        setRoleOptions(roleData?.data || []);
        const companyData = await GetLookupsAPI(Userdetails);
        setCompanyOptions(companyData?.data || []);
      } catch (error) {
        console.error("Error fetching lookups:", error);
        if (error.response?.status !== 200) {
          LogoutAPI(Userdetails);
          Logout();
        }
      }
    };
    fetchLookups();
  }, [Userdetails]);

  useEffect(() => {
    if (userEditInput) {
      const companyId =
        companyOptions.find(
          (company) => company.nameEn === userEditInput.companyId
        )?.id || "0";

      const roleId =
        roleOptions.find((role) => role.roleName === userEditInput.roleId)
          ?.id || "";

      setFormData((prev) => ({
        ...prev,
        firstName: userEditInput.firstName || "",
        lastName: userEditInput.lastName || "",
        userName: userEditInput.userName || "",
        email: userEditInput.email || "",
        phoneNumber: userEditInput.phoneNumber || "",
        companyId: companyId,
        roleId: roleId,
        isDisabled: userEditInput.isDisabled || false,
        isCNSEmployee: userEditInput.isCNSEmployee || false,
      }));
    }
  }, [userEditInput, companyOptions, roleOptions]);

  useEffect(() => {
    const updatedRoleOptions = formData.isCNSEmployee
      ? roleOptions.filter((role) => role.id === 2 || role.id === 3)
      : roleOptions;
    setFilteredRoleOptions(updatedRoleOptions);
  }, [formData.isCNSEmployee, roleOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "isCNSEmployee") {
        return {
          ...prev,
          isCNSEmployee: value === "Yes",
          companyId: value === "Yes" ? "0" : prev.companyId,
          roleId:
            value === "Yes" && prev.roleId !== "2" && prev.roleId !== "3"
              ? ""
              : prev.roleId,
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, isDisabled: status === "In Active" }));
  };

  const handleUpdateClick = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.userName ||
      !formData.phoneNumber ||
      (!formData.isCNSEmployee && !formData.companyId) ||
      !formData.roleId
    ) {
      setFormError("Please fill in all required fields");
      return;
    }
    const updatedData = {
      ...formData,
      companyId: formData.companyId || "0",
    };

    try {
      await UpdateUserAPI(Userdetails, formData);
      onUpdate(updatedData);
      setFormData({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyId: "0",
        roleId: "",
        isDisabled: true,
        isCNSEmployee: false,
      });
      setShowModal(true);
    } catch (error) {
      // if (error.response.status !== 200) {
      //   Logout();
      // }
    }
  };

  const filteredRoles = formData.isCNSEmployee
    ? roleOptions.filter((role) => [2, 3].includes(role.id))
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

  const handleCloseModal = () => {
    setShowModal(false);
    setFormError("");
    close();
    GetUserListAPI(Userdetails);
    window.location.reload();
  };

  return (
    <div className="EditPopup">
      <div style={{ marginBottom: "18px" }}>
        <center>
          <h2>Edit User</h2>
        </center>
      </div>
      <center>
        {" "}
        {formError && (
          <span style={{ color: "#FF0000" }} className="error">
            {formError}
          </span>
        )}
      </center>

      <div className="row">
        <div className="Column">
          <label className="AddPopupLabel">First Name</label>
          <input
            className="FormControl_input"
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="AddPopupLabel">Last Name</label>
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
          <label className="AddPopupLabel">Username</label>
          <input
            className="FormControl_input"
            type="text"
            name="userName"
            value={formData.userName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="AddPopupLabel">Email</label>
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
          <label className="AddPopupLabel">Phone Number</label>
          <input
            className="FormControl_input"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>
        <div className="Column">
          <label className="AddPopupLabel">Company</label>
          <select
            className="FormControl_input"
            name="companyId"
            value={formData.companyId || "0"}
            onChange={handleChange}
            disabled={formData.isCNSEmployee}
          >
            <option value="0">Select Company</option>
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
          <label className="AddPopupLabel">Active Status</label>
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
          <label className="AddPopupLabel">Role</label>
          <select
            className="FormControl_input"
            name="roleId"
            value={formData.roleId || ""}
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
        <div className="Column">
          <label className="AddPopupLabel">Is CNS Employee</label>
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
      </div>
      <div className="row">
        <center>
          {" "}
          <button
            // type="button"
            // value="Update"
            // className="FormControl_button"
            className="ModelButton"
            onClick={handleUpdateClick}
          >
            Update
          </button>
        </center>
      </div>
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>User successfully Updated</h3>
            <input
              type="button"
              value="Ok"
              className="FormControl_button"
              onClick={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CreateUserForm({ onCreate, close }) {
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [newUser, setNewUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyId: "0",
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
        if (error.response.status !== 200) {
          Logout();
        }
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
          companyId: value === "true" ? "0" : prev.companyId,
          roleId:
            value === "true" && prev.roleId !== "2" && prev.roleId !== "3"
              ? ""
              : prev.roleId,
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleEmailBlur = async () => {
    const email = newUser.email;
    const exists = await CheckUserExistsAPI(Userdetails, email);
    setEmailError(exists?.data?.isUserExists ? "User already exists" : "");
  };

  const handleCreate = async () => {
    if (emailError) return;
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.userName ||
      !newUser.phoneNumber ||
      (!newUser.isCNSEmployee && !newUser.companyId) ||
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
        companyId: "0",
        roleId: "",
        isDisabled: true,
        isCNSEmployee: false,
      });
      setFormError("");
      setShowModal(true);
    } catch (error) {
      setFormError("Registration failed. Please try again.");
      if (error.response.status !== 200) {
        Logout();
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    close();
    GetUserListAPI(Userdetails);
    window.location.reload();
  };

  const filteredRoles = newUser.isCNSEmployee
    ? roleOptions.filter((role) => [2, 3].includes(role.id))
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

  return (
    <div className="EditPopup">
      <div style={{ marginBottom: "30px" }}>
        <center>
          <h2>Add User</h2>
        </center>
      </div>
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
      </div>
      <div className="row">
        <div className="Column">
          <label className="AddPopupLabel">Company *</label>
          <select
            className="FormControl_input"
            name="companyId"
            value={newUser.companyId}
            onChange={handleChange}
            disabled={newUser.isCNSEmployee}
          >
            <option value="0">Select Company</option>
            {companyOptions.map((company) => (
              <option key={company.id} value={company.id}>
                {company.nameEn}
              </option>
            ))}
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
        <button
          // type="button"
          // name="Create"
          // value="Create"
          className="ModelButton"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>User successfully registered</h3>
            <input
              type="button"
              value="Ok"
              className="FormControl_button"
              onClick={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
