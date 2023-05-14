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
import Select from "../../../../components/Select/Select";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Styles from "./SubjectClasses.module.css";
import { useParams } from "react-router";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Calendar from "../../../../components/Calendar/Calendar";
import { set } from "mongoose";

const SubjectClasses = () => {
  const [data, setData] = useState();
  const [cdata, setCData] = useState();
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [value, setValue] = useState(new Date());
  const [tabs, setTabs] = useState(0);
  const user = auth.user._id;
  const [classDays, setClassDays] = useState([1, 2]);
  const { id } = useParams();

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

  const filter = (searchTerm) => {
    console.log(searchTerm);
    if (searchTerm === "") {
      setData(classData);
    } else {
      const newData = classData.filter((value) => {
        return (
          value[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
          value[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
          value[2].toLowerCase().includes(searchTerm.toLowerCase()) ||
          value[3].toLowerCase().includes(searchTerm.toLowerCase()) ||
          value[4].toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setData(newData);
    }
  };

  const setDataValue = (data) => {
    var temp = [];
    console.log(data);
    data.map((classData, index) => {
      temp[index] = [
        classData.topic,
        moment(classData.date).format("DD-MM-YYYY"),
        classData.time,

        <FontAwesomeIcon icon={faArrowRight} />,
        () => {
          navigate(`/teacher/class/${classData._id}`);
        },
      ];
    });
    setClassData(temp);
    setData(temp);
    const today = new Date();
    temp = temp.filter((value) => {
      const momentObj = moment(value[1], "DD-MM-YYYY");
      const date = momentObj.toDate();

      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return value;
      }
    });
    console.log(temp);
    setCData(temp);
  };

  useEffect(() => {
    axios
      .get(`/api/classes/teacher/${user}`)
      .then((res) => {
        //filter classes with teaches id
        res.data = res.data.filter((value) => {
          if (value.teaches._id === id) {
            setSubjectTitle(value.teaches.course.name);
          }
          return value.teaches._id === id;
        });

        //set class days
        const temp = [];

        res.data.forEach((x) => {
          //find days in the current month
          const date = new Date(x.date);
          if (
            date.getMonth() === value.getMonth() &&
            date.getFullYear() === value.getFullYear()
          ) {
            temp.push(date);
          }
        });
        setClassDays(temp);

        console.log(classDays);
        setDataValue(res.data);
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
    <Container>
      <div className="header d-flex flex-row justify-content-between mt-lg-3 mt-sm-1 mx-lg-5">
        <div className="title">
          <Title title={`Your Classes`} />
        </div>
        <div className="options d-flex flex-row justify-content-end m-lg-2">
          <CreateButton
            onClick={() => {
              navigate("/teacher/class/create");
            }}
          />
        </div>
      </div>
      <div className={`${Styles.options}`}>
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
            label={<span style={{ color: "black" }}>Table</span>}
            index={0}
          />
          <Tab
            label={<span style={{ color: "black" }}>Calendar</span>}
            index={1}
          />
        </Tabs>
      </div>

      <TabPanel value={tabs} index={0}>
        <div className={`${Styles.body}`}>
          <div className={`${Styles.table}`}>
            <Table thead={["#", "Topic", "Date", "Time", ""]} tbody={data} />
          </div>
          <div className={`${Styles.optionPane}`}>
            <div className={`${Styles.filter}`}>
              <SearchBox
                value={filterData}
                onChange={(e) => {
                  setFilterData(e.target.value);
                  filter(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={tabs} index={1}>
        <div className={`${Styles.body}`}>
          <div className={`${Styles.table}`}>
            <Table thead={["#", "Topic", "Date", "Time", ""]} tbody={cdata} />
          </div>
          <div className={`${Styles.optionPane}`}>
            <div className={`${Styles.filter}`}>
              <div className={`${Styles.calendar}`}>
                <Calendar
                  value={value}
                  presentDays={[...classDays]}
                  absentDays={[]}
                  onViewChange={(view) => {
                    console.log(view);
                  }}
                  //month change
                  onMonthChange={(monthDate) => {
                    const temp = [];
                    data.forEach((x) => {
                      const momentObj = moment(x[1], "DD-MM-YYYY");
                      const date = momentObj.toDate();
                      console.log(date);
                      if (
                        date.getMonth() === monthDate.getMonth() &&
                        date.getFullYear() === monthDate.getFullYear()
                      ) {
                        temp.push(date.getDate());
                      }
                      setValue(monthDate);
                      setClassDays(temp);
                    });
                  }}
                  onChange={(newValue) => {
                    console.log(classDays);
                    setValue(newValue);
                    const temp = [];
                    classData.forEach((x) => {
                      const momentObj = moment(x[1], "DD-MM-YYYY");
                      const date = momentObj.toDate();
                      console.log(date);
                      if (
                        date.getMonth() === newValue.getMonth() &&
                        date.getFullYear() === newValue.getFullYear()
                      ) {
                        temp.push(x);
                      }
                      setCData(temp);
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </Container>
  );
};

export default SubjectClasses;
