import BankDetailsFilter from "../Common/BankDetailsFilter";

export default function Requests() {
  return (
    <div>
      <div>
        <div>
          <h2>Request Submission</h2>
        </div>
        <BankDetailsFilter />
        <div className="DivContainer">
          <div className="row">
            <h7 className="LabelDashboardDropDown">Subject</h7>
            <input
              className="FormControl_input_New"
              type="text"
              name="Subject"
              placeholder="Subject"
              //   onChange={handleInput}
            />
          </div>

          <div className="row">
            <h7 className="LabelDashboardDropDown">Type your Request</h7>
            <textarea
              className="FormControl_TextArea_New"
              name="Requests"
              placeholder="Type your Request"
            ></textarea>
          </div>
          <div className="row">
            <div className="column">
              <div className="flex-buttons">
                <div>
                  <input className="btn-grad" type="button" value="Save" />
                </div>
                <div>
                  <input className="btn-grad" type="button" value="Reset" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
