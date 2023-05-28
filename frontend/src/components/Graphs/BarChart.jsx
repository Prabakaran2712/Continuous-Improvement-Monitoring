import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Marks Distribution",
  },
};

const BarChart = (props) => {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={props.data}
      options={options}
    />
  );
};
export default BarChart;
