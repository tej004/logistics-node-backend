import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./utils/middleware/error.middleware";
import routes from "./routing/routes";
import dataSource from "./database/data-source/data-source";

dotenv.config();

const app = express();

(async () => {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");

    app.use(cors());
    app.use(express.json());
    app.use(errorMiddleware);
    app.use('/api', routes);

    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Express is listening at port ${process.env.PORT || 3000}`
      );
    });
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }
})();