const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Connect to MySQL
require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
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
