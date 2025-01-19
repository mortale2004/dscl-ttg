import React, { memo } from "react";
import "./loader.css";

type LoaderProps = {};

const Loader: React.FC<LoaderProps> = memo(({}) => {
  return (
    <div className="app-loader">
      <div className="loader-spin">
        <span className="loader-dot loader-dot-spin">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
  );
});

export default Loader;
