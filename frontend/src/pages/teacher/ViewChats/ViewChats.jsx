import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const ViewChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuthContext();
  useEffect(() => {
    axios.get(`/api/chats/teacher/${auth.user._id}`).then((res) => {
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
      <h1>View Chats</h1>
      <div className="chatsContainer">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Subject</th>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => (
              <tr
                key={chat._id}
                onClick={() => {
                  navigate(`/teacher/chat/${chat._id}`);
                }}
              >
                <td>{chat.student.name}</td>
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

export default ViewChats;
