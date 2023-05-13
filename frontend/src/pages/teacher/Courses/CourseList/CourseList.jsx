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
import {
  faEye,
  faPen,
  faPerson,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../../components/Button/IconButton/IconButton";
import Title from "../../../../components/forms/Title/Title";

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
        <Title title="Your Classes" />
        <CreateButton onClick={() => navigate("/teacher/courses/add")} />
      </div>
      <div className="row   table-responsive text-center">
        <Table
          thead={["#", "Course Name", "Subject Code", "Department", "Batch"]}
          tbody={
            userData &&
            userData.map((data, indx) => {
              return [
                data.course.name,
                data.course.subject_code,
                data.course.department.dept_name,
                data.batch.start_year + " - " + data.batch.end_year,
                ,
                // <IconButton icon={faTrash} />,
                // <IconButton
                //   icon={faEye}
                //   onClick={() => {
                //     navigate(`/teacher/courses/view/${data._id}`);
                //   }}
                // />,
                // <IconButton
                //   icon={faPen}
                //   onClick={() => {
                //     navigate(`/teacher/grades/${data._id}`);
                //   }}
                // />,
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
