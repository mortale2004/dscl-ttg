import type { Server } from "node:http";
import env from "@dscl-ttg/env";
import logger from "@dscl-ttg/logger";
import type { Application } from "express";
import express from "express";
import type { Connection } from "mongoose";
import mongoose from "mongoose";
import { MONGOOSE_EVENTS } from "@dscl-ttg/constants";
import type { ConnectionPool } from "mssql";
import registerParsers from "@middlewares/parsers";
import registerCors from "@middlewares/cors";
import { handleErrors, handleNotFoundError } from "@middlewares/errors";
import handleAuthentication from "@middlewares/authentication";
import router from "@routes/index";
import morgan from "morgan";

/**
 * Base application instance.
 */
class App {
  app: Application;
  port: number;
  appUrl: string;
  server: Server | null = null;
  mongooseConnection: Connection | null = null;
  sqlConnectionPool: ConnectionPool | null = null;

  constructor() {
    this.app = express();
    this.port = Number(env.APP.PORT || 4000);
    this.appUrl = env.APP.APP_URL || "http://localhost";
  }
  // Listen to the server
  async listen() {
    try {
      return new Promise((resolve) => {
        this.server = this.app.listen(this.port, () => {
          resolve(null);
        });
        logger.info(`Server started on ${this.appUrl}`);
      });
    } catch (error) {
      logger.error("Error starting the server:", error);
    }
  }

  // Close the server
  async close() {
    try {
      return new Promise((resolve, reject) => {
        if (!this.server) {
          resolve(null);
          return;
        }

        this.server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          this.server = null;
          resolve(null);
        });
      });
    } catch (error) {
      logger.error("Error closing the server:", error);
    }
  }

  async registerRoutesAndMiddleware() {
    try {
      registerCors(this.app, env.APP.APP_ORIGIN);
      registerParsers(this.app);
      this.app.use(
        morgan("dev", {
          stream: {
            write: (message) => {
              logger.info(message);
            },
          },
        }),
      );
      this.app.use(handleAuthentication);
      this.app.use(router);
      this.app.use(handleNotFoundError);
      this.app.use(handleErrors);

      logger.info(`│ Routes and middleware registered.`);
    } catch (error) {
      logger.error("Error registering routes and middleware:", error);
    }
  }

  async connectToMongoDb() {
    try {
      const connectionUri = env.MONGODB.MONGODB_URI;

      this.mongooseConnection = mongoose.connection;
      this.mongooseConnection.on(MONGOOSE_EVENTS.CONNECTED, () => {
        logger.info("│ MongoDb is connected");
      });
      this.mongooseConnection.on(MONGOOSE_EVENTS.ERROR, (error) => {
        logger.error(`│ MongoDb encountered an error: ${error}`);
      });
      this.mongooseConnection.on(MONGOOSE_EVENTS.DISCONNECTED, () => {
        logger.error("│ MongoDb is disconnected.");
      });
      await mongoose.connect(connectionUri);
    } catch (error) {
      logger.error("Error connecting to the mongo database:", error);
    }
  }
  async closeMongoDbConnection() {
    try {
      if (this.mongooseConnection) {
        await this.mongooseConnection.close();
      }
    } catch (error) {
      logger.error("Error closing the mongo database connection:", error);
    }
  }
}

export default App;
