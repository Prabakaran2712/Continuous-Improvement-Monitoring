import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Store } from "react-notifications-component";
import { useForm } from "react-hook-form";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";

import { Switch } from "@mui/material";
import Select from "../../../components/forms/Select/Select";
import SubjectData from "../../../components/SubjectData/SubjectData";
import Loading from "../../../components/Loading/Loading";
import Header from "../../../components/Page/Header/Header";
import Table from "../../../components/Table/Table";
import Styles from "./Grade.module.css";

const ExamDetails = () => {
  const [courseData, setCourseData] = useState();
  const [students, setStudents] = useState([]);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [publish, setPublish] = useState(false);

  const setDataValues = (data) => {
    var temp = [];
    data.forEach((x) => {
      temp.push([
        x.student.name,
        x.student.roll_number,
        <select
          className="form-control"
          value={x.grade}
          onChange={(event) => {
            //update a value in the array and then set the array
            var temp = [...students];
            temp[indx].grade = event.target.value;
            setStudents(temp);
            console.log(temp[indx]);
          }}
        >
          <option value="O">O</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="RA">RA</option>
          <option value="NA">NA</option>
        </select>,
        () => {},
      ]);
    });
    setData(temp);
  };

  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: ` Grade has been updated successfully`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: "Error!",
        message: `Error while updating Grade`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true,
        },
      });
    }
  };

  useEffect(() => {
    //set default values to form fields
    axios
      .get(`/api/teaches/${id}`)
      .then((res) => {
        setCourseData(res.data);
        setPublish(res.data.isPublished);
        //get grade for teaches
        axios.get(`/api/grades/teaches/${id}`).then((res) => {
          console.log(res.data);
          setStudents(res.data);

          setDataValues(res.data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const save = () => {
    var data = students.map((x) => {
      return {
        student: x.student._id,
        teaches: id,
        grade: x.grade,
        published: x.published,
      };
    });

    axios
      .post("/api/grades/grades", data)
      .then((res) => {
        notify("success");
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="header mx-lg-3">
        <Header title={courseData.course.name} />
      </div>
      <div className={`${Styles.body}`}>
        <div className={`${Styles.table}`}>
          <Table
            thead={["#", "Name", "Roll Number", "Grade"]}
            tbody={data}
            tooltip={false}
            hover={false}
          />
        </div>

        <div className={`mx-auto text-center ${Styles.submitOptions}`}>
          <button type="button" className="btn btn-outline-dark" onClick={save}>
            Save
          </button>
          <div className={`${Styles.publish}`}>
            <label className="me-2">Publish</label>
            <Switch
              color="warning"
              checked={publish}
              onChange={(event) => {
                //update a value in the array and then set the array
                var temp = [...students];
                temp[indx].published = event.target.checked;

                setStudents(temp);
              }}
              width={100}
              height={50}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ExamDetails;
