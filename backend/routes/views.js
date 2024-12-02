const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/:viewName", (req, res) => {
    const { viewName } = req.params;
    const query = `SELECT * FROM ${viewName}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching view data:", err);
            return res.status(500).send("Error fetching view data.");
        }
        res.json(result);
    });
});

module.exports = router;