const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetStudents: function (req, res) {
    console.log("GetStudent");
    db.all("Select * from Students", (err, row) => {
      if (row) {
        res.send(row);
      } else {
        res.status(404).send(err);
      }
    });
  },
  AddStudents: (req, res, image1, image2) => {
    console.log("AddStudents");
    console.log("Req.Body ==", JSON.stringify(req.body));
    if (req.body.Roll_Number) {
      if (req.body.Student_Name) {
        if (req.body.Date_Of_Birth) {
          if (req.body.Father_Name) {
            if (req.body.Address) {
              if (req.body.Phone_Number) {
                if (req.body.Date_Of_Admission) {
                  if (image1) {
                    if (image2) {
                      if (req.body.Education_isIslamic) {
                        if (req.body.Education_isSchool) {
                          try {
                            db.all(
                              "Insert into Students values(null,?,?,?,?,?,?,?,?,?,?,?)",
                              [
                                req.body.Roll_Number,
                                req.body.Student_Name,
                                req.body.Date_Of_Birth,
                                req.body.Father_Name,
                                req.body.Address,
                                req.body.Phone_Number,
                                req.body.Date_Of_Admission,
                                image1,
                                image2,
                                req.body.Education_isIslamic,
                                req.body.Education_isSchool,
                              ],
                              (err, row) => {
                                if (row) {
                                  res.status(200).json({
                                    msg:
                                      "طالب علم کا اندراج کامیابی کے ساتھ مکمل ہوا۔",
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
                          res.status(404).json({ error: "Education_isSchool" });
                        }
                      } else {
                        res.status(404).json({ error: "Education_isIslamic" });
                      }
                    } else {
                      res.status(404).json({
                        error: "داخلہ فارم کی تصویر کا اندراج لازمی ہے۔",
                      });
                    }
                  } else {
                    res.status(404).json({
                      error: "طالب علم کی تصویر کا اندراج لازمی ہے۔",
                    });
                  }
                } else {
                  res
                    .status(404)
                    .json({ error: "داخلہ کی تاریخ کا اندراج لازمی ہے۔" });
                }
              } else {
                res.status(404).json({ error: "فون نمبر کا اندراج لازمی ہے۔" });
              }
            } else {
              res
                .status(404)
                .json({ error: "طالب علم کے پتہ کا اندراج لازمی ہے۔" });
            }
          } else {
            res.status(404).json({
              error: "طالب علم کے والد کے نام کا اندراج لازمی ہے۔",
            });
          }
        } else {
          res
            .status(404)
            .json({ error: "طالب علم کی تاریخ پیدائش کا اندراج لازمی ہے۔" });
        }
      } else {
        res.status(404).json({ error: "طالب علم کے نام کا اندراج لازمی ہے۔" });
      }
    } else {
      res
        .status(404)
        .json({ error: "طالب علم کے رول نمبر کا اندراج لازمی ہے۔" });
    }
  },
};
