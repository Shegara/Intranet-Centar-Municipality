"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const router = express_1.default.Router();
// C - Create
router.post("/", multerConfig_1.default.single('document'), async (req, res) => {
    try {
        const { category, name } = req.body;
        const document = 'http://localhost:8800/uploads/' + req.file?.filename;
        const result = await db_1.default.query("INSERT INTO docs (name, category, document) VALUES ($1, $2, $3) RETURNING *", [name, category, document]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error creating document:", err);
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
router.put("/:id", multerConfig_1.default.single('document'), async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const documentURL = req.file ? 'http://localhost:8800/uploads/' + req.file.filename : null;
    try {
        const query = `
      UPDATE docs 
      SET name = COALESCE($1, name), 
          category = COALESCE($2, category), 
          document = COALESCE($3, document) 
      WHERE id = $4 
      RETURNING *`;
        const result = await db_1.default.query(query, [name, category, documentURL, id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Document not found");
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error updating document:", err);
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
        console.error("Error deleting document:", err);
        res.status(500).send("Server error");
    }
});
exports.default = router;
