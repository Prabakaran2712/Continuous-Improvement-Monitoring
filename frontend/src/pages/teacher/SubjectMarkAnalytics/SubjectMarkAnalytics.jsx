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

const SubjectMarkAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [markData, setMarkData] = useState(null);
  const [assesment1Data, setAssesment1Data] = useState([]);
  const [assesment2Data, setAssesment2Data] = useState([]);
  const [endsemesterData, setEndsemesterData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [tableTabs, setTableTabs] = useState(0);
  const [tabs, setTabs] = useState(0);
  const [graphTabs, setGraphTabs] = useState(0);
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  useEffect(() => {
    //get course details with id
    axios
      .get(`/api/teaches/${id}`)
      .then((res) => {
        setCourseData(res.data);
        console.log(res.data);
        setLoading(false);
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
          console.log("Assessment Data");
          console.log(setDataValue(temp["Assessment-2"]));

          setAsses1Table(setDataValue(temp["Assessment-1"]));
          setAsses2Table(setDataValue(temp["Assessment-2"]));
          setEndTable(setDataValue(temp["End-Semester"]));

          //assesment 1 in data format for all students
          var assesment1 = [["Name", "Marks"]];
          res.data.filter((mark) => {
            if (mark.exam.exam_type === "Assessment-1")
              assesment1.push([mark.student.name, mark.mark]);
          });
          console.log(" assesment1");
          console.log(assesment1);
          setAssesment1Data(assesment1);

          //assesment 2 in data format for all students
          var assesment2 = [["Name", "Marks"]];

          res.data.filter((mark) => {
            if (mark.exam.exam_type === "Assessment-2")
              assesment2.push([mark.student.name, mark.mark]);
          });
          console.log(assesment2);
          setAssesment2Data(assesment2);

          //end semester in data format for all students
          var endsemester = [["Name", "Marks"]];
          res.data.filter((mark) => {
            if (mark.exam.exam_type === "End-Semester")
              endsemester.push([mark.student.name, mark.mark]);
          });
          console.log(endsemester);
          setEndsemesterData(endsemester);

          //pie chart data
          var piechart = [["Category", "Percentage"]];
          //total marks is 25% assesment 1 + 25% assesment 2 + 50% end semester
          //find total marks of all students
          var totalMarks = [];
          for (var i = 0; i < assesment1.length; i++) {
            totalMarks.push([
              assesment1[i][0],
              0.5 * (assesment1[i][1] + assesment2[i][1] + endsemester[i][1]),
            ]);
          }
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
    <Container>
      <Header title={courseData.course.name} />
      <Tabs
        value={tabs}
        onChange={(e, newValue) => setTabs(newValue)}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#000000",
            color: "#000000",
          },
        }}
        className={`${Styles.tabs}  mx-lg-5 mx-sm-1 mt-lg-3 mt-sm-1`}
      >
        <Tab label={<span style={{ color: "black" }}>Table</span>} index={0} />
        <Tab label={<span style={{ color: "black" }}>Graphs</span>} index={1} />
      </Tabs>
      <TabPanel value={tabs} index={0}>
        <SubjectData courseData={courseData} />
        <div className={`${Styles.options} mt-lg-3 mt-sm-1 mx-lg-5`}>
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
          </Tabs>
          <TabPanel value={tableTabs} index={0}>
            <div className={`${Styles.table} `}>
              {asses1Table.length != 0 && (
                <div>
                  <Table
                    thead={["#", "Name", "Roll No", "Marks", "Percentage"]}
                    tbody={asses1Table}
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
                />
              </div>
            ) : (
              <div>Marks not published yet</div>
            )}
          </TabPanel>
        </div>
      </TabPanel>
      <TabPanel value={tabs} index={1}>
        <SubjectData courseData={courseData} />
        <Tabs
          value={graphTabs}
          onChange={(e, newValue) => setGraphTabs(newValue)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#000000",
              color: "#000000",
            },
          }}
          className={`${Styles.tabs}  mx-lg-5 mx-sm-1 mt-lg-3 mt-sm-1`}
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
            {asses1Table.length != 0 && <MarkHistogram data={assesment1Data} />}
            {asses1Table.length == 0 && <div>Marks not published yet</div>}
          </TabPanel>
          <TabPanel value={graphTabs} index={1}>
            {asses2Table.length != 0 && <MarkHistogram data={assesment2Data} />}
            {asses2Table.length == 0 && <div>Marks not published yet</div>}
          </TabPanel>

          <TabPanel value={graphTabs} index={2}>
            {endTable.length != 0 && <MarkHistogram data={endsemesterData} />}
            {endTable.length == 0 && <div>Marks not published yet</div>}
          </TabPanel>
          <TabPanel value={graphTabs} index={3}>
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
        </div>
      </TabPanel>
    </Container>
  );
};

export default SubjectMarkAnalytics;
