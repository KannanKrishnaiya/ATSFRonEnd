import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
// import LoadingOverlay from "react-loading-overlay-ts";
// import Loader from "react-js-loader";
import HashLoader from "react-spinners/HashLoader";

import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import BarLoader from "react-spinners/BarLoader";
import ClipLoader from "react-spinners/ClipLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../assets/styles/CustomStyles/Custom.css";
// import "../../assets/styles/CustomStyles/Loader.css";
import Bars from "react-loader-spinner";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  CircleSpinnerOverlay,
  FerrisWheelSpinner,
  RingSpinnerOverlay,
  BounceLetterLoaderOverlay,
} from "react-spinner-overlay";

export default function LoaderComp() {
  const overlayColor = "rgb(54 52 92)";
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="LoaderDiv">
        {/* <FerrisWheelSpinner size={28} /> */}
        <RingSpinnerOverlay
          overlayColor="rgb(176 174 225);"
          message={"Loading..."}
        />
      </div>
      {/* <div className="LoaderDivText">
        <BounceLetterLoaderOverlay
          className="LoaderDivText"
          overlayColor="rgb(54 52 92);"
        />
      </div> */}

      {/* <div> */}
      {/* <Loader className="LoaderDiv" fullPage loading spinner></Loader> */}
      {/* <LoadingOverlay
          className="loader"
          active={true}
          fullPage
          spinner={
            <ScaleLoader
              // css={override}
              sizeunit={"px"}
              size={50}
              color={color}
            />
          }
        ></LoadingOverlay> */}
      {/* </div> */}
    </div>
  );
}
