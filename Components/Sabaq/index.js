const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetSabaq: function (req, res) {
    try {
      db.all("Select * from SABAQ", (err, row) => {
        if (row) {
          res.send(row);
        } else {
          res.status(404).send(err);
        }
      });
    } catch (error) {}
  },
  AddSabaq: (req, res) => {
    if (req.body.Student_ID) {
      if (req.body.Para_No) {
        if (req.body.Surah_No) {
          if (req.body.Ayat_No) {
            if (req.body.Mistakes) {
              if (req.body.Atkinay) {
                if (req.body.Comments) {
                  if (req.body.THREE_Assbaq) {
                    if (req.body.Date) {
                      if (req.body.Status) {
                        try {
                          db.all(
                            "Insert into SABAQ values(null,?,?,?,?,?,?,?,?,?,?)",
                            [
                              req.body.Student_ID,
                              req.body.Para_No,
                              req.body.Surah_No,
                              req.body.Ayat_No,
                              req.body.Mistakes,
                              req.body.Atkinay,
                              req.body.Comments,
                              req.body.THREE_Assbaq,
                              req.body.Date,
                              req.body.Status,
                            ],
                            (err, row) => {
                              if (row) {
                                res.status(200).json({
                                  msg:
                                    "سبق کا اندراج کامیابی کے ساتھ مکمل ہوا۔",
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
                        res.status(404).json({ error: "Status Error" });
                      }
                    } else {
                      res.status(404).json({ error: "تاریخ درج کریں۔" });
                    }
                  } else {
                    res.status(404).json({ error: "تین اسباق درج کریں۔" });
                  }
                } else {
                  res.status(404).json({ error: "Comments Error" });
                }
              } else {
                res.status(404).json({ error: "اٹکنیں درج کریں۔" });
              }
            } else {
              res.status(404).json({ error: "غلطیاں درج کریں۔" });
            }
          } else {
            res.status(404).json({ error: "آیت نمبر درج کریں۔" });
          }
        } else {
          res.status(404).json({ error: "سورہ نمبر درج کریں۔" });
        }
      } else {
        res.status(404).json({ error: "پارا نمبر درج کریں۔" });
      }
    } else {
      res.status(404).json({ error: "طالب علم کی درج کریں۔ " });
    }
  },
};
