


export const StoreUserData = (data) => {
  const LoggedInUser = {
    UserName: data.userName,
    // UserName: "Mohammed.Arash@cns-me.com",
    token: data.token,
    refreshToken: data.refreshToken,
  };
  localStorage.setItem("LoggedInUser", JSON.stringify(LoggedInUser));
  // sessionStorage.setItem("isLoaded", 0);

  //console.log("LoggedInUser Data", localStorage.getItem('LoggedInUser'));
  // localStorage.setItem('access_token',data);
};

export const getUserData = () => {
  const userData = JSON.parse(localStorage.getItem("LoggedInUser"));
  return userData;
};

export const removeUserData = () => {
  localStorage.removeItem("LoggedInUser");
  localStorage.removeItem("LoggedInUserRoleDetails");

  window.location = "login";
};

export const GetLoggedInUserRoleDetails = () => {
  const LoggedInUserRoleDetails = JSON.parse(
    localStorage.getItem("LoggedInUserRoleDetails")
  );
  return LoggedInUserRoleDetails;
};

export const SetLoggedInUserRoleDetails = (data) => {
  const UserRoleDetails = {
    Id: data.Id,
    BankName: data.BankName,
    Designation: data.Designation,
    Email: data.Email,
    FirstName: data.FirstName,
    LastName: data.LastName,
    MobileNumber: data.MobileNumber,
    RoleId: data.RoleId,
    RoleName: data.RoleName,
    UserName: data.UserName,
  };
  localStorage.setItem(
    "LoggedInUserRoleDetails",
    JSON.stringify(UserRoleDetails)
  );
};
