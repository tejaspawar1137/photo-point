import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

 const ProgressBarComponent = ({progress}:{progress:any}) => {
  return <ProgressBar completed={progress} />;
};

export default ProgressBarComponent;