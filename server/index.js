const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

// Use Middleware
app.use(cors());
app.use(express.json());

// Port
const port = process.env.PORT || 4000;

// DB Configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// DB Connection check
db.connect(function (error) {
  if (error) {
    console.log("Failed");
  } else {
    console.log("Success");
  }
});

// Server Check
app.get("/", (req, res) => {
  res.send("Node MySQL server running");
});

// Port check
app.listen(port, () => {
  console.log(`CRUD node mysql running ${port} port`);
});
