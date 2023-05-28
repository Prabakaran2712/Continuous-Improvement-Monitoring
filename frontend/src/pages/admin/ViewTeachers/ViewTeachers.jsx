import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import Button from "../../../components/forms/Button/Button";
import Select from "../../../components/Select/Select";
import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";
import TabPanel from "../../../components/TabPanel/TabPanel";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Styles from "./ViewTeachers.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../../../components/SearchBox/SearchBox";
const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filterdTeachers, setFilterdTeachers] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  const filter = (searchTerm) => {
    console.log(searchTerm);
    if (searchTerm === "") {
      setFilterData(data);
    } else {
      const newData = data.filter((value) => {
        console.log(value);
        return (
          value[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
          value[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
          value[2].toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilterData(newData);
    }
  };
  const setDataValue = (data) => {
    var temp = [];

    data.map((student) => {
      temp.push([
        student.name,
        student.staff_id,
        student.department.dept_name,

        () => {},
      ]);
    });

    return temp;
  };

  useEffect(() => {
    var teacherarray = [];
    axios
      .get(`/api/teachers`)
      .then((res) => {
        console.log(res.data);
        //sort teachers by name
        res.data.sort((a, b) => {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          return nameA.localeCompare(nameB);
        });
        setTeachers(res.data);
        setData(setDataValue(res.data));
        setFilterData(setDataValue(res.data));

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
    <div className="mx-1">
      <div className="header  my-3">
        <div className="title my-3 mb-4">
          <Title title="Teachers" />
        </div>
        <div className="mx-auto w-50">
          <SearchBox
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              filter(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="">
        <Table
          thead={["#", "Name", "Staff Id", "Department"]}
          tbody={filterData}
        />
      </div>
    </div>
  );
};

export default ViewTeachers;
