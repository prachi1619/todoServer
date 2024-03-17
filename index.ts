import "dotenv/config";
import { createExpressServer } from "./src/loader";
import { logger } from "./src/loggers";
import { SERVER_PORT } from "./src/config";
import { db } from "./src/database/db";

const startServer = async () => {
  try {
    // Check database connection
    await db.connect();
    logger.info("Database connection successful");

    const app = await createExpressServer();
    app.listen(`${SERVER_PORT || 9001}`, () => {
      logger.info("Server Started at port " + `${SERVER_PORT || 9001}`);
    });
  } catch (error) {
    logger.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

startServer();
