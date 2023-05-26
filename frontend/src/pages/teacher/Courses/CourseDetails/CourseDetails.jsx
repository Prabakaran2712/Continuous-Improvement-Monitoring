import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Store } from "react-notifications-component";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Input from "../../../../components/forms/Input/Input";
import Select from "../../../../components/forms/Select/Select";
import Header from "../../../../components/Page/Header/Header";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import axios from "axios";
import SubjectData from "../../../../components/SubjectData/SubjectData";
import Loading from "../../../../components/Loading/Loading";
import DeleteButton from "../../../../components/Button/DeleteButton/DeleteButton";
import UpdateButton from "../../../../components/Button/UpdateButton/UpdateButton";
import Styles from "./CourseDetails.module.css";
import Table from "../../../../components/Table/Table";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import DashboardCard from "../../../../components/Dashboard/DashboardCard/DashboardCard";
import CreateButton from "../../../../components/Button/CreateButton/CreateButton";
import {
  faAddressBook,
  faClock,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const CourseDetails = () => {
  const { id } = useParams();
  const { register, onSubmit } = useForm();
  const [batchStudents, setBatchStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);
  const [course, setCourse] = useState({});
  const [yourStudents, setYourStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState(0);

  const navigate = useNavigate();
  var batchstud;
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

  const notify = (option, message) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: `${message}}`,
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
        message: `${message}`,
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
  const addStudent = (student) => {
    axios
      .put(`/api/teaches/addStudent/${id}`, {
        student: student,
      })
      .then((res) => {
        setYourStudentValue(res.data.students);
        //filter out the students who are already in the yourstudents array
        setNewStudentValue(
          batchstud.filter((student) => {
            return !res.data.students.some((obj) => {
              return obj._id === student._id;
            });
          })
        );
        console.log(
          batchstud.filter((student) => {
            return !res.data.students.some((obj) => {
              return obj._id === student._id;
            });
          })
        );
      });
  };

  const removeStudent = (student) => {
    axios
      .put(`/api/teaches/removeStudent/${id}`, {
        student: student,
      })
      .then((res) => {
        setYourStudentValue(res.data.students);

        //filter out the students who are already in the yourstudents array
        setNewStudentValue(
          batchstud.filter((student) => {
            return !res.data.students.some((obj) => {
              return obj._id === student._id;
            });
          })
        );
        console.log(batchstud);
        console.log(res.data.students);
        console.log(
          batchStudents.filter((student) => {
            return !res.data.students.some((obj) => {
              return obj._id === student._id;
            });
          })
        );
      });
  };
  useEffect(() => {
    axios
      .get(`/api/teaches/${id}`)
      .then((res) => {
        setCourse(res.data);

        //filling the data of course

        axios
          .get(`/api/students/batch/${res.data.batch._id}`)
          .then((batchstudents) => {
            //filter out the students who are already in the yourstudents array
            setBatchStudents(batchstudents.data);
            batchstud = batchstudents.data;
            setNewStudentValue(
              batchstudents.data.filter((student) => {
                return !res.data.students.some((obj) => {
                  return obj._id === student._id;
                });
              })
            );
            setYourStudentValue(res.data.students);

            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const setNewStudentValue = (data) => {
    var temp = [];
    data.map((x, index) => {
      temp[index] = [
        x.name,
        x.roll_number,

        <CreateButton
          onClick={() => {
            addStudent(x);
          }}
        />,
        () => {},
      ];
    });
    setNewStudents(temp);
  };
  const setYourStudentValue = (data) => {
    var temp = [];
    data.map((x, index) => {
      temp[index] = [
        x.name,
        x.roll_number,
        <DeleteButton
          onClick={() => {
            removeStudent(x);
          }}
        />,
        () => {},
      ];
    });
    setYourStudents(temp);
  };
  const save = () => {
    //get stduent id and present from students
    var data = students.map((x) => {
      return {
        student: x._id,
        class: id,
        present: x.present,
      };
    });
    axios
      .post("/api/attendances/add", data)
      .then((res) => {
        notify("success");
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };

  if (loading) return <Loading />;
  const buttons = [<UpdateButton />, <DeleteButton />];

  return (
    <Container>
      <Header title="Course Details" buttons={buttons} />
      <div className="body my-3 my-lg-5 ">
        <SubjectData courseData={course} />
      </div>
      <div className={`${Styles.body} my-3 mx-lg-5`}>
        <div className={`${Styles.studentList}`}>
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
            <Tab
              label={<span style={{ color: "black" }}>Your Students</span>}
              index={0}
            />
            <Tab
              label={<span style={{ color: "black" }}>New Students</span>}
              index={1}
            />
          </Tabs>
          <TabPanel value={tabs} index={0}>
            <Table
              thead={["#", "Name", "Roll Number", ""]}
              tbody={yourStudents}
            />
          </TabPanel>
          <TabPanel value={tabs} index={1}>
            <Table
              thead={["#", "Name", "Roll Number", ""]}
              tbody={newStudents}
            />
          </TabPanel>
        </div>
        <div className="options">
          <div className={`mb-4 mx-lg-5`}>
            <Title title="More Options" size={"md"} />
          </div>
          <div className={`${Styles.options} `}>
            <div
              className={`${Styles.option}`}
              onClick={() => {
                navigate(`/teacher/attendance/subject/${course._id}`);
              }}
            >
              <DashboardCard title="Attendance" color={"red"} />
            </div>
            <div
              className={`${Styles.option}`}
              onClick={() => {
                navigate(`/teacher/class/subject/${course._id}`);
              }}
            >
              <DashboardCard title="Classes" color={"yellow"} />
            </div>
            <div
              className={`${Styles.option}`}
              onClick={() => {
                navigate(`/teacher/marks/subject/${course._id}`);
              }}
            >
              <DashboardCard title="Marks" />
            </div>
            <div
              className={`${Styles.option}`}
              onClick={() => {
                navigate(`/teacher/grades/${course._id}`);
              }}
            >
              <DashboardCard title="Grades" color={"green"} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CourseDetails;
