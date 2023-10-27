import * as dotEnv from "dotenv";

dotEnv.config();
if (process.env.NODE_ENV === process.env.CONFIG) {
  console.log("##### Running environment: ##### " + process.env.NODE_ENV);
} else {
  throw new Error("Invalid .env configuration");
}

const requiredEnvVar: string[] = [
  "PORT",
  "MONGO_HOST",
  "MONGO_USERNAME",
  "MONGO_PASSWORD",
  "MONGO_PORT",
  "MONGO_DBNAME",
];
const notSetEnvVar: string[] = requiredEnvVar.filter((i) => !process.env[i]);

if (notSetEnvVar.length > 0) {
  throw new Error(`Required ENV vars not set: ${notSetEnvVar.join(", ")}`);
}

import { app } from "./app";
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 10011;
app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
