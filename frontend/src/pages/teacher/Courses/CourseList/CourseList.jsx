import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Container from "../../../../components/Container/Container";
import DeleteButton from "../../../../components/DeleteButton";
import ViewButton from "../../../../components/Button/ViewButton/ViewButton";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Loading from "../../../../components/Loading/Loading";
import Table from "../../../../components/Table/Table";
import CreateButton from "../../../../components/Button/CreateButton/CreateButton";
import Styles from "./CourseList.module.css";

const CourseList = () => {
  const auth = useAuthContext();
  const user = auth.user._id;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/teaches/staff/${user}`).then((res) => {
      console.log(res.data);
      setUserData(res.data);
      setLoading(false);
    });
  }, []);
  const view = (id) => {
    navigate(`/teacher/courses/view/${id}`);
  };
  if (loading) return <Loading />;

  return (
    <Container>
      <div className="header d-flex flex-row justify-content-between my-lg-3 mt-sm-1">
        <h1 className="display-6">Courses</h1>
        <CreateButton onClick={() => navigate("/teacher/courses/add")} />
      </div>
      <div className="row   table-responsive text-center">
        <Table
          thead={[
            "#",
            "Course Name",
            "Subject Code",
            "Department",
            "Batch",
            "Delete",
            "View",
            "Grades",
          ]}
          tbody={
            userData &&
            userData.map((data, indx) => {
              return [
                data.course.name,
                data.course.subject_code,
                data.course.department.dept_name,
                data.batch.start_year + " - " + data.batch.end_year,
                <DeleteButton />,
                <ViewButton id={data._id} view={view} />,
                <button
                  onClick={() => {
                    navigate(`/teacher/grades/${data._id}`);
                  }}
                >
                  Grades
                </button>,
                () => {
                  console.log("clicked");
                },
              ];
            })
          }
        />
      </div>
    </Container>
  );
};

export default CourseList;
