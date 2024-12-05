const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/execute", (req, res) => {
    const { procedureName, params } = req.body;

    const sanitizedParams = Array.isArray(params)
        ? params.map((param) => (param === "" || param === undefined ? null : param))
        : [];

    const placeholders = sanitizedParams.map(() => "?").join(", ");
    const query = `CALL ${procedureName}(${placeholders})`;

    console.log(`Executing Procedure: ${procedureName} with Params:`, sanitizedParams);

    db.query(query, sanitizedParams, (err, result) => {
        if (err) {
            console.error("Error executing procedure:", err);
            return res.status(500).json({ error: "Error executing procedure.", details: err.message });
        }
        res.json(result);
    });
});

module.exports = router;