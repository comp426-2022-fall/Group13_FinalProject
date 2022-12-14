import express from "express";
import minimist from "minimist";
import Database from "better-sqlite3";
import { __esModule } from "node-fetch";

//Database Initialization
const db = new Database("database.db");
db.pragma("journal_mode = WAL");

//Global Variables for Functionality
var loggedIn = null; //Currently logged in user
var currUserScore = 0; //Current User Score
var currCompScore = 0; //Current Computer Score
var uChoice = null;
var cpuChoice = null;
var gameOutcome = null;

////////////////////////////Database Setup///////////////////////////////////////
const createUserTable = `CREATE TABLE Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(100), Email VARCHAR(255), UserName VARCHAR(64), Password VARCHAR(64));`;
const createLeaderTable = `CREATE TABLE Leaderboard (ID INTEGER PRIMARY KEY AUTOINCREMENT, UserName VARCHAR(64), Highest_Score INTEGER);`;
const createLogsTable = `CREATE TABLE Logs (ID INTEGER PRIMARY KEY AUTOINCREMENT, UserName VARCHAR(64), Message VARCHAR, Time VARCHAR);`;

try {
  db.exec(createUserTable);
} catch (error) {}

try {
  db.exec(createLeaderTable);
} catch (error) {}

try {
  db.exec(createLogsTable);
} catch (error) {}

////////////////////////////////// SERVER SETUP ////////////////////////////////////
const app = express();
const args = minimist(process.argv.slice(2));
const port = args.port || 2000;

//link server.js page with css styles
app.use(express.static("/public"));
app.use("/css", express.static("public/css"));
app.use("/img", express.static("public/img"));
app.use("/scripts", express.static("public/scripts"));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get("/logs", function (req, res) {
  const getLogs = db.prepare(`SELECT * FROM Logs;`);
  let result = getLogs.all();
  res.render("logs", { logs: result });
});

//////////////////////////////////// USER ACCOUNT FEATURES ////////////////////////////
app.get("/login", function (req, res) {
  if (loggedIn) {
    res.redirect("/home");
    console.log("[LOGIN LOADED]");
  } else {
    res.render("login");
    console.log("[LOGIN LOADED]");
  }
});

app.get("/register", function (req, res) {
  res.render("register");
  console.log("[REGISTER LOADED]");
});

app.get("/delete", function (req, res) {
  res.render("delete");
});

app.get("/logout", function (req, res) {
  const time = Date.now();
  const now = new Date(time);
  const logLogout = `INSERT INTO Logs (UserName, Message, Time) VALUES ('${loggedIn}', 'logged out', '${now.toISOString()}');`;
  db.exec(logLogout);
  loggedIn = null;
  currCompScore = 0;
  currUserScore = 0;
  uChoice = null;
  cpuChoice = null;
  gameOutcome = null;
  res.redirect("/login");
});

app.get("/home", function (req, res) {
  if (loggedIn) {
    const getBoard = db.prepare(`SELECT * FROM Leaderboard;`);
    let result = getBoard.all();
    res.render("home", {
      loggedIn: loggedIn,
      leader: result,
      currUserScore: currUserScore,
      currCompScore: currCompScore,
      userChoice: uChoice,
      cpuChoice: cpuChoice,
      gameOutcome: gameOutcome,
    });
    console.log("[HOME LOADED]");
  } else {
    res.redirect("/login");
  }
});

//LOGIN TO ACCOUNT
app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const time = Date.now();
  const now = new Date(time);
  //Check if user exists in database
  const checkUsername = db.prepare(
    `SELECT * FROM Users WHERE UserName='${username}'`
  );
  let result = checkUsername.get();

  if (result == undefined) {
    console.log("USERNAME DOES NOT EXIST");
    res.render("usernameDNE");
  } else {
    const checkPass = db.prepare(
      `SELECT * FROM Users WHERE UserName='${username}' and Password='${password}'`
    );
    let Pass = checkPass.get();
    if (Pass == undefined) {
      //Wrong Password
      console.log("WRONG PASSWORD");
      const logLoginFailure = `INSERT INTO Logs (UserName, Message, Time) VALUES ('${username}', 'failed to login due to wrong password', '${now.toISOString()}');`;
      db.exec(logLoginFailure);
      res.render("wrong_password");
    } else {
      //LOGIN SUCCESSFUL
      const logLoginSuccess = `INSERT INTO Logs (UserName, Message, Time) VALUES ('${username}', 'logged in successfully', '${now.toISOString()}');`;
      db.exec(logLoginSuccess);

      loggedIn = username;
      res.redirect("/home");
    }
  }
});

//CREATE A NEW ACCOUNT
app.post("/register", function (req, res) {
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
    const newAcc = `INSERT INTO Users (Name, Email, UserName, Password) VALUES ('${name}', '${email}', '${username}', '${password}');`;
    db.exec(newAcc);
    const minScore = 0;
    const newAccLB = `INSERT INTO Leaderboard (UserName, Highest_Score) VALUES ('${username}', '${minScore}');`;
    db.exec(newAccLB);
    const time = Date.now();
    const now = new Date(time);
    const logAccCreate = `INSERT INTO Logs (UserName, Message, Time) VALUES ('${username}', 'created a new account', '${now.toISOString()}');`;
    try {
      db.exec(logAccCreate);
    } catch (error) {
      console.log(error);
    }
    res.render("login");
  } else {
    console.log("Username Exists");
    res.render("username_taken");
  }
});

//DELETE EXISTING ACCOUNT
app.post("/delete", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const time = Date.now();
  const now = new Date(time);

  //Check if username exists in database
  const checkUsername = db.prepare(
    `SELECT * FROM Users WHERE UserName='${username}'`
  );
  let result = checkUsername.get();

  if (result == undefined) {
    //USERNAME DOES NOT EXIST
    console.log("USERNAME DOES NOT EXIST");
    res.render("usernameDNE");
  } else {
    const getPass = db.prepare(
      `SELECT * FROM Users WHERE UserName='${username}' and Password='${password}'`
    );
    let Pass = getPass.get();
    if (Pass == undefined) {
      //WRONG PASSWORD
      const logDeleteFailure = `INSERT INTO Logs (UserName, Message, Time) VALUES ('${username}', 'failed to delete due to wrong password', '${now.toISOString()}');`;
      db.exec(logDeleteFailure);
      res.render("wrong_password");
    } else {
      //PASSWORD VERIFICATION SUCCESS
      const delAcc = `DELETE FROM Users WHERE UserName='${username}'`;
      db.exec(delAcc);
      const delAccLB = `DELETE FROM Leaderboard WHERE UserName='${username}'`;
      db.exec(delAccLB);
      const logDeleteSuccess = `INSERT INTO Logs (UserName, Message, Time) VALUES ('${username}', 'deleted their account', '${now.toISOString()}');`;
      db.exec(logDeleteSuccess);
      res.redirect("/logout");
      res.redirect("/login");
    }
  }
});

////////////////////////////////////////// GAME FEATURES ///////////////////////////////
//Post Game Score
app.post("/post_score", function (req, res) {
  const score = currUserScore - currCompScore;
  const addScore = `UPDATE Leaderboard SET Highest_Score= '${score}' WHERE UserName='${loggedIn}';`;
  db.exec(addScore);
  res.redirect("/home");
});

app.post("/rock", function (req, res) {
  uChoice = "ROCK";
  const cpuOptions = ["ROCK", "PAPER", "SCISSORS"];
  const n = Math.floor(Math.random() * 3);
  cpuChoice = cpuOptions[n];

  if (cpuChoice == uChoice) {
    gameOutcome = "TIE";
  }
  if (cpuChoice == "PAPER") {
    currCompScore++;
    gameOutcome = "YOU LOSE";
  }
  if (cpuChoice == "SCISSORS") {
    currUserScore++;
    gameOutcome = "YOU WIN";
  }
  res.redirect("/home");
});

app.post("/paper", function (req, res) {
  uChoice = "PAPER";
  const cpuOptions = ["ROCK", "PAPER", "SCISSORS"];
  const n = Math.floor(Math.random() * 3);
  cpuChoice = cpuOptions[n];

  if (cpuChoice == uChoice) {
    gameOutcome = "TIE";
  }
  if (cpuChoice == "SCISSORS") {
    currCompScore++;
    gameOutcome = "YOU LOSE";
  }
  if (cpuChoice == "ROCK") {
    currUserScore++;
    gameOutcome = "YOU WIN";
  }
  res.redirect("/home");
});

app.post("/scissors", function (req, res) {
  uChoice = "SCISSORS";
  const cpuOptions = ["ROCK", "PAPER", "SCISSORS"];
  const n = Math.floor(Math.random() * 3);
  cpuChoice = cpuOptions[n];

  if (cpuChoice == uChoice) {
    gameOutcome = "TIE";
  }
  if (cpuChoice == "ROCK") {
    currCompScore++;
    gameOutcome = "YOU LOSE";
  }
  if (cpuChoice == "PAPER") {
    currUserScore++;
    gameOutcome = "YOU WIN";
  }
  res.redirect("/home");
});

app.listen(port);
