import express from "express";
import minimist from "minimist";
import Database from "better-sqlite3";

const bcrypt = require("bcrypt");
const db = new Database("database.db");
db.pragma("journal_mode = WAL");

try {
  db.exec(
    "CREATE TABLE Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(100), E-Mail VARCHAR(255), UserName VARCHAR(64), Password VARCHAR(64));"
  );
} catch (error) {}

try {
  db.exec(
    "CREATE TABLE Leaderboard (ID INTEGER PRIMARY KEY AUTOINCREMENT, UserName VARCHAR(64), Highest_Score INTEGER);"
  );
} catch (error) {}

try {
  db.exec(
    "CREATE TABLE Logs (ID INTEGER PRIMARY KEY AUTOINCREMENT, UserName VARCHAR(64), Message VARCHAR, Time VARCHAR);"
  );
} catch (error) {}

const app = express();
const args = minimist(process.argv.slice(2));
const port = args.port || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.post("/new-account", function (req, res) {
  //Variables for the input parameters
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  //Check if username exists in database
  const checkUsername = db.prepare(
    `SELECT * FROM Users WHERE UserName='${username}'`
  );
  let result = checkUsername.get();

  if (result === undefined) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const newAcc = `INSERT INTO Users (Name, E-Mail, UserName, Password) VALUES ('${name}', '${email}', '${username}', '${hash}');`;
      db.exec(newAcc);
    });
    const time = Date.now();
    const now = new Date(time);
    const logAccCreate = `INSERT INTO Logs (UserName, Message, Time) VALUES ('${username}', 'created a new account', '${now.toISOString()}');`;
    db.exec(logAccCreate);
    //CREATE FILES TO RENDER AT THIS STAGE
    // res.render("new_acc_made");
  } else {
    // res.render("username_exists");
  }
});

app.get("/users_db", function (req, res) {
  const getUsers = db.prepare(`SELECT * FROM Users;`);
  let result = getUsers.all();

  if (result === undefined) {
    //CREATE PAGES TO RENDER
    // res.send('nothing in db');
  } else {
    // res.send(all);
  }
});

app.get("/leaderboard_db", function (req, res) {
  const getBoard = db.prepare(`SELECT * FROM Leaderboard;`);
  let result = getBoard.all();

  if (result === undefined) {
    // res.send('nothing in db');
  } else {
    // res.send(all);
  }
});

app.get("/logs_db", function (req, res) {
  const getLogs = db.prepare(`SELECT * FROM Logs;`);
  let result = getLogs.all();

  if (result === undefined) {
    // res.send('nothing in db');
  } else {
    // res.send(all);
  }
});

app.listen(port);
