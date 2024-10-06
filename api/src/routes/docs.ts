import express, { Request, Response } from 'express'; 
import pool from '../db'; 
import upload from '../config/multerConfig'; 

const router = express.Router();

// C - Create
router.post("/", upload.single('document'), async (req: Request, res: Response) => {
  try {
    const { category, name } = req.body;
    const document = 'http://localhost:8800/uploads/' + req.file?.filename;

    const result = await pool.query(
      "INSERT INTO docs (name, category, document) VALUES ($1, $2, $3) RETURNING *",
      [name, category, document]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating document:", err);
    res.status(500).send("Server error");
  }
});

// R - Read all
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM docs");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// R - Read one by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM docs WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Document not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// U - Update
router.put("/:id", upload.single('document'), async (req: Request, res: Response) => {
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

    const result = await pool.query(query, [name, category, documentURL, id])

    if (result.rows.length === 0) {
      return res.status(404).send("Document not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).send("Server error");
  }
});

// D - Delete 
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM docs WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Document not found");
    }

    res.status(200).send("Document deleted");
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).send("Server error");
  }
});



export default router;  
