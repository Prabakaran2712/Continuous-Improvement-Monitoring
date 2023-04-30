import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import MarkHistogram from "../../../components/Graphs/MarkHistogram";
import SubjectData from "../../../components/SubjectData/SubjectData";
import PieChart from "../../../components/Graphs/PieChart";

const SubjectMarkAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [markData, setMarkData] = useState(null);
  const [assesment1Data, setAssesment1Data] = useState([]);
  const [assesment2Data, setAssesment2Data] = useState([]);
  const [endsemesterData, setEndsemesterData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  //get value from url
  const { id, sid } = useParams();
  useEffect(() => {
    //get course details with id
    axios
      .get(`/api/teaches/${id}`)
      .then((res) => {
        setCourseData(res.data.course);
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
          setAssesment1Data(assesment1);

          //assesment 2 in data format for all students
          var assesment2 = [["Name", "Marks"]];

          res.data.filter((mark) => {
            if (mark.exam.exam_type === "Assessment-2")
              assesment2.push([mark.student.name, mark.mark]);
          });
          setAssesment2Data(assesment2);

          //end semester in data format for all students
          var endsemester = [["Name", "Marks"]];
          res.data.filter((mark) => {
            if (mark.exam.exam_type === "End-Semester")
              endsemester.push([mark.student.name, mark.mark]);
          });
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
  if (loading)
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );

  return (
    <Container>
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
    </Container>
  );
};

export default SubjectMarkAnalytics;
