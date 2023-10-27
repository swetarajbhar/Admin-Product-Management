import express from "express";
import timeout from "connect-timeout";
import cors from "cors";

// Import any additional modules and routes you require here
import authRoutes from "./routes/v1/auth/index";
import productRoutes from "./routes/v1/product/index";

import { bootstrap, BootstrapResult } from "./config/components/mongo";

const app = express();

// Disable default headers as per Infosec Guidelines
app.disable("x-powered-by");
app.set("etag", false);

app.use(express.text());
app.use(express.json());

// Timeout middleware
app.use(timeout("1200s"));
app.use(cors());

async function connectToMongoDB() {
  const result: BootstrapResult = await bootstrap();
  if (result.error) {
    console.error("MongoDB connection error:", result.error);
    process.exit(1);
  }
}

connectToMongoDB();

// Custom routes for business logic can be placed below
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

// Middleware to check timeout
app.use(haltOnTimedout);

// Health check endpoint for a load balancer
app.get("/healthcheck", (req, res) => {
  res.status(200).send("success");
});

function haltOnTimedout(req: any, res: any, next: any) {
  if (!req.timedout) next();
}

// Error handler
process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
});

export { app };
