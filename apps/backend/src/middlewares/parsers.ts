import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { application, type Application } from "express";

/**
 * Registers requests body parser middleware.
 * @param {object} app Application instance.
 */
const registerParsers = (app: Application) => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: "5mb" }));
};

export default registerParsers;
