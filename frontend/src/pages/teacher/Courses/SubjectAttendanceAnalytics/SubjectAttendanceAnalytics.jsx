import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import MarkHistogram from "../../../../components/Graphs/MarkHistogram";
import SubjectData from "../../../../components/SubjectData/SubjectData";
import PieChart from "../../../../components/Graphs/PieChart";
import Header from "../../../../components/Page/Header/Header";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Loading from "../../../../components/Loading/Loading";

const SubjectAttendanceAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [markData, setMarkData] = useState(null);
  const [assesment1Data, setAssesment1Data] = useState([]);
  const [assesment2Data, setAssesment2Data] = useState([]);
  const [endsemesterData, setEndsemesterData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [tabs, setTabs] = useState(0);

  //get value from url
  const { id, sid } = useParams();

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
          setMarkData(res.data);

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
      >
        <Tab label={<span style={{ color: "black" }}>Table</span>} index={0} />
        <Tab label={<span style={{ color: "black" }}>Graphs</span>} index={1} />
      </Tabs>
      <TabPanel value={tabs} index={0}>
        Attendance
      </TabPanel>
      <TabPanel value={tabs} index={1}>
        <SubjectData courseData={courseData} />
        <div className="row">
          <div className="col-6">
            <h1>Assesment-1</h1>
            <MarkHistogram data={assesment1Data} />
          </div>
          <div className="col-6">
            <h1>Assesment-2</h1>
            <MarkHistogram data={assesment2Data} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h1>End Semester</h1>
            <MarkHistogram data={endsemesterData} />
          </div>
          <div className="col-6">
            <h1>Overall</h1>
            <PieChart
              data={pieChartData}
              options={{
                title: "Pass Percentage",
              }}
            />
          </div>
        </div>
      </TabPanel>
    </Container>
  );
};

export default SubjectAttendanceAnalytics;
