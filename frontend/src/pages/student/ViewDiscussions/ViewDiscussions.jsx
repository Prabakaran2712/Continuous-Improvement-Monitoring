import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../../components/Button/CreateButton/CreateButton";

const ViewDiscussions = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuthContext();
  const createChat = (auth) => {
    console.log(auth.userType);
    if (auth.userType == "student") {
      navigate("/student/chat/create");
    } else {
      navigate("/teacher/chat/create");
    }
  };
  useEffect(() => {
    axios.get(`/api/discussions/student/${auth.user._id}`).then((res) => {
      console.log(res.data);
      setChats(res.data);
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
    <div>
      <div className="header d-flex flex-row justify-content-between my-3">
        <h1>View Chats</h1>

        <CreateButton
          onClick={() => {
            createChat(auth);
          }}
        />
      </div>
      <div className="chatsContainer">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Teacher</th>
              <th scope="col">Subject</th>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => (
              <tr
                key={chat._id}
                onClick={() => {
                  navigate(`/student/chat/${chat._id}`);
                }}
              >
                <td>{chat.teaches.teacher.name}</td>
                <td>{chat.teaches.course.name}</td>
                <td>{chat.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDiscussions;
