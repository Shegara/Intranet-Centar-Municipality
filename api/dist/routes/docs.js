"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = __importDefault(require("../db"));
// C - Create
router.post("/", async (req, res) => {
    const { name, category } = req.body;
    try {
        const result = await db_1.default.query("INSERT INTO docs (name, category) VALUES ($1, $2) RETURNING *", [name, category]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
// R - Read all
router.get("/", async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT * FROM docs");
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
// R - Read one by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM docs WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Document not found");
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
// U - Update
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;
    try {
        const result = await db_1.default.query("UPDATE docs SET name = $1, category = $2 WHERE id = $3 RETURNING *", [name, category, id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Document not found");
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
// D - Delete
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query("DELETE FROM docs WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Document not found");
        }
        res.status(200).send("Document deleted");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
exports.default = router;
