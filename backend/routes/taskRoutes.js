const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getTasks,
    createTask,
    deleteTask
} = require("../controllers/taskController");

// Protected routes
router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
