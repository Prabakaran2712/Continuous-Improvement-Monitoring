import { useNavigate } from "react-router-dom";
import Container from "../../../../components/Container/Container";
import Button from "../../../../components/forms/Button/Button";
import Title from "../../../../components/forms/Title/Title";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import CreateButton from "../../../../components/Button/CreateButton/CreateButton";
import Table from "../../../../components/Table/Table";
import Loading from "../../../../components/Loading/Loading";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./ViewClass.module.css";
import Select from "../../../../components/Select/Select";
import { set } from "mongoose";

const ViewClass = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState([]);
  const [batchfilter, setBatchFilter] = useState("All");
  const [coursefilter, setCourseFilter] = useState("All");
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const user = auth.user._id;

  const filter = (course, batch) => {
    //common filter function for both filters
    if (course === "All" && batch === "All") {
      setData(classData);
    } else if (course === "All") {
      var temp = classData.filter((x) => {
        if (x[4] === batch) {
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
        classData.teaches.course.name,
        classData.topic,
        moment(classData.date).format("DD-MM-YYYY"),
        classData.time,
        classData.teaches.batch.start_year +
          "-" +
          classData.teaches.batch.end_year,
        <FontAwesomeIcon icon={faArrowRight} />,
        () => {
          navigate(`/teacher/class/${classData._id}`);
        },
      ];
    });
    console.log(temp);
    setClassData(temp);
    setData(temp);
  };

  useEffect(() => {
    axios
      .get(`/api/classes/teacher/${user}`)
      .then((res) => {
        setDataValue(res.data);
        var temp = [];
        res.data.map((classData) => {
          temp.push(
            classData.teaches.batch.start_year +
              "-" +
              classData.teaches.batch.end_year
          );
        });
        setBatches([...new Set(temp)]);

        var temp = [];
        res.data.map((classData) => {
          temp.push(classData.teaches.course.name);
        });
        setCourses([...new Set(temp)]);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="m-2">
      <div className="header d-flex flex-row justify-content-between">
        <div className="title">
          <Title title="Your Classes" />
        </div>
        <div className="options d-flex flex-row justify-content-end m-lg-2">
          <CreateButton
            onClick={() => {
              navigate("/teacher/class/create");
            }}
          />
        </div>
      </div>
      <div className={`${Styles.body}`}>
        <div className={`${Styles.table}`}>
          <Table
            thead={["#", "Course Name", "Topic", "Date", "Time", "Batch", ""]}
            tbody={data}
          />
        </div>
        <div className={`${Styles.optionPane}`}>
          <div className={`${Styles.examOption}`}>
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
          <div className={`${Styles.batchOption}`}>
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

export default ViewClass;
