const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetTeachers: function (req, res) {
    db.all("Select * from Teacher", (err, row) => {
      if (row) {
        res.send(row);
      } else {
        res.status(404).send(err);
      }
    });
  },
  AddTeachers: (req, res, image1, image2) => {
    if (req.body.Teacher_Name) {
      if (req.body.Father_Name) {
        if (req.body.NIC) {
          if (req.body.Date_Of_Birth) {
            if (req.body.Date_Of_Contract) {
              if (req.body.Address) {
                if (req.body.Status) {
                  if (req.body.Contact) {
                    if (image1) {
                      if (image2) {
                        try {
                          db.all(
                            "Insert into Teacher values(null,?,?,?,?,?,?,?,?,?,?)",
                            [
                              req.body.Teacher_Name,
                              req.body.Father_Name,
                              req.body.NIC,
                              req.body.Date_Of_Birth,
                              req.body.Date_Of_Contract,
                              req.body.Address,
                              req.body.Status,
                              req.body.Contact,
                              image1,
                              image2,
                            ],
                            (err, row) => {
                              if (row) {
                                res.status(200).json({
                                  msg:
                                    "استاد کا اندراج کامیابی کے ساتھ مکمل ہوا۔",
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
                        res.status(404).json({
                          error: "معاہدہ کی تصویر کا اندراج ضروری ہیں۔",
                        });
                      }
                    } else {
                      res
                        .status(404)
                        .json({ error: "استاد کی تصویر کا اندراج ضروری ہیں۔" });
                    }
                  } else {
                    res.status(404).json({ error: "رابطہ نمبر درج کریں۔" });
                  }
                } else {
                  res.status(404).json({ error: "Status Error" });
                }
              } else {
                res.status(404).json({ error: "پتہ درج کریں۔" });
              }
            } else {
              res.status(404).json({ error: "معاہدہ کی تاریخ درج کریں۔" });
            }
          } else {
            res.status(404).json({ error: "تاریخ پیدائش درج کریں۔" });
          }
        } else {
          res.status(404).json({ error: "شناختی کارڈ نمبر درج کریں۔" });
        }
      } else {
        res.status(404).json({ error: "والد کا نام درج کریں۔" });
      }
    } else {
      res.status(404).json({ error: "استاد کا نام درج کریں۔" });
    }
  },
};
