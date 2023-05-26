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

const ViewStudentCourses = () => {
  const [courses, setCourses] = useState([]);
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
    <Container>
      <Header title="Courses" />
      <div className="body my-4 mx-5 ">
        <Table
          thead={["#", "Subject Name", "Subject Code", "Semester", "Faculty"]}
          tbody={Data}
        />
      </div>
    </Container>
  );
};

export default ViewStudentCourses;
