const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const logEvents = async (message, logFileName) => {
  const logDate = format(new Date(), "yyyyMMdd\t:mm:ss");
  const logItem = `${logDate}\t${uuid()}\t${message} \n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
  //check file exist
  //append log message
};
const logger = (req, res, next) => {
  logEvents(
    `${req.method} \t ${req.url} \t ${req.headers.origin}`,
    "reqLog.log"
  );
  console.log(`${req.method} \t ${req.url} \t ${req.headers.origin}`);
  next();
};

module.exports = {
  logger,
  logEvents,
};
