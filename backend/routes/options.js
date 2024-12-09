// routes/options.js
const express = require("express");
const router = express.Router();
const db = require("../db/connection");


router.get("/drivers", (req, res) => {
  const query = "SELECT username FROM drivers";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching drivers:", err);
      return res.status(500).send("Error fetching drivers.");
    }
    const usernames = results.map((row) => row.username);
    res.json(usernames);
  });
});


router.get("/vans", (req, res) => {
  const query = "SELECT DISTINCT id FROM vans";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching vans:", err);
      return res.status(500).send("Error fetching vans.");
    }
    const vanIds = results.map((row) => row.id);
    res.json(vanIds);
  });
});


router.get("/vans/:vanId/tags", (req, res) => {
  const vanId = req.params.vanId;
  const query = "SELECT tag FROM vans WHERE id = ?";
  db.query(query, [vanId], (err, results) => {
    if (err) {
      console.error("Error fetching van tags:", err);
      return res.status(500).send("Error fetching van tags.");
    }
    const tags = results.map((row) => row.tag);
    res.json(tags);
  });
});


router.get("/products", (req, res) => {
  const query = "SELECT barcode FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching product barcodes:", err);
      return res.status(500).send("Error fetching product barcodes.");
    }
    const barcodes = results.map((row) => row.barcode);
    res.json(barcodes);
  });
});


router.get("/businesses", (req, res) => {
  const query = "SELECT long_name FROM businesses";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching businesses:", err);
      return res.status(500).send("Error fetching businesses.");
    }
    const businessNames = results.map((row) => row.long_name);
    res.json(businessNames);
  });
});


router.get("/employees", (req, res) => {
  const query = "SELECT username FROM employees";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).send("Error fetching employees.");
    }
    const usernames = results.map((row) => row.username);
    res.json(usernames);
  });
});


router.get("/services", (req, res) => {
  const query = "SELECT id FROM delivery_services";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching services:", err);
      return res.status(500).send("Error fetching services.");
    }
    const serviceIds = results.map((row) => row.id);
    res.json(serviceIds);
  });
});


router.get("/locations", (req, res) => {
  const query = "SELECT label FROM locations";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching locations:", err);
      return res.status(500).send("Error fetching locations.");
    }
    const locations = results.map((row) => row.label);
    res.json(locations);
  });
});


router.get("/owners", (req, res) => {
  const query = "SELECT username FROM business_owners";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching owners:", err);
      return res.status(500).send("Error fetching owners.");
    }
    const usernames = results.map((row) => row.username);
    res.json(usernames);
  });
});

router.get("/workers", (req, res) => {
  const query = "SELECT username FROM workers";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching workers:", err);
      return res.status(500).send("Error fetching workers.");
    }
    const usernames = results.map((row) => row.username);
    res.json(usernames);
  });
});

module.exports = router;