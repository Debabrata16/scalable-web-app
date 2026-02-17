const db = require("../config/db");

// Get all tasks
exports.getTasks = (req, res) => {

    db.query(
        "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
        [req.user.id],
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

// Create new task
exports.createTask = (req, res) => {

    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    db.query(
        "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
        [title, description, req.user.id],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({ message: "Task created successfully" });
        }
    );
};

// Delete task
exports.deleteTask = (req, res) => {

    const taskId = req.params.id;

    db.query(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [taskId, req.user.id],
        (err) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({ message: "Task deleted successfully" });
        }
    );
};
