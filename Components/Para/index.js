const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  GetPara: function (req, res) {
    try {
      db.all("Select * from Para", (err, row) => {
        if (row) {
          res.send(row);
        } else {
          res.status(404).send(err);
        }
      });
    } catch (error) {}
  },

  GetSingleParaDetails: function (req, res) {
    try {
      db.all(
        "Select * from Para where Sabaqi_OR_Manzil_ID=?",
        [req.body.Sabaqi_OR_Manzil_ID],
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

  AddPara: (req, res) => {
    if (req.body.Sabaqi_OR_Manzil_ID) {
      if (req.body.Para_No) {
        if (req.body.s_ID_l) {
          if (req.body.Mistakes) {
            if (req.body.Atkinay) {
              if (req.body.Date) {
                if (req.body.T_Verification) {
                  if (req.body.Comments) {
                    if (req.body.Rukoo_No) {
                      if (req.body.Ayat_No) {
                        if (req.body.Surah_No) {
                          if (req.body.isParaComplete) {
                            try {
                              db.all(
                                "Insert into Para values(null,?,?,?,?,?,?,?,?,?,?,?,?)",
                                [
                                  req.body.Sabaqi_OR_Manzil_ID,
                                  req.body.Para_No,
                                  req.body.s_ID_l,
                                  req.body.Mistakes,
                                  req.body.Atkinay,
                                  req.body.Date,
                                  req.body.T_Verification,
                                  req.body.Comments,
                                  req.body.Rukoo_No,
                                  req.body.Ayat_No,
                                  req.body.Surah_No,
                                  req.body.isParaComplete,
                                ],
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
                            res.status(404).json({
                              error: "isParaComplete field missing",
                            });
                          }
                        } else {
                          res
                            .status(404)
                            .json({ error: "سورہ نمبر کا اندراج لازمی ہیں۔" });
                        }
                      } else {
                        res
                          .status(404)
                          .json({ error: "آیت نمبر کا اندراج لازمی ہیں۔" });
                      }
                    } else {
                      res
                        .status(404)
                        .json({ error: "روکوع نمبر کا اندراج لازمی ہیں۔" });
                    }
                  } else {
                    res.status(404).json({ error: "Comments ERROR" });
                  }
                } else {
                  res.status(404).json({ error: "T_Verification ERROR" });
                }
              } else {
                res.status(404).json({ error: "تاریخ درج کریں۔" });
              }
            } else {
              res.status(404).json({ error: "اٹکنیں درج کریں۔" });
            }
          } else {
            res.status(404).json({ error: "غلطیاں درج کریں۔" });
          }
        } else {
          res.status(404).json({ error: "s_ID_l ERROR" });
        }
      } else {
        res.status(404).json({ error: "پارا نمبر درج کریں۔" });
      }
    } else {
      res.status(404).json({ error: "درج کریں۔ Sabaqi_OR_Manzil_ID" });
    }
  },
};
