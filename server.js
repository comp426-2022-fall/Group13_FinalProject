import express from "express";
import minimist from "minimist";

const app = express();
const args = minimist(process.argv.slice(2));
const port = args.port || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.redirect("/login");
});
