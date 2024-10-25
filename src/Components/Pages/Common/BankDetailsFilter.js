import { useEffect, useState, setState } from "react";
export default function BankDetailsFilter() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [DashboardDropDownValues, setDashboardDropDownValues] = useState([]);

  const [SelectedDashboardDropDownValues, setSelectDashboardDropDownValues] =
    useState({
      BankName: "",
      Branch: "",
      Atm_TerminalId: "",
      TransactionStartDate: "",
      TransactionEndDate: "",
    });
  const [DashboardBankNameDropDown, setDashboardBankNameDropDown] = useState(
    []
  );
  // const [SelectedBankDropDown, setSelectedBankDropDown] = useState({
  //   BankName: "",
  // });

  const [DashboardCityDropDown, setDashboardCityDropDown] = useState([]);
  const [DashboardLocationDropDown, setDashboardLocationDropDown] = useState(
    []
  );
  const [DashboardDeviceTypeDropDown, setDashboardDeviceTypeDropDown] =
    useState([]);
  const [DashboardModelDropDown, setDashboardModelDropDown] = useState([]);
  const ResetDropDown = (e) => {
    SelectedDashboardDropDownValues.BankName = "";
    SelectedDashboardDropDownValues.Branch = "";
    SelectedDashboardDropDownValues.Atm_TerminalId = "";
    SelectedDashboardDropDownValues.TransactionStartDate = "";
    SelectedDashboardDropDownValues.TransactionEndDate = "";
    setDashboardBankNameDropDown([]);
    setDashboardCityDropDown([]);
    setDashboardLocationDropDown([]);
    setDashboardDeviceTypeDropDown([]);
    setDashboardModelDropDown([]);
    // GetVVDahsboardData();
  };

  const handleInput_BankNameDropDown = (event) => {
    SelectedDashboardDropDownValues.BankName = event.target.value;

    const FilterCity = DashboardDropDownValues.filter((c) =>
      c.BankName.includes(event.target.value)
    );
    // console.log("FilterCity", FilterCity);
    const DistinctCity = new Set(FilterCity.map((c) => c.City));
    // Update state with unique
    setDashboardCityDropDown([...DistinctCity]);
    // console.log("DistinctCity1", DistinctCity);
  };

  const handleInput_CityDropDown = (event) => {
    // console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.City = event.target.value;

    const FilterLocation = DashboardDropDownValues.filter(
      (c) =>
        c.BankName.includes(SelectedDashboardDropDownValues.BankName) &&
        c.City.includes(event.target.value)
    );
    // console.log("FilterCity", FilterCity);
    const DistinctLocation = new Set(FilterLocation.map((c) => c.Location));
    // Update state with unique
    setDashboardLocationDropDown([...DistinctLocation]);
    //console.log("DistinctCity1", DistinctLocation);
  };

  const handleInput_LocationDropDown = (event) => {
    //console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.Location = event.target.value;

    const FilterDeviceType = DashboardDropDownValues.filter(
      (c) =>
        c.BankName.includes(SelectedDashboardDropDownValues.BankName) &&
        c.City.includes(SelectedDashboardDropDownValues.City) &&
        c.Location.includes(event.target.value)
    );

    const DistinctDeviceType = new Set(
      FilterDeviceType.map((c) => c.Device_Type)
    );
    // Update state with unique
    setDashboardDeviceTypeDropDown([...DistinctDeviceType]);
  };
  const handleInput_DeviceTypeDropDown = (event) => {
    //console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.Device_Type = event.target.value;
    const FilterModel = DashboardDropDownValues.filter(
      (c) =>
        c.BankName.includes(SelectedDashboardDropDownValues.BankName) &&
        c.City.includes(SelectedDashboardDropDownValues.City) &&
        c.Location.includes(SelectedDashboardDropDownValues.Location) &&
        c.Device_Type.includes(event.target.value)
    );

    const DistinctModel = new Set(FilterModel.map((c) => c.Device_Model));
    // Update state with unique
    setDashboardModelDropDown([...DistinctModel]);
  };
  const handleInput_DeviceModelDropDown = (event) => {
    //console.log("DashboardDropDownValues", DashboardDropDownValues);
    SelectedDashboardDropDownValues.Device_Model = event.target.value;
  };

  return (
    <div>
      <div className="row">
        <div className="DashboardBank_DropDownDiv">
          <div className="row">
            <div className="DashboardColumn">
              <label className="LabelDashboardDropDown">Bank Name</label>
              <select
                onChange={handleInput_BankNameDropDown}
                name="Select_BankName"
                className="FormControl_Select"
                selected={
                  (setSelectDashboardDropDownValues.BankName =
                    SelectedDashboardDropDownValues.BankName)
                }
                value={SelectedDashboardDropDownValues.BankName}
              >
                <option>Select Bank</option>(
                {DashboardBankNameDropDown.length > 0}?
                {DashboardBankNameDropDown.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                :null)
              </select>
            </div>
            <div className="DashboardColumn">
              <label className="LabelDashboardDropDown">City</label>
              <select
                className="FormControl_Select"
                name="Select_City"
                onChange={handleInput_CityDropDown}
                selected={
                  (setSelectDashboardDropDownValues.City =
                    SelectedDashboardDropDownValues.City)
                }
                value={SelectedDashboardDropDownValues.City}
              >
                <option value={"0"}>Select City</option>
                {DashboardCityDropDown.length > 0}?
                {DashboardCityDropDown.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                :null)
              </select>
            </div>
            <div className="DashboardColumn">
              <label className="LabelDashboardDropDown">Location</label>
              <select
                name="Location"
                className="FormControl_Select"
                onChange={handleInput_LocationDropDown}
                selected={
                  (setSelectDashboardDropDownValues.Location =
                    SelectedDashboardDropDownValues.Location)
                }
                value={SelectedDashboardDropDownValues.Location}
              >
                <option value={"0"}>Select Location</option>
                {DashboardLocationDropDown.length > 0}?
                {DashboardLocationDropDown.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                :null)
              </select>
            </div>
            <div className="DashboardColumn">
              <label className="LabelDashboardDropDown">Device Type</label>
              <select
                name="DeviceType"
                className="FormControl_Select"
                onChange={handleInput_DeviceTypeDropDown}
                selected={
                  (setSelectDashboardDropDownValues.Device_Type =
                    SelectedDashboardDropDownValues.Device_Type)
                }
                value={SelectedDashboardDropDownValues.Device_Type}
              >
                <option value={"0"}>Select Device Type</option>
                {DashboardDeviceTypeDropDown.length > 0}?
                {DashboardDeviceTypeDropDown.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                :null)
              </select>
            </div>
            <div className="DashboardColumn">
              <label className="LabelDashboardDropDown">Model</label>
              <select
                name="Model"
                className="FormControl_Select"
                onChange={handleInput_DeviceModelDropDown}
                selected={
                  (setSelectDashboardDropDownValues.Device_Model =
                    SelectedDashboardDropDownValues.Device_Model)
                }
                value={SelectedDashboardDropDownValues.Device_Model}
              >
                <option value={"0"}>Select Device Model</option>
                {DashboardModelDropDown.length > 0}?
                {DashboardModelDropDown.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                :null)
              </select>
            </div>
            <div className="">
              <div className="flex-buttons">
                <div>
                  <input
                    className="btn-grad"
                    type="button"
                    value="Apply"
                    // onClick={GetVVDahsboardData}
                  />
                </div>
                <div>
                  <input
                    className="btn-grad"
                    type="button"
                    value="Clear"
                    onClick={ResetDropDown}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
