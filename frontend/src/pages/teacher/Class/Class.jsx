import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Button from "../../../components/forms/Button/Button";
import Title from "../../../components/forms/Title/Title";
import { useEffect } from "react";

const Class = () => {
  const navigate = useNavigate();

  const user = "641e9b56a732849ef7efd5a8";
  useEffect(() => {});

  return (
    <Container>
      <div className="header">
        <Title title="Class" />
        <div className="option-pane d-flex flex-row justify-content-end">
          <Button
            name="Create"
            type="success"
            onClick={() => {
              navigate("/teacher/class/create");
            }}
          />
        </div>
      </div>
      <div className="body"></div>
    </Container>
  );
};

export default Class;
