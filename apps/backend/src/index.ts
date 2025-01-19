import App from "./app.ts";
const app = new App();
(async () => {
  try {
    await Promise.all([app.connectToMongoDb()]);
    await app.registerRoutesAndMiddleware(), await app.listen();
  } catch (error) {
    console.error(error);
    await Promise.all([app.closeMongoDbConnection(), app.close()]);
    process.exit(1);
  }
})();
