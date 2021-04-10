const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetAttendance: function (req, res) {
    db.all("Select * from Attendance", (err, row) => {
      if (row) {
        res.send(row);
      } else {
        res.status(404).send(err);
      }
    });
  },
  AddAttendance: (req, res) => {
    if (req.body.Student_ID) {
      if (req.body.Date) {
        if (req.body.Time) {
          if (req.body.Period) {
            if (req.body.Status) {
              try {
                db.all(
                  "Insert into Attendance values(null,?,?,?,?,?)",
                  [
                    req.body.Student_ID,
                    req.body.Date,
                    req.body.Time,
                    req.body.Period,
                    req.body.Status,
                  ],
                  (err, row) => {
                    if (row) {
                      res.status(200).json({
                        msg: "حاضری کا اندراج کامیابی کے ساتھ مکمل ہوا۔",
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
              res.status(404).json({ error: "درج کریں۔ Status" });
            }
          } else {
            res.status(404).json({ error: "دورانیہ درج کریں۔" });
          }
        } else {
          res.status(404).json({ error: "وقت درج کریں۔" });
        }
      } else {
        res.status(404).json({ error: "تاریخ درج کریں۔" });
      }
    } else {
      res.status(404).json({ error: "طالب علم کی درج کریں۔ " });
    }
  },
};
