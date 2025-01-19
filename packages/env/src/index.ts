import dotenv from "dotenv";
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "",
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "",
  },
  MONGODB: {
    MONGODB_URI: `mongodb://${process.env.MONGODB_USER ? `${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASSWORD || "")}@` : ""}${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?authSource=${process.env.MONGODB_AUTH_SOURCE}`,
  },
  APP: {
    PORT: process.env.PORT || "4000",
    APP_URL: process.env.APP_URL || "",
    APP_ORIGIN: process.env.APP_ORIGIN || "",
  }
};
export default env;
