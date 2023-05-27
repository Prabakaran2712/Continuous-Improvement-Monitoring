import Styles from "./Button.module.css";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
const Btn = (props) => {
  const [loading, setLoading] = useState(false);
  if (loading) {
    {
      console.log("loading");
    }
    return (
      <div className={`${Styles.loading}`}>
        <CircularProgress />
        <span>{props.loadingText && <p>{props.loadingText}</p>}</span>
      </div>
    );
  }
  return (
    <Button
      onClick={() => {
        setLoading(true);
        props.onClick();
        setLoading(false);
      }}
      disabled={props.disabled}
      className={`${Styles.btn} ${props.className}`}
    >
      {props.name}
    </Button>
  );
};

export default Btn;
