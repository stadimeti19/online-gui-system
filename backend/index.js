const express = require("express");
const cors = require("cors");
require("dotenv").config();

const procedureRoutes = require("./routes/procedures");
const viewRoutes = require("./routes/views");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/procedures", procedureRoutes);
app.use("/api/views", viewRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Use PORT from .env or default to 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});