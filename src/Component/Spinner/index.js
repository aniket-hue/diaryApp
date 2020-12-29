import React from "react";
import "./Spinner.css";

const spinner = () => {
  return (
    <div>
      <div className="Backdrop"></div>
      <div className="Loader">Loading...</div>
    </div>
  );
};

export default spinner;
