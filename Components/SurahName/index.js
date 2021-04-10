const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetSurahName: function (req, res) {
    try {
      db.all("Select * from Surah_Name", (err, row) => {
        if (row) {
          res.send(row);
        } else {
          res.status(404).send(err);
        }
      });
    } catch (error) {}
  },
  AddSurahName: (req, res) => {
    if (req.body.Name) {
      if (req.body.Ayats) {
        if (req.body.Rukoos) {
          try {
            db.all(
              "Insert into Surah_Name values(null,?,?,?)",
              [req.body.Name, req.body.Ayats, req.body.Rukoos],
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
          res.status(404).json({ error: "روکوع درج کریں۔" });
        }
      } else {
        res.status(404).json({ error: "آیت درج کریں۔" });
      }
    } else {
      res.status(404).json({ error: "سورہ کا نام درج کریں۔" });
    }
  },
};
