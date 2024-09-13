"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const db_1 = __importDefault(require("../db"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, "../../uploads");
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/test', (req, res) => {
    console.log('Body:', req.body);
    res.status(200).send('Received data');
});
// Create user and upload image
router.post("/", upload.single("image"), async (req, res) => {
    const { first_name, last_name, phone_num, mail, rank, floor, office_num, service, } = req.body;
    const image = req.file ? req.file.path : null; // Local path of uploaded file
    try {
        const result = await db_1.default.query("INSERT INTO users (first_name, last_name, phone_num, mail, rank, floor, office_num, image, service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [first_name, last_name, phone_num, mail, rank, floor, office_num, image, service]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error creating user:", err);
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
// Read user by id
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
        console.error("Error fetching user by id:", err);
        res.status(500).send("Server error");
    }
});
// Update user
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone_num, mail, rank, floor, office_num, image, service, } = req.body;
    try {
        const result = await db_1.default.query("UPDATE users SET first_name = $1, last_name = $2, phone_num = $3, mail = $4, rank = $5, floor = $6, office_num = $7, image = $8, service = $9 WHERE id = $10 RETURNING *", [first_name, last_name, phone_num, mail, rank, floor, office_num, image, service, id]);
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
