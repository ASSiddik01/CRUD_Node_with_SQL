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

// post api
app.post("/post", (req, res) => {
  const todo = req.body.task;
  const priority = req.body.priority;

  db.query(
    "INSERT INTO `todo`(`task`, `priority`) VALUES (?,?)",
    [todo, priority],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Get api
app.get("/get", (req, res) => {
  db.query("SELECT * FROM `todo` WHERE 1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete api
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM `todo` WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// update api
app.put("/update", (req, res) => {
  const id = req.body.id;
  const priority = req.body.priority;
  console.log(id);
  db.query(
    "UPDATE `todo` SET `priority`= ? WHERE id= ?",
    [priority, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Server Check
app.get("/", (req, res) => {
  res.send("Node MySQL server running");
});

// Port check
app.listen(port, () => {
  console.log(`CRUD node mysql running ${port} port`);
});
