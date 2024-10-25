import "../../../../assets/styles/CustomStyles/FormControls.css";
export default function SendMail() {
  return (
    <div>
      <div className="DivContainer">
        <div className="row">
          <span>To</span>
          <input
            className="FormControl_input"
            type="text"
            name="Branch"
            placeholder="Branch"
            //   onChange={handleInput}
          />
        </div>
        <div className="row">
          <span>Subject</span>
          <input
            className="FormControl_input"
            type="text"
            name="Branch"
            placeholder="Branch"
            //   onChange={handleInput}
          />
        </div>
        <div className="row">
          <span>Message</span>
          <input
            className="FormControl_input"
            type="text"
            name="Branch"
            placeholder="Branch"
            //   onChange={handleInput}
          />
        </div>

        <div className="row">
          <span>Query</span>

          <textarea
            className="FormControl_TextArea"
            name="Query"
            placeholder="Query"
          ></textarea>
        </div>
        <div className="row">
          <div className="column">
            <div className="flex-buttons">
              <div>
                <input className="btn-grad" type="button" value="Save" />
              </div>
              <div>
                <input className="btn-grad" type="button" value="Cancel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
