import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../../components/Button/CreateButton/CreateButton";
import ChatCard from "../../../components/Chat/CharCard/ChatCard";
import { Pagination } from "@mui/material";
import Select from "../../../components/Select/Select";
import Styles from "./ViewDiscussions.module.css";
import Header from "../../../components/Page/Header/Header";
import Container from "../../../components/Container/Container";

const ViewDiscussions = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currentChats, setCurrentChats] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState((page - 1) * itemsPerPage);
  const [endIndex, setEndIndex] = useState(page * itemsPerPage);
  const [teaches, setTeaches] = useState([]);

  const navigate = useNavigate();
  const auth = useAuthContext();

  const handlePageChange = (e, value) => {
    console.log(value);
    setPage(value);
    setStartIndex((value - 1) * itemsPerPage);
    setEndIndex(value * itemsPerPage);
    setCurrentChats(
      chats.slice((value - 1) * itemsPerPage, value * itemsPerPage)
    );
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(e.target.value);
    setStartIndex((page - 1) * e.target.value);
    setEndIndex(page * e.target.value);
    setCurrentChats(
      chats.slice((page - 1) * e.target.value, page * e.target.value)
    );
  };

  useEffect(() => {
    axios.get(`/api/discussions/student/${auth.user._id}`).then((res) => {
      console.log(res.data);

      setChats(res.data);
      //get unique teaches
      let teaches = [];
      res.data.forEach((chat) => {
        if (!teaches.includes(chat.teaches._id)) {
          teaches.push(chat.teaches._id);
        }
      });
      setTeaches(teaches);

      setCurrentChats(res.data.slice(startIndex, endIndex));
      setStartIndex((page - 1) * itemsPerPage);
      setEndIndex(page * itemsPerPage);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="mx-2">
      <div className="header">
        <Header
          title="Discussions"
          buttons={[
            <CreateButton
              onClick={() => {
                navigate(`/student/discussions/create`);
              }}
            />,
          ]}
        />
        <div className="filter">
          <Select
            label="Status"
            options={["All", "Closed", "Open"]}
            values={["All", "Closed", "Open"]}
            onChange={(e) => {
              if (e.target.value === "All") {
                setCurrentChats(chats);
              } else if (e.target.value === "Closed") {
                setCurrentChats(chats.filter((chat) => chat.isClosed === true));
              } else if (e.target.value === "Open") {
                setCurrentChats(
                  chats.filter((chat) => chat.isClosed === false)
                );
              }
            }}
          />
        </div>
      </div>
      <div className={`${Styles.chatContainer}`}>
        {currentChats.map((chat, indx) => (
          <div key={Math.random()}>
            <ChatCard
              title={chat.title}
              recipient={chat.teaches.teacher.name}
              course={chat.teaches.course.name}
              onClick={() => {
                navigate(`/student/discussions/${chat._id}`);
              }}
              rollNumber={chat.teaches.teacher.staff_id}
            />
          </div>
        ))}
      </div>
      <div className={`${Styles.pagination} mx-auto`}>
        <div className={`${Styles.options}`}>
          <Select
            options={[5, 10, 20]}
            values={[5, 10, 20]}
            onChange={handleItemsPerPage}
          />
        </div>
        <div className={`${Styles.pageOptions}`}>
          <Pagination
            count={Math.ceil(chats.length / itemsPerPage)}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default ViewDiscussions;
