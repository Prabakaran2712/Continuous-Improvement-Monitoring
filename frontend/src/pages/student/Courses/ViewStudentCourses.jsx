import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";
import Header from "../../../components/Page/Header/Header";
import Select from "../../../components/Select/Select";

const ViewStudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [semester, setSemester] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Data, setData] = useState([]);
  const auth = useAuthContext();
  const navigate = useNavigate();
  const setTableData = (data) => {
    return data.map((course) => {
      return [
        course.course.name,
        course.course.subject_code,
        course.semester,
        course.teacher.name,
        () => {},
      ];
    });
  };

  useEffect(() => {
    axios
      .get(`/api/teaches/student/${auth.user._id}`)
      .then((res) => {
        setCourses(res.data);
        setData(setTableData(res.data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="mx-lg-2">
      <Header title="Courses" />
      <Select
        label="Semester"
        options={[
          "All",
          "Semester-1",
          "Semester-2",
          "Semester-3",
          "Semester-4",
          "Semester-5",
          "Semester-6",
          "Semester-7",

          "Semester-8",
        ]}
        values={["all", "1", "2", "3", "4", "5", "6", "7", "8"]}
        onChange={(e) => {
          const semester = e.target.value;
          setSemester(semester);
          if (semester == "all") {
            setData(setTableData(courses));
          } else {
            setData(
              setTableData(
                courses.filter((course) => course.semester == semester)
              )
            );
          }
        }}
        value={semester}
      />
      <div className="body my-2">
        <Table
          thead={["#", "Subject Name", "Subject Code", "Semester", "Faculty"]}
          tbody={Data}
        />
      </div>
    </div>
  );
};

export default ViewStudentCourses;
