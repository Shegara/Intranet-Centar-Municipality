"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const router = express_1.default.Router();
// POST route for creating a new user with image upload
router.post("/", multerConfig_1.default.single('image'), async (req, res) => {
    try {
        const { first_name, last_name, phone_num, mail, rank, floor, office_num, service } = req.body;
        const image = req.file ? 'http://localhost:8800/uploads/' + req.file?.filename : null;
        const result = await db_1.default.query("INSERT INTO users (first_name, last_name, phone_num, mail, rank, floor, office_num, image, service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [
            first_name,
            last_name,
            phone_num,
            mail,
            rank,
            floor,
            office_num,
            image,
            service,
        ]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Server error");
    }
});
//PUT route for user update 
router.put("/:id", multerConfig_1.default.single('image'), async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone_num, mail, rank, floor, office_num, service, } = req.body;
    // Handle file upload
    const image = req.file ? 'http://localhost:8800/uploads/' + req.file.filename : null;
    try {
        const result = await db_1.default.query("UPDATE users SET first_name = $1, last_name = $2, phone_num = $3, mail = $4, rank = $5, floor = $6, office_num = $7, image = $8, service = $9 WHERE id = $10 RETURNING *", [
            first_name,
            last_name,
            phone_num,
            mail,
            rank,
            floor,
            office_num,
            image || null,
            service,
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Server error");
    }
});
// Read all users
router.get("/", async (_req, res) => {
    try {
        const result = await db_1.default.query("SELECT * FROM users");
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Server error");
    }
});
// Read user by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(500).send("Server error");
    }
});
// Delete user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted");
    }
    catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Server error");
    }
});
exports.default = router;
