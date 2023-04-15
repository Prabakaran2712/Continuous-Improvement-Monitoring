import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Button from "../../../../components/forms/Button/Button";
import { useEffect } from "react";
const ViewExam = () => {
  return (
    <Container>
      <div className="header">
        <Title title="Exams" />
        <div className="options d-flex flex-row justify-content-end m-2">
          <Button
            type="success"
            onClick={() => {
              console.log("click");
            }}
            name="Create Exam"
          />
        </div>
      </div>
      <div className="body"></div>
    </Container>
  );
};

export default ViewExam;
