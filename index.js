//require necessary modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//require routes
const departmentRoutes = require("./routes/departmentRoutes");
const addressRoutes = require("./routes/addressRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const batchRoutes = require("./routes/batchRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const classRoutes = require("./routes/classRoutes");
const courseRoutes = require("./routes/courseRoutes");
const examRoutes = require("./routes/examRoutes");
const markRoutes = require("./routes/markRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teachesRoutes = require("./routes/teachesRoutes");
const authRoutes = require("./routes/authRoutes");

//set up express app and middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path, new Date().toLocaleString());
  next();
});
app.use(cookieParser());

//define routes
app.use("/api/departments", departmentRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/teaches", teachesRoutes);
app.use("/api/auth", authRoutes);

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//connect to mongoDB and start server
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo DB");
  app.listen(process.env.PORT, () => {
    console.log("server listening on port " + process.env.PORT);
  });
});
