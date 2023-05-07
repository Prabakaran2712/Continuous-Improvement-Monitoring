import { useAuthContext } from "../../../hooks/useAuthContext";
import StudentChatCreate from "./StudentChatCreate/StudentChatCreate";
import TeacherChatCreate from "./TeacherChatCreate/TeacherChatCreate";
const CreateChat = () => {
  const auth = useAuthContext();
  if (auth.userType === "student") {
    return <StudentChatCreate />;
  } else return <TeacherChatCreate />;
};

export default CreateChat;
