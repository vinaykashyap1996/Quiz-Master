import { app } from "./app";
import config from "./config/config";
import DatabaseConnection from "./db/db";

DatabaseConnection.connect();

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});