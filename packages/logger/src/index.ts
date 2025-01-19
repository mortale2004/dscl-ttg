import winston from "winston";
import { formatDate } from "@dscl-ttg/date-time";
import { addColors } from "winston/lib/winston/config";
import env from "@dscl-ttg/env";
import { NODE_ENV } from "@dscl-ttg/constants";
// Define custom log levels with colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
  },
};

// Add custom colors to winston
addColors(customLevels.colors);

const logger: winston.Logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.File({
      filename: `logs/${formatDate()}-all.log`,
      level: "info",
    }),
    new winston.transports.File({
      filename: `logs/${formatDate()}-error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `logs/${formatDate()}-debug.log`,
      level: "debug",
    }),
  ],
});

// Add transport for debugging purposes
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.simple(),
    ),
    level: "debug",
  }),
);

export default logger;
