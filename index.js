const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// for connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "forprep",
});

//for creation of records
app.post("/create", (req, res) => {
  const id = req.body.id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const role = req.body.role;

  db.query(
    "INSERT INTO firstprep (fname, lname,role) VALUES (?,?,?)",
    [fname, lname, role],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Data Inserted");
        console.log("Data Inserted");
      }
    }
  );
});

//for read data
app.get("/data", (req, res) => {
  db.query("SELECT * FROM firstprep", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

//for update data
app.put("/update", (req, res) => {
  const id = req.body.id;
  const role = req.body.role;

  db.query(
    "UPDATE firstprep SET role = ? WHERE id = ?",
    [role, id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

//for delete
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM firstprep WHERE id=?  ", [id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

//for server
app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
