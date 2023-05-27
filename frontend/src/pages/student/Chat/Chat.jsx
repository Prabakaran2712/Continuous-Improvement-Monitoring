import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../../components/Loading/Loading";
import Styles from "./Chat.module.css";
import SendButton from "../../../components/Chat/SendButton/SendButton";
import TextBox from "../../../components/TextBox/TextBox";
import Message from "../../../components/Chat/Message/Message";
import ChatHeader from "../../../components/Chat/ChatHeader/ChatHeader";
const Chat = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [chatDetails, setChatDetails] = useState({});
  const [sendLoading, setSendLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [btnloading, setBtnLoading] = useState(false);
  const auth = useAuthContext();
  const closeDiscussion = (id) => {
    axios
      .put(`/api/discussions/close/${id}`, {
        isClosed: true,
      })
      .then((res) => {
        console.log(res.data);
        setChatDetails({ ...chatDetails, isClosed: true });
      })
      .catch((err) => {
        console.log(err);
        setBtnLoading(false);
      });
  };
  const sendMessage = () => {
    axios
      .post("/api/messages", {
        discussion: id,
        sender: auth.user._id,
        message: message,
      })
      .then((res) => {
        res.data.yourMessage = true;
        setMessages([...messages, res.data]);
        setMessage("");
        setSendLoading(false);
      })
      .catch((err) => {
        setSendLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`/api/messages/${id}`)
      .then((res) => {
        //add extra field yourmessage  to each message
        res.data.forEach((message) => {
          message.yourMessage = message.sender === auth.user._id;
        });
        setMessages(res.data);
        console.log(res.data);
        //get  chat details
        axios
          .get(`/api/discussions/${id}`)
          .then((res) => {
            console.log(res.data);
            setChatDetails(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
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
    <div className={`${Styles.chat} `}>
      <div className={` ${Styles.chatHeader} row `}>
        <ChatHeader
          data={chatDetails}
          role={auth.userType}
          onClick={() => {
            closeDiscussion(id);
            console.log("close");
          }}
          isClosed={chatDetails.isClosed}
        />
      </div>
      <div className={` ${Styles.chatContainer} row `}>
        <div className={` ${Styles.chatHeader} row d-flex flex-column `}>
          Messages
        </div>
        <div className={` ${Styles.chatBody} row d-flex flex-column `}>
          {messages.map((message) => {
            return (
              <div
                className={
                  message.yourMessage
                    ? `d-flex flex-row justify-content-end align-items-center`
                    : `d-flex flex-row justify-content-start align-items-center`
                }
                key={Math.random()}
              >
                <Message
                  message={message.message}
                  yourMessage={message.yourMessage}
                  createdAt={message.createdAt}
                  you={auth.user.name}
                  other={
                    auth.userType === "student"
                      ? chatDetails.teaches.teacher.name
                      : chatDetails.student.name
                  }
                />
              </div>
            );
          })}
        </div>
        {!chatDetails.isClosed && (
          <div className={`${Styles.options} row`}>
            <div className="textBox col-md-11 col-10 ">
              <TextBox message={message} setMessage={setMessage} />
            </div>
            <div className="sendButton col-md-1 col-2">
              <SendButton
                loading={sendLoading}
                onClick={() => {
                  setSendLoading(true);
                  sendMessage();
                  setMessage("");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
