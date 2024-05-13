const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.all("*", (req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
