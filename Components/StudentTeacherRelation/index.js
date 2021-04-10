const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetStudentTeacherRelation: function (req, res) {
    try {
      db.all("Select * from Students_Teacher_Relation", (err, row) => {
        if (row) {
          res.send(row);
        } else {
          res.status(404).send(err);
        }
      });
    } catch (error) {}
  },
  AddStudentTeacherRelation: (req, res) => {
    if (req.body.Student_ID) {
      if (req.body.Teacher_ID) {
        if (req.body.Start_Date) {
          if (req.body.End_Date) {
            try {
              db.all(
                "Insert into Students_Teacher_Relation values(null,?,?,?,?)",
                [
                  req.body.Student_ID,
                  req.body.Teacher_ID,
                  req.body.Start_Date,
                  req.body.End_Date,
                ],
                (err, row) => {
                  if (row) {
                    res.status(200).json({
                      msg: "طالب علم کا اندراج کامیابی کے ساتھ مکمل ہوا۔",
                    });
                  } else {
                    console.log("Error =", err);
                    res.status(404).send(err);
                  }
                }
              );
            } catch (error) {
              console.log("Err =", error);
            }
          } else {
            res.status(404).json({ error: "اختتام کرنے کی تاریخ درج کریں۔" });
          }
        } else {
          res.status(404).json({ error: "شروں کرنے کی تاریخ درج کریں۔" });
        }
      } else {
        res.status(404).json({ error: "استاد کی درج کریں۔ " });
      }
    } else {
      res.status(404).json({ error: "طالب علم کی درج کریں۔ " });
    }
  },
};
