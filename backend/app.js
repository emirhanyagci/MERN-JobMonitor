const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const app = express();
const PORT = process.env.PORT || 3500;
app.use(logger);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(bodyParser.json());

app.all("*", (req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
