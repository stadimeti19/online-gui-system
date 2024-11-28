const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result);
    });
});

app.post('/users', (req, res) => {
    const { name, email, password_hash } = req.body;
    db.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, password_hash], (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(201).json(result);
    });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));