const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

var multer = require("multer");

var cors = require("cors");

const router = express.Router();

const app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ip = require("ip");
let Ip = ip.address();
const PORT = process.env.PORT || 5000;

// FILE PATHS
var Para = require("./Components/Para/index");
var Sabaq = require("./Components/Sabaq/index");
var Students = require("./Components/Students/index");
var Teachers = require("./Components/Teachers/index");
var ParaName = require("./Components/ParaName/index");
var SurahName = require("./Components/SurahName/index");
var Attendance = require("./Components/Attendance/index");
var SabaqiOrManzil = require("./Components/SabaqiManzil/index");
var StudentTeacherRelation = require("./Components/StudentTeacherRelation");

/////////////////  TEST API FOR SOUKEINA  /////////////////////////
var User = require("./Components/User/index");

let stu_image_name = "";
let stu_image_form_name = "";

app.use(express.static("./uploads/StudentImages"));
app.use(express.static("./uploads/StudentAdmissionFormImages"));

const storage = multer.diskStorage({
  destination(req, file, callback) {
    let dir = "./uploads/";
    if (file.fieldname === "Avatar") {
      dir = dir + "StudentImages";
      console.log("File 1 =", file);
      stu_image_name = file.originalname;
      callback(null, dir);
    } else if (file.fieldname === "Student_AdmissionForm_Image") {
      dir = dir + "StudentAdmissionFormImages";
      console.log("File 2 =", file);
      stu_image_form_name = file.originalname;
      callback(null, dir);
    }
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

let teacher_image = "";
let teacher_agreement_image = "";

app.use(express.static("./uploads/TeacherImages"));
app.use(express.static("./uploads/Teacher_Agreement_Image"));

const teacherStorage = multer.diskStorage({
  destination(req, file, callback) {
    let dir = "./uploads/";
    if (file.fieldname === "Avatar") {
      dir = dir + "TeacherImages";
      teacher_image = file.originalname;
      callback(null, dir);
    } else if (file.fieldname === "Teacher_Agreement_Image") {
      dir = dir + "Teacher_Agreement_Image";
      teacher_agreement_image = file.originalname;
      callback(null, dir);
    }
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});

const uploadTeacherImages = multer({ storage: teacherStorage });

app.get("/", (req, res) => {
  res.send("hello world");
});

// GET FROM STUDENTS TABLE
app.get("/AllStudents", (req, res) => {
  Students.GetStudents(req, res);
});

// INSERT INTO STUDENTS TABLE
app.post("/RegisterStudent", upload.any(), (req, res) => {
  Students.AddStudents(req, res, stu_image_name, stu_image_form_name);
});

// GET FROM TEACHER TABLE
app.get("/AllTeachers", (req, res) => {
  Teachers.GetTeachers(req, res);
});

// INSERT INTO TEACHER TABLE
app.post("/RegisterTeacher", uploadTeacherImages.any(), (req, res) => {
  Teachers.AddTeachers(req, res, teacher_image, teacher_agreement_image);
});

// GET FROM ATTENDANCE TABLE
app.get("/Attendance", (req, res) => {
  Attendance.GetAttendance(req, res);
});

// INSERT INTO ATTENDANCE TABLE
app.post("/AddAttendance", upload.none(), (req, res) => {
  Attendance.AddAttendance(req, res);
});

// GET FROM SABAQ TABLE
app.get("/SABAQ", (req, res) => {
  Sabaq.GetSabaq(req, res);
});

//INSERT INTO SABAQ TABLE
app.post("/AddSabaq", upload.none(), (req, res) => {
  Sabaq.AddSabaq(req, res);
});

// GET FROM PARA TABLE
app.get("/Para", (req, res) => {
  Para.GetPara(req, res);
});

// INSERT INTO PARA TABLE
app.post("/AddPara", upload.none(), (req, res) => {
  Para.AddPara(req, res);
});

// GET SINGLE PARA DETAILS
app.post("/GetSingleParaDetails", upload.none(), (req, res) => {
  Para.GetSingleParaDetails(req, res);
});

// GET FROM STUDENT TEACHER RELATION
app.get("/StudentTeacherRelation", (req, res) => {
  StudentTeacherRelation.GetStudentTeacherRelation(req, res);
});

//INSERT INTO STUDENT TEACHER RELATION
app.post("/AddStudentTeacherRelation", upload.none(), (req, res) => {
  StudentTeacherRelation.AddStudentTeacherRelation(req, res);
});

// GET FROM SABAQI OR MANZIL
app.get("/SabaqiOrManzil", (req, res) => {
  SabaqiOrManzil.GetSabaqiManzil(req, res);
});

// INSERT INTO SABAQI OR MANZIL
app.post("/AddSabaqiOrManzil", upload.none(), (req, res) => {
  SabaqiOrManzil.AddSabaqiManzil(req, res);
});

// GET SABAQI OR MANZIL WITH STUDENT_ID AND DATE
app.post("/GetSabaqiManzilToIdentifiy", upload.none(), (req, res) => {
  SabaqiOrManzil.GetSabaqiManzilToIdentifiy(req, res);
});

// GET SABAQI OR MANZIL ID
app.post("/GetSabaqiOrManzilId", upload.none(), (req, res) => {
  SabaqiOrManzil.GetSabaqiOrManzilId(req, res);
});

// GET FROM SURAH NAME
app.get("/SurahName", (req, res) => {
  SurahName.GetSurahName(req, res);
});

// INSERT INTO SURAH NAME
app.post("AddSurahName", upload.none(), (req, res) => {
  SurahName.AddSurahName(req, res);
});

// GET FROM PARA NAME
app.get("/ParaName", (req, res) => {
  ParaName.GetParaName(req, res);
});

// INSERT INTO PARA NAME
app.post("/AddParaName", upload.none(), (req, res) => {
  ParaName.AddParaName(req, res);
});


////////////////////////  TEST API FOR SOUKEINA  /////////////////////////////

// GET ALL USER
app.get("/GetAllUsers", (req, res) => {
  User.GetAllUsers(req, res);
});

// INSERT INTO USER
app.post("/AddUser", upload.none(), (req, res) => {
  User.AddUser(req, res);
});

// TEST FORM DATA

// app.get("/Test", (req, res) => {
//   db.all("Select * from Test", (err, row) => {
//     if (row) {
//       res.send(row);
//     } else {
//       res.status(404).send(err);
//     }
//   });
// });

// app.post("/InsertTest", upload.none(), (req, res) => {
//   console.log("Req =", JSON.stringify(req.body));
//   db.all(
//     "Insert into Test values(null,?,?)",
//     [req.body.T_Name, req.body.T_City],
//     (err, row) => {
//       if (row) {
//         res.status(200).json({ msg: "Successfully Saved!" });
//       } else {
//         console.log("Error =", err);
//         res.status(404).send(err);
//       }
//     }
//   );
// });

// LISTENING SERVER
app.listen(PORT, Ip, () => {
  console.log("Server is listening at http://" + Ip + ":" + PORT);
});
