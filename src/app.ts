import express from "express";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/error.middleware";
import { keycloak, sessionMiddleware } from "./middlewares/auth.middleware";
import { testConnection } from "./config/db";

const swaggerPath = path.join(process.cwd(), "src", "swagger", "output.json");

const app = express();

// Инициализация базы данных
const initializeDatabase = async () => {
  try {
    const isConnected = await testConnection();
    // if (isConnected) {
    //   await initializeTables();
    // }
  } catch (error) {
    console.error("Ошибка инициализации базы данных:", error);
  }
};

// Инициализируем базу данных при запуске приложения
initializeDatabase();

app.use(sessionMiddleware);
app.use(keycloak.middleware());

app.use(express.json());
app.use(requestLogger);

if (fs.existsSync(swaggerPath)) {
  const swaggerFile = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.use(router);
app.use(errorHandler);

export default app;
