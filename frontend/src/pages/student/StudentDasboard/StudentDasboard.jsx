import { useEffect } from "react";
import Container from "../../../components/Container/Container";

const StudentDasboard = () => {
  useEffect(() => {
    console.log("dashboard");
  });
  return (
    <Container>
      <div className="display-6">Dashboard</div>
    </Container>
  );
};

export default StudentDasboard;
