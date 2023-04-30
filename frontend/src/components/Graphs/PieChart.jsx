import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  sliceVisibilityThreshold: 0.2, // 20%
};

const PieChart = (props) => {
  return (
    <Chart
      chartType="PieChart"
      data={props.data}
      options={props.options ? props.options : options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default PieChart;
