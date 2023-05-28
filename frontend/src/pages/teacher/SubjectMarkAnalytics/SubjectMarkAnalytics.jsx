import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import MarkHistogram from "../../../components/Graphs/MarkHistogram";
import SubjectData from "../../../components/SubjectData/SubjectData";
import PieChart from "../../../components/Graphs/PieChart";
import Header from "../../../components/Page/Header/Header";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Loading from "../../../components/Loading/Loading";
import Table from "../../../components/Table/Table";
import Styles from "./SubjectMarkAnalytics.module.css";
import TabPanel from "../../../components/TabPanel/TabPanel";
import BarChart from "../../../components/Graphs/BarChart";
import { set } from "mongoose";

const SubjectMarkAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [markData, setMarkData] = useState(null);
  const [assesment1Data, setAssesment1Data] = useState([]);
  const [assesment2Data, setAssesment2Data] = useState([]);
  const [endsemesterData, setEndsemesterData] = useState([]);
  const [overallChart, setOverallChart] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [tableTabs, setTableTabs] = useState(0);
  const [tabs, setTabs] = useState(0);
  const [graphTabs, setGraphTabs] = useState(0);
  const [oTabs, setOTabs] = useState(0);
  const [gtabs, setGtabs] = useState(0);
  const [data, setData] = useState();

  const [asses1Table, setAsses1Table] = useState([]);
  const [asses2Table, setAsses2Table] = useState([]);
  const [endTable, setEndTable] = useState([]);
  //get value from url
  const { id, sid } = useParams();
  const setDataValue = (mdata) => {
    var temp = [];

    mdata.map((x, index) => {
      console.log(x);
      temp[index] = [
        x.student.name,
        x.student.roll_number,

        x.mark,
        (x.mark / x.total) * 100,

        () => {},
      ];
    });

    return temp;
  };

  useEffect(() => {
    //get course details with id
    axios
      .get(`/api/teaches/${id}`)
      .then((res) => {
        setCourseData(res.data);

        //get all marks of students for subject
        axios.get(`/api/marks/teaches/${id}`).then((res) => {
          //filter marks of exams that are published
          res.data = res.data.filter((mark) => {
            return mark.exam.published === true;
          });
          setMarkData(res.data);
          //map exam types with array of marks
          var examTypes = ["Assessment-1", "Assessment-2", "End-Semester"];

          var temp = [];
          examTypes.forEach((type) => {
            temp[type] = [];
          });
          res.data.map((mark) => {
            temp[mark.exam.exam_type].push({
              student: mark.student,
              mark: mark.mark,
              total: mark.exam.total_marks,
            });
          });
          temp["Overall"] = [];
          if (
            temp["Assessment-1"].length != 0 &&
            temp["Assessment-2"].length != 0 &&
            temp["End-Semester"].length != 0
          ) {
            for (var i = 0; i < temp["Assessment-1"].length; i++) {
              temp["Overall"].push({
                student: temp["Assessment-1"][i].student,
                mark:
                  temp["Assessment-1"][i].mark * 0.5 +
                  temp["Assessment-2"][i].mark * 0.5 +
                  temp["End-Semester"][i].mark * 0.5,
                total: 100,
              });
            }
          }
          setAsses1Table(setDataValue(temp["Assessment-1"]));
          setAsses2Table(setDataValue(temp["Assessment-2"]));
          setEndTable(setDataValue(temp["End-Semester"]));
          setOverallData(setDataValue(temp["Overall"]));

          //assesment 1 in data format for all students
          var assesment1 = [["Name", "Marks"]];
          res.data.filter((mark) => {
            if (mark.exam.exam_type === "Assessment-1")
              assesment1.push([
                mark.student.name,
                (mark.mark / mark.exam.total_marks) * 100,
              ]);
          });
          console.log(" assesment1");
          console.log(assesment1);
          setAssesment1Data(assesment1);

          //assesment 2 in data format for all students
          var assesment2 = [["Name", "Marks"]];

          res.data.filter((mark) => {
            if (mark.exam.exam_type === "Assessment-2")
              assesment2.push([
                mark.student.name,
                (mark.mark / mark.exam.total_marks) * 100,
              ]);
          });
          console.log(assesment2);
          setAssesment2Data(assesment2);

          //end semester in data format for all students
          var endsemester = [["Name", "Marks"]];
          res.data.filter((mark) => {
            if (mark.exam.exam_type === "End-Semester")
              endsemester.push([
                mark.student.name,
                (mark.mark / mark.exam.total_marks) * 100,
              ]);
          });
          console.log(endsemester);
          setEndsemesterData(endsemester);
          var overall = [["Name", "Overall"]];

          if (
            assesment1.length > 0 &&
            assesment2.length > 0 &&
            endsemester.length > 0
          ) {
            for (var i = 1; i < assesment1.length; i++) {
              overall.push([
                assesment1[i][0],
                assesment1[i][1] * 0.25 +
                  assesment2[i][1] * 0.25 +
                  endsemester[i][1] * 0.5,
              ]);
            }
          }
          setOverallChart(overall);
          console.log(overall);
          if (overall.length > 0) {
            var combined = [
              [
                "Name",
                "Assessment-1",
                "Assessment-2",
                "End-Semester",
                "Overall",
              ],
            ];
            for (var i = 1; i < assesment1.length; i++) {
              combined.push([
                assesment1[i][0],
                assesment1[i][1],
                assesment2[i][1],
                endsemester[i][1],
                overall[i][1],
              ]);
            }
          }
          setCombinedData(combined);
          //pie chart data
          var piechart = [["Category", "Percentage"]];
          //total marks is 25% assesment 1 + 25% assesment 2 + 50% end semester
          //find total marks of all students
          var totalMarks = [];
          for (var i = 1; i < assesment1.length; i++) {
            totalMarks.push([
              assesment1[i][0],
              0.5 * (assesment1[i][1] + assesment2[i][1] + endsemester[i][1]),
            ]);
          }
          console.log("total marks");
          console.log(totalMarks);
          var total = totalMarks.length;
          var pass = 0;
          var fail = 0;

          totalMarks.forEach((mark) => {
            if (mark[1] >= 50) {
              pass++;
            } else {
              fail++;
            }
          });

          piechart.push(["Pass", pass]);
          piechart.push(["Fail", fail]);
          setPieChartData(piechart);

          setLoading(false);
        });
      })
      .then((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  if (loading) return <Loading />;

  return (
    <div className="mx-lg-2">
      <div className="header my-2 mb-3">
        <Title title="Subject Mark Analytics" />
      </div>

      <SubjectData courseData={courseData} />
      <Tabs
        value={tabs}
        onChange={(e, newValue) => setTabs(newValue)}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#000000",
            color: "#000000",
          },
        }}
        className={`${Styles.tabs} my-2`}
      >
        <Tab label={<span style={{ color: "black" }}>Table</span>} index={0} />
        <Tab label={<span style={{ color: "black" }}>Graphs</span>} index={1} />
      </Tabs>
      <TabPanel value={tabs} index={0}>
        <div className={`${Styles.options} `}>
          <Tabs
            value={tableTabs}
            onChange={(e, newValue) => setTableTabs(newValue)}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#000000",
                color: "#000000",
              },
            }}
          >
            <Tab
              label={<span style={{ color: "black" }}>Assesment-1</span>}
              index={0}
            />
            <Tab
              label={<span style={{ color: "black" }}>Assesment-2</span>}
              index={1}
            />
            <Tab
              label={<span style={{ color: "black" }}>End Semester</span>}
              index={2}
            />
            <Tab
              label={<span style={{ color: "black" }}>Overall</span>}
              index={3}
            />
          </Tabs>
          <TabPanel value={tableTabs} index={0}>
            <div className={`${Styles.table} `}>
              {asses1Table.length != 0 && (
                <div>
                  <Table
                    thead={["#", "Name", "Roll No", "Marks", "Percentage"]}
                    tbody={asses1Table}
                    tooltip={false}
                  />
                </div>
              )}
              {asses1Table.length == 0 && <div>Marks not published yet</div>}
            </div>
          </TabPanel>
          <TabPanel value={tableTabs} index={1}>
            {asses2Table.length != 0 && (
              <div>
                <Table
                  thead={["#", "Name", "Roll No", "Marks", "Percentage"]}
                  tbody={asses2Table}
                  tooltip={false}
                />
              </div>
            )}
            {asses2Table.length == 0 && <div>Marks not published yet</div>}
          </TabPanel>
          <TabPanel value={tableTabs} index={2}>
            {endTable.length != 0 ? (
              <div>
                <Table
                  thead={["#", "Name", "Roll No", "Marks", "Percentage"]}
                  tbody={endTable}
                  tooltip={false}
                />
              </div>
            ) : (
              <div>Marks not published yet</div>
            )}
          </TabPanel>
          <TabPanel value={tableTabs} index={3}>
            <Tabs
              value={oTabs}
              onChange={(e, newValue) => setOTabs(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#000000",
                  color: "#000000",
                },
              }}
            >
              <Tab
                label={<span style={{ color: "black" }}>ALL</span>}
                index={0}
              />
              <Tab
                label={<span style={{ color: "black" }}>Backlog</span>}
                index={2}
              />
            </Tabs>
            <TabPanel value={oTabs} index={0}>
              {overallData.length != 0 ? (
                <div>
                  <Table
                    thead={["#", "Name", "Roll No", "Marks", "Percentage"]}
                    tbody={overallData}
                    tooltip={false}
                  />
                </div>
              ) : (
                <div>Marks not published yet</div>
              )}
            </TabPanel>
            <TabPanel value={oTabs} index={1}>
              {overallData.length != 0 ? (
                <div>
                  <Table
                    thead={["#", "Name", "Roll No", "Marks", "Percentage"]}
                    tbody={overallData.filter((x) => x[3] < 50)}
                    tooltip={false}
                  />
                </div>
              ) : (
                <div>Marks not published yet</div>
              )}
            </TabPanel>
          </TabPanel>
        </div>
      </TabPanel>
      <TabPanel value={tabs} index={1}>
        <Tabs
          value={graphTabs}
          onChange={(e, newValue) => setGraphTabs(newValue)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#000000",
              color: "#000000",
            },
          }}
          className={`${Styles.tabs} my-2 `}
        >
          <Tab
            label={<span style={{ color: "black" }}>Assesment-1</span>}
            index={0}
          />
          <Tab
            label={<span style={{ color: "black" }}>Assesment-2</span>}
            index={1}
          />
          <Tab
            label={<span style={{ color: "black" }}>End Semester</span>}
            index={2}
          />
          <Tab
            label={<span style={{ color: "black" }}>Overall</span>}
            index={3}
          />
        </Tabs>
        <div className="row">
          <TabPanel value={graphTabs} index={0}>
            <Tabs
              value={gtabs}
              onChange={(e, newValue) => setGtabs(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#000000",
                  color: "#000000",
                },
              }}
            >
              <Tab
                label={<span style={{ color: "black" }}>Histogram</span>}
                index={0}
              />
              <Tab
                label={<span style={{ color: "black" }}>Bar Chart</span>}
                index={1}
              />
            </Tabs>
            <TabPanel value={gtabs} index={0}>
              <div className={`${Styles.graph} `}>
                {asses1Table.length != 0 && (
                  <MarkHistogram data={assesment1Data} />
                )}
              </div>

              {asses1Table.length == 0 && <div>Marks not published yet</div>}
            </TabPanel>
            <TabPanel value={gtabs} index={1}>
              <div className={`${Styles.graph} `}>
                {asses1Table.length != 0 ? (
                  <BarChart
                    data={assesment1Data}
                    options={{
                      title: "Assesment-1 Marks Distribution",
                      vAxis: {
                        title: "Marks",
                        minValue: 0,
                        maxValue: 100,
                      },
                    }}
                  />
                ) : (
                  <div>Marks not published yet</div>
                )}
              </div>
            </TabPanel>
          </TabPanel>
          <TabPanel value={graphTabs} index={1}>
            <Tabs
              value={gtabs}
              onChange={(e, newValue) => setGtabs(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#000000",
                  color: "#000000",
                },
              }}
            >
              <Tab
                label={<span style={{ color: "black" }}>Histogram</span>}
                index={0}
              />
              <Tab
                label={<span style={{ color: "black" }}>Bar Chart</span>}
                index={1}
              />
            </Tabs>
            <TabPanel value={gtabs} index={0}>
              <div className={`${Styles.graph} `}>
                {asses2Table.length != 0 && (
                  <MarkHistogram data={assesment2Data} />
                )}

                {asses2Table.length == 0 && <div>Marks not published yet</div>}
              </div>
            </TabPanel>
            <TabPanel value={gtabs} index={1}>
              <div className={`${Styles.graph} `}>
                {asses2Table.length != 0 ? (
                  <BarChart
                    data={assesment2Data}
                    options={{
                      title: "Assesment-2 Marks Distribution",
                      vAxis: {
                        title: "Marks",
                        minValue: 0,
                        maxValue: 100,
                      },
                    }}
                  />
                ) : (
                  <div>Marks not published yet</div>
                )}
              </div>
            </TabPanel>
          </TabPanel>

          <TabPanel value={graphTabs} index={2}>
            <Tabs
              value={gtabs}
              onChange={(e, newValue) => setGtabs(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#000000",
                  color: "#000000",
                },
              }}
            >
              <Tab
                label={<span style={{ color: "black" }}>Histogram</span>}
                index={0}
              />
              <Tab
                label={<span style={{ color: "black" }}>Bar Chart</span>}
                index={1}
              />
            </Tabs>
            <TabPanel value={gtabs} index={0}>
              <div className={`${Styles.graph} `}>
                {endTable.length != 0 && (
                  <MarkHistogram data={endsemesterData} />
                )}
                {endTable.length == 0 && <div>Marks not published yet</div>}
              </div>
            </TabPanel>
            <TabPanel value={gtabs} index={1}>
              <div className={`${Styles.graph} `}>
                {endTable.length != 0 ? (
                  <BarChart
                    data={endsemesterData}
                    options={{
                      title: "End Semester Marks Distribution",
                      vAxis: {
                        title: "Marks",
                        minValue: 0,
                        maxValue: 100,
                      },
                    }}
                  />
                ) : (
                  <div>Marks not published yet</div>
                )}
              </div>
            </TabPanel>
          </TabPanel>
          <TabPanel value={graphTabs} index={3}>
            <Tabs
              value={gtabs}
              onChange={(e, newValue) => setGtabs(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#000000",
                  color: "#000000",
                },
              }}
            >
              <Tab
                label={<span style={{ color: "black" }}>PieChart</span>}
                index={0}
              />
              <Tab
                label={<span style={{ color: "black" }}>Bar Chart</span>}
                index={1}
              />
              <Tab
                label={<span style={{ color: "black" }}>Histogram</span>}
                index={2}
              />
            </Tabs>
            <TabPanel value={gtabs} index={0}>
              {(asses1Table.length == 0 ||
                asses2Table.length == 0 ||
                endTable.length == 0) && <div>Marks not published yet</div>}
              {asses1Table.length != 0 &&
                asses2Table.length != 0 &&
                endTable.length != 0 && (
                  <PieChart
                    data={pieChartData}
                    options={{
                      title: "Pass Percentage",
                    }}
                  />
                )}
            </TabPanel>
            <TabPanel value={gtabs} index={1}>
              {(asses1Table.length == 0 ||
                asses2Table.length == 0 ||
                endTable.length == 0) && <div>Marks not published yet</div>}
              {asses1Table.length != 0 &&
                asses2Table.length != 0 &&
                endTable.length != 0 && (
                  <div className={`${Styles.graph} `}>
                    <BarChart
                      data={combinedData}
                      options={{
                        title: "Overall Marks Distribution",
                        vAxis: {
                          title: "Marks",
                          minValue: 0,
                          maxValue: 100,
                        },
                      }}
                    />
                  </div>
                )}
            </TabPanel>
            <TabPanel value={gtabs} index={2}>
              {(asses1Table.length == 0 ||
                asses2Table.length == 0 ||
                endTable.length == 0) && <div>Marks not published yet</div>}
              {asses1Table.length != 0 &&
                asses2Table.length != 0 &&
                endTable.length != 0 && (
                  <div className={`${Styles.graph} `}>
                    <MarkHistogram
                      data={overallChart}
                      options={{
                        title: "Overall Marks Distribution",
                        vAxis: {
                          title: "Marks",
                          minValue: 0,
                          maxValue: 100,
                        },
                      }}
                    />
                  </div>
                )}
            </TabPanel>
          </TabPanel>
        </div>
      </TabPanel>
    </div>
  );
};

export default SubjectMarkAnalytics;
