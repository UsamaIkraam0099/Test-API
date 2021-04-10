const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetParaName: function (req, res) {
    try {
      db.all("Select * from Para_Name", (err, row) => {
        if (row) {
          res.send(row);
        } else {
          res.status(404).send(err);
        }
      });
    } catch (error) {}
  },
  AddParaName: (req, res) => {
    if (req.body.Para_Name) {
      try {
        db.all(
          "Insert into Para_Name values(null,?)",
          [req.body.Para_Name],
          (err, row) => {
            if (row) {
              res.status(200).json({
                msg: "اندراج کامیابی کے ساتھ مکمل ہوا۔",
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
      res.status(404).json({ error: "پارا نام درج کریں۔" });
    }
  },
};
