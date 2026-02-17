const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {
                if (err) return res.status(500).json(err);

                if (result.length > 0) {
                    return res.status(400).json({ message: "User already exists" });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                    [name, email, hashedPassword],
                    (err) => {
                        if (err) return res.status(500).json(err);

                        res.status(201).json({ message: "User registered successfully" });
                    }
                );
            }
        );
    } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
}

};

// Login User
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {
            if (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
}


            if (result.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({
                message: "Login successful",
                token
            });
        }
    );
};
