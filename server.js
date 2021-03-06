const express = require("express");
const path = require("path");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + "/dist/frontend"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/frontend/index.html"));
});

app.listen(port);
