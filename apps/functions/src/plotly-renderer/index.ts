import express from "express";
import path from "path";
const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/plot.json", function (req, res) {
  res.sendFile(path.join(__dirname, "../../build/plot.json"));
});

app.listen(8080);
