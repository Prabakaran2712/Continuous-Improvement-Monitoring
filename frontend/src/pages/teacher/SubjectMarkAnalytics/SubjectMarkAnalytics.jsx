import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { Chart } from "react-google-charts";

const SubjectMarkAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [markData, setMarkData] = useState(null);
  const data = [
    ["Dinosaur", "Length"],
    ["Acrocanthosaurus (top-spined lizard)", 12.2],
    ["Albertosaurus (Alberta lizard)", 9.1],
    ["Allosaurus (other lizard)", 12.2],
    ["Apatosaurus (deceptive lizard)", 22.9],
    ["Archaeopteryx (ancient wing)", 0.9],
    ["Argentinosaurus (Argentina lizard)", 36.6],
    ["Baryonyx (heavy claws)", 9.1],
    ["Brachiosaurus (arm lizard)", 30.5],
    ["Ceratosaurus (horned lizard)", 6.1],
    ["Coelophysis (hollow form)", 2.7],
    ["Compsognathus (elegant jaw)", 0.9],
    ["Deinonychus (terrible claw)", 2.7],
    ["Diplodocus (double beam)", 27.1],
    ["Dromicelomimus (emu mimic)", 3.4],
    ["Gallimimus (fowl mimic)", 5.5],
    ["Mamenchisaurus (Mamenchi lizard)", 21.0],
    ["Megalosaurus (big lizard)", 7.9],
    ["Microvenator (small hunter)", 1.2],
    ["Ornithomimus (bird mimic)", 4.6],
    ["Oviraptor (egg robber)", 1.5],
    ["Plateosaurus (flat lizard)", 7.9],
    ["Sauronithoides (narrow-clawed lizard)", 2.0],
    ["Seismosaurus (tremor lizard)", 45.7],
    ["Spinosaurus (spiny lizard)", 12.2],
    ["Supersaurus (super lizard)", 30.5],
    ["Tyrannosaurus (tyrant lizard)", 15.2],
    ["Ultrasaurus (ultra lizard)", 30.5],
    ["Velociraptor (swift robber)", 1.8],
  ];

  var options = {
    title: "Approximating Normal Distribution",
    legend: { position: "none" },
    colors: ["#4285F4"],

    chartArea: { width: 405 },
    hAxis: {
      ticks: [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1],
    },
    bar: { gap: 0 },

    histogram: {
      bucketSize: 1,
      maxNumBuckets: 400,
      minValue: -1,
      maxValue: 1,
    },
  };

  //get value from url
  const { id, sid } = useParams();
  useEffect(() => {
    //get course details with id
    axios
      .get(`/api/courses/${id}`)
      .then((res) => {
        setCourseData(res.data);
        console.log(res.data);
        setLoading(false);
        //get all marks of students for subject
        axios.get(`/api/marks/`).then((res) => {
          setMarkData(res.data);
          console.log(res.data);
          setLoading(false);
        });
      })
      .then((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );

  return (
    <Container>
      <div className="subject-details">
        <Title title="subject details" />
        <div className="category">
          <p>Name</p>
          <p>{courseData.name}</p>
        </div>
        <div className="category">
          <p>Subject Code </p>
          <p>{courseData.subject_code}</p>
        </div>
        <div className="category">
          <p>Credits</p>
          <p>{courseData.credits}</p>
        </div>
        <div className="category">
          <p>Department</p>
          <p>{courseData.department.name}</p>
        </div>
      </div>
      <Chart
        chartType="Histogram"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </Container>
  );
};

export default SubjectMarkAnalytics;
