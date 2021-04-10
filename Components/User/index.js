const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
    GetAllUsers: function (req, res) {
        try {
            db.all("Select * from User", (err, row) => {
                if (row) {
                    res.send(row);
                } else res.status(404).json({ error: "Sorry no user found" });
                // res.status(404).send(err);

            });
        } catch (error) { }
    },
    AddUser: (req, res) => {
        if (req.body.Firstname) {
            if (req.body.Lastname) {
                if (req.body.Profile) {
                    try {
                        db.all(
                            "Insert into User values(null,?,?,?)",
                            [req.body.Firstname, req.body.Lastname, req.body.Profile],
                            (err, row) => {
                                if (row) {
                                    res.status(200).json({
                                        msg: "User successfully submitted",
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
                } else res.status(404).json({ error: "User Profile field is missing" });
            } else res.status(404).json({ error: "User Lastname field is missing" });
        } else res.status(404).json({ error: "User Firstname field is missing" });

    },
};
