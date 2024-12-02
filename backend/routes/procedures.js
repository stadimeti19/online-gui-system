const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/execute", (req, res) => {
    const { procedureName, params } = req.body;
    const placeholders = params.map(() => "?").join(", ");
    const query = `CALL ${procedureName}(${placeholders})`;

    db.query(query, params, (err, result) => {
        if (err) {
            console.error("Error executing procedure:", err);
            return res.status(500).send("Error executing procedure.");
        }
        res.json(result);
    });
});

module.exports = router;