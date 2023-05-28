import React, { useState } from "react";
import { Chart } from "react-google-charts";

const formatTooltip = (name, marks) => {
  if (name === "Alex") {
    return `
  <div style="padding: 10px">
  <strong>Your Marks</strong>
    <strong>${name}</strong>
    <br/>
    Marks: ${marks}
  </div>
`;
  } else {
    return `
    <div style="padding: 10px">
        <strong>${name}</strong>
        <br/>
        Marks: ${marks}
        </div>
    `;
  }
};

const MarkHistogram = (props) => {
  console.log("MarkHistogram");
  console.log(props.data);
  options = props.options ? props.options : options;
  const [selectedValues, setSelectedValues] = useState([]);
  var options = {
    title: props.options.title ? props.options.title : "Marks Distribution",
    legend: { position: "none" },
    vAxis: { title: "Frequency" },
    hAxis: {
      title: props.options.hAxis.title ? props.options.hAxis.title : "Marks",
    },
    histogram: {
      bucketSize: 10,
      minValue: 0,
      maxValue: props.mark ? props.mark : 100,
      tooltip: { isHtml: true },
      selectedValues: [],
      vAxis: { scaleType: "mirrorLog" },
    },
    colors: ["#AA00FF"],
  };
  const handleMouseOver = ({ chartWrapper, target }) => {
    const dataTable = chartWrapper.getDataTable();
    const rowIndex = target.row;
    const name = dataTable.getValue(rowIndex, 0);
    const marks = dataTable.getValue(rowIndex, 1);
    var tooltip = formatTooltip(name, marks);
    target.setAttribute("data-tooltip", tooltip);
  };

  const handleMouseOut = ({ target }) => {
    target.removeAttribute("data-tooltip");
  };

  return (
    <Chart
      chartType="Histogram"
      height="300px"
      data={props.data}
      options={{
        ...options,
        histogram: { ...options.histogram, selectedValues },
      }}
      chartEvents={[
        { eventName: "onmouseover", callback: handleMouseOver },
        { eventName: "onmouseout", callback: handleMouseOut },
      ]}
      chartActions={[
        {
          id: "highlight-marks",
          text: "Highlight My Marks",
          action: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = [];
            data.forEach(([name, marks], i) => {
              if (name === "You") {
                chart.setSelection([{ row: i - 1 }]);
                selection.push(marks);
              }
            });
            setSelectedValues(selection);
          },
        },
      ]}
      chartStyle={{ maxWidth: "100%", margin: "0 auto" }}
      chartPackages={["corechart", "controls"]}
    />
  );
};

export default MarkHistogram;
