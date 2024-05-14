const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { logger, logEvents } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const User = require("./models/User");
const Note = require("./models/Note");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
  next();
});
app.use(require("./routes/userRoutes"));
app.all("*", (req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch((err) => {
    logEvents(
      `${err.no}:${err.code} \t ${err.syscall} \t ${err.hostname}`,
      "monoErrLog.log"
    );
  });
