const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");
const { json } = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetSabaqiManzil: function (req, res) {
    try {
      db.all("Select * from Sabaqi_Manzil", (err, row) => {
        if (row) {
          res.send(row);
        } else {
          res.status(404).send(err);
        }
      });
    } catch (error) {}
  },

  GetSabaqiManzilToIdentifiy: function (req, res) {
    try {
      db.all(
        "Select * from Sabaqi_Manzil where Student_ID=? and Date=? and Sabaqi_OR_Manzil=? Order By P_ID",
        [req.body.Student_ID, req.body.Date, req.body.Sabaqi_OR_Manzil],
        (err, row) => {
          if (row) {
            res.send(row);
          } else {
            res.status(404).send(err);
          }
        }
      );
    } catch (error) {}
  },

  GetSabaqiOrManzilId: function (req, res) {
    try {
      db.all(
        "Select Sabaqi_OR_Manzil_ID from Sabaqi_Manzil where P_ID=? and Student_ID=? and Date=? and Sabaqi_OR_Manzil=?",
        [
          req.body.P_ID,
          req.body.Student_ID,
          req.body.Date,
          req.body.Sabaqi_OR_Manzil,
        ],
        (err, row) => {
          if (row) {
            res.send(row);
          } else {
            res.status(404).send(err);
          }
        }
      );
    } catch (error) {}
  },

  AddSabaqiManzil: (req, res) => {
    if (req.body.P_ID) {
      if (req.body.Student_ID) {
        if (req.body.Sabaqi_OR_Manzil) {
          if (req.body.Date) {
            try {
              db.all(
                "Insert into Sabaqi_Manzil values(null,?,?,?,?)",
                [
                  req.body.P_ID,
                  req.body.Student_ID,
                  req.body.Sabaqi_OR_Manzil,
                  req.body.Date,
                ],
                (err, row) => {
                  if (row) {
                    db.all("Select * from Sabaqi_Manzil", (err, row) => {
                      console.log(
                        "row",
                        row[row.length - 1].Sabaqi_OR_Manzil_ID
                      );
                      res.status(200).json({
                        msg: "Successfully Saved!",
                        Id: row[row.length - 1].Sabaqi_OR_Manzil_ID,
                      });
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
            res.status(404).json({ error: "تاریخ درج کریں۔" });
          }
        } else {
          res
            .status(404)
            .json({ error: "سبقی یا منزل میں سے ایک کا انتخاب کریں۔" });
        }
      } else {
        res.status(404).json({ error: "Student Id missing" });
      }
    } else {
      res.status(404).json({ error: "پارا نمبر درج کریں۔" });
    }
  },
};
