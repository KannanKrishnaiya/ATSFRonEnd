import "../../../assets/styles/CustomStyles/Discussion/DiscussionPage.css";
import FileUploader from "../../Utils/FileUploader";
export default function DiscussionPage() {
  return (
    <div>
      <div>
        <h2>Discussion board</h2>
      </div>
      <div className="DiscussionPage_DivContainer">
        <div className="parent">
          <div class="col-1">
            <div className="row">
              <h3 className="BoldColor">Cash Replenishment dtd 12-05-2024</h3>
            </div>
            <div className="row">
              <div className="column BoldColor">
                <h5>Ticket Number: </h5>
              </div>
              <div className="column">
                <span>T202405141304.186504</span>
              </div>
            </div>
            <div className="row">
              <div className="column BoldColor">
                <h5>Created On: </h5>
              </div>
              <div className="column">
                <span>13-May-2024 10:05 AM</span>
              </div>
            </div>
            <div className="row">
              <div className="column BoldColor">
                <h5>Updated On: </h5>
              </div>
              <div className="column">
                <span>14-May-2024 01:05 PM</span>
              </div>
            </div>
            <div className="row">
              <div className="column BoldColor">
                <h5>Status: </h5>
              </div>
              <div className="column">
                <span>In Progress</span>
              </div>
            </div>
            <div className="row">
              <div className="column BoldColor">
                <h5>User Name: </h5>
              </div>
              <div className="column">
                <span>Test User</span>
              </div>
            </div>{" "}
            <div className="row">
              <div className="column BoldColor">
                <h5>Contact: </h5>
              </div>
              <div className="column">
                <span> +971 562 65 2746</span>
              </div>
            </div>
            <div className="DiscussionPage_DivContainer">
              <div className="row">
                <h7 className="LabelDashboardDropDown">Description</h7>
                <textarea
                  className="FormControl_TextArea_New"
                  name="Requests"
                  placeholder="Provide Your Description"
                ></textarea>
              </div>
              <div className="row">
                <FileUploader />
                <div className="right">
                  <div className="flex-buttons">
                    <div>
                      <input
                        className="btn-grad"
                        type="button"
                        value="Submit"
                      />
                    </div>
                    <div>
                      <input className="btn-grad" type="button" value="Clear" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-2">
            <div class="wrapper">
              <div class="timelineBox">
                <div class="timelineHeader">
                  <h3>186504</h3>
                  <span>Timeline</span>
                </div>
                <div class="timelineBody">
                  <div class="timeline">
                    <ul>
                      <li>
                        <span>12-May-2024 04:14 PM</span>
                        <div class="content">
                          <h3>T202405141304.186504</h3>
                          <p>
                            Dear Altayb, According to the CHQ clearing crew,
                            with in 15 minutes’ machine will be cleared and
                            further deliver it to MASRF main branch Salam in the
                            morning. NOTE. I thought on the subject title Al
                            Masraf Cash Replenishment dtd 12-05-2024.
                          </p>
                        </div>
                      </li>
                      <li>
                        <span>12-May-2024 03:40 PM</span>
                        <div class="content">
                          <h3>T202405141304.186504</h3>
                          <p>
                            Dear Sasi As per attached email this machine
                            LuluMUS_20660112 is logged yesterday to as to be
                            attended today, please confirm
                          </p>
                        </div>
                      </li>
                      <li>
                        <span>12-May-2024 03:05 PM</span>
                        <div class="content">
                          <h3>T202405141304.186504</h3>
                          <p>
                            Dear Altayb, Machine ID MASRF 20660112 has been
                            replenished on 11.05.2024 as scheduled and there was
                            no allocation for 12.05.2024 Sunday, further advise
                            please.
                          </p>
                        </div>
                      </li>
                      <li>
                        <span>12-May-2024 02:30 PM</span>
                        <div class="content">
                          <h3>T202405141304.186504</h3>
                          <p>
                            Dear TG Kindly update on LuluMUS_20660112 as the
                            machine not attended yet
                          </p>
                        </div>
                      </li>
                      <li>
                        <span>12-May-2024 02:00 PM</span>
                        <div class="content">
                          <h3>T202405141304.186504</h3>
                          <p>
                            Dear TG Kindly update on LuluMUS_20660112 &
                            RAKMALL_20111101 as both machines not attended yet
                          </p>
                        </div>
                      </li>
                      <li>
                        <span>12-May-2024 01:40 PM</span>
                        <div class="content">
                          <h3>T202405141304.186504 </h3>
                          <p>
                            Dear TG, Kindly advise your cash loading team to
                            install a new Masraf Receipt Roll and Journal roll
                            and confirm the status by phone after activity and
                            do that on the below machines
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
