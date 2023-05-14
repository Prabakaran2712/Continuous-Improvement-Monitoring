import { useEffect, useState } from "react";
import {
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Badge } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Styles from "./Calendar.module.css";
const Calendar = (props) => {
  useEffect(() => {
    console.log(props.presentDays);
  }, [props.presentDays]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        className={`${Styles.calendar}`}
        orientation="portrait"
        value={props.value}
        disableFuture
        onMonthChange={props.onMonthChange}
        onChange={props.onChange}
        slots={{
          day: (data) => {
            const isPresent =
              !data.outsideCurrentMonth &&
              props.presentDays.indexOf(data.day.getDate()) >= 0;
            const isAbsent =
              !data.outsideCurrentMonth &&
              props.absentDays.indexOf(data.day.getDate()) >= 0;
            var icon;
            if (isPresent) {
              icon = <CheckIcon style={{ color: "green" }} />;
            } else if (isAbsent) {
              icon = <ClearIcon style={{ color: "red" }} />;
            } else {
              icon = undefined;
            }

            return (
              <Badge
                key={data.day.toString()}
                overlap="circular"
                badgeContent={icon}
              >
                <PickersDay {...data} />
              </Badge>
            );
          },
        }}
      />
    </LocalizationProvider>
  );
};
export default Calendar;
