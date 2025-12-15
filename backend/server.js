require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const morgan = require("morgan");

const readingsRouter = require("./routes/readings");
const aiRouter = require("./routes/ai");
const usersRouter = require("./routes/users");

const { errorHandler, notFound } = require("./middlewares/errorHandler");

// --------------------------------------
// CREATE APP
// --------------------------------------
const app = express();

/* -------------------------------------------------------
   SECURITY + GLOBAL MIDDLEWARE
------------------------------------------------------- */
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* -------------------------------------------------------
   ROUTES
------------------------------------------------------- */
app.use("/api/readings", readingsRouter);
app.use("/api/ai", aiRouter);
app.use("/api/users", usersRouter); // <-- USER ROUTES ENABLED

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

/* -------------------------------------------------------
   404 + ERROR HANDLER
------------------------------------------------------- */
app.use(notFound);
app.use(errorHandler);

/* -------------------------------------------------------
   START SERVER + CONNECT MONGODB
------------------------------------------------------- */
async function start() {
  const { MONGODB_URI, PORT = 8080 } = process.env;

  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is required in .env");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("✅ MongoDB connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
