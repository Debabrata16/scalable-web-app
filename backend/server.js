const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Connect to MySQL
require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://scalable-web-app-gk9h.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / curl / mobile
      if (!origin) return callback(null, true);

      // allow localhost + exact domain
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // allow all vercel preview deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true
  })
);

app.use(express.json());

// Health route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Port setup
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
