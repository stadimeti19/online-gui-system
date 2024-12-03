// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const procedureRoutes = require("./routes/procedures");
const viewRoutes = require("./routes/views");
const optionRoutes = require("./routes/options");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/procedures", procedureRoutes);
app.use("/api/views", viewRoutes);
app.use("/api/options", optionRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});