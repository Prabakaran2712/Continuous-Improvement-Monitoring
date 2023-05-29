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
import Select from "../../../../components/Select/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CourseList = () => {
  const auth = useAuthContext();
  const user = auth.user._id;
  const [loading, setLoading] = useState(true);
  const [batchfilter, setBatchFilter] = useState("All");
  const [coursefilter, setCourseFilter] = useState("All");
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();

  const filter = (course, batch) => {
    //common filter function for both filters
    if (course === "All" && batch === "All") {
      setData(classData);
    } else if (course === "All") {
      var temp = classData.filter((x) => {
        if (x[3] === batch) {
          return true;
        }
      });

      setData(temp);
    } else if (batch == "All") {
      var temp = classData.filter((x) => {
        if (x[0] === course) {
          return true;
        }
      });

      setData(temp);
    } else {
      var temp = classData.filter((x) => {
        if (x[0] === course && x[4] == batch) {
          return true;
        }
      });

      setData(temp);
    }
  };
  const setDataValue = (data) => {
    var temp = [];
    console.log(data);
    data.map((classData, index) => {
      temp[index] = [
        classData.course.name,
        classData.course.subject_code,
        classData.course.department.dept_name,
        classData.batch.start_year + "-" + classData.batch.end_year,
        <FontAwesomeIcon icon={faArrowRight} />,
        () => {
          navigate(`/teacher/courses/${classData._id}`);
        },
      ];
    });
    console.log(temp);
    setClassData(temp);
    setData(temp);
  };
  useEffect(() => {
    axios.get(`/api/teaches/staff/${user}`).then((res) => {
      console.log(res.data);
      var temp = [];
      var temp2 = [];
      res.data.map((x) => {
        temp.push(x.course.name);
        temp2.push(x.batch.start_year + "-" + x.batch.end_year);
      });

      setCourses([...new Set(temp)]);
      setBatches([...new Set(temp2)]);
      setDataValue(res.data);
      setLoading(false);
    });
  }, []);
  const view = (id) => {
    navigate(`/teacher/courses/view/${id}`);
  };
  if (loading) return <Loading />;

  return (
    <div className="m-2">
      <div className="header d-flex flex-row justify-content-between ">
        <div className="title ">
          <Title title="Your Courses" />
        </div>
        <div className="options d-flex flex-row justify-content-end   ">
          <CreateButton onClick={() => navigate("/teacher/courses/add")} />
        </div>
      </div>
      <div className={`${Styles.body}`}>
        <div className={`${Styles.table}`}>
          <Table
            thead={[
              "#",
              "Course Name",
              "Subject Code",
              "Department",
              "Batch",
              " ",
            ]}
            tbody={data}
          />
        </div>
        <div className={`${Styles.optionPane}`}>
          <div className={`${Styles.option}`}>
            <Select
              label="Course Name"
              options={["All", ...courses]}
              values={["All", ...courses]}
              onChange={(e) => {
                setCourseFilter(e.target.value);
                filter(e.target.value, batchfilter);
              }}
            />
          </div>
          <div className={`${Styles.option}`}>
            <Select
              label="Batch"
              options={["All", ...batches]}
              values={["All", ...batches]}
              onChange={(e) => {
                setBatchFilter(e.target.value);
                filter(coursefilter, e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
