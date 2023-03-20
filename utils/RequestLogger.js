import EventEmmiter from "events";
import path from "path";
import fs from "fs";
import { format } from "date-fns";
import { URL } from "url";

class RequestLogger extends EventEmmiter {}

const logger = new RequestLogger();

logger.on("logIncoming", (dataObject) => {
  const { origin, host, originalUrl } = dataObject;
  const timestamp = format(new Date(), "dd-MM-yyyy\tHH:mm");
  const logMessage = `${timestamp}\t${origin}\t${host}\t${originalUrl} \n`;
  console.log(logMessage);

  const dateLogsPath = `./logs/${format(new Date(), "dd-MM-yyyy")}`;
  if (!fs.existsSync(dateLogsPath)) {
    fs.mkdirSync(dateLogsPath, { recursive: true }, (err) => {
      console.log(err);
    });
  }
  fs.promises.appendFile(`${dateLogsPath}/incomingReq.log`, logMessage);
});

export default logger;