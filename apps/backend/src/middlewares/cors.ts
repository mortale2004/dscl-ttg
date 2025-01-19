import type { Application } from "express";
import cors from "cors";
/**
 * Registers CORS middleware.
 * @param {object} app Application instance.
 */
const registerCors = (
  app: Application,
  appOrigin = "http://localhost:5173",
) => {
  app.use(
    cors({
      origin: appOrigin, // Replace with your frontend domain
      credentials: true, // Allow credentials
    }),
  );
};
export default registerCors;
