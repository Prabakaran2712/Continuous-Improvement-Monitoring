import Styles from "./Submit.module.css";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
const Submit = (props) => {
  if (props.loading)
    return (
      <div className={`${Styles.loading}`}>
        <CircularProgress />
        <span>{props.loadingText && <p>{props.loadingText}</p>}</span>
      </div>
    );
  return (
    <input
      type="submit"
      className={`form-control btn btn-outline-dark  shadow ${Styles.submit}`}
      value={props.name}
    />
  );
};

export default Submit;
