import express, { Request, Response } from 'express'; 
const router = express.Router();
import pool from '../db'; 

interface Doc {
  id: number;
  name: string;
  category: string;
}

// C - Create
router.post("/", async (req: Request, res: Response) => {
  const { name, category } = req.body;
  try {
    const result = await pool.query<Doc>(
      "INSERT INTO docs (name, category) VALUES ($1, $2) RETURNING *",
      [name, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// R - Read all
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Doc>("SELECT * FROM docs");
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
    const result = await pool.query<Doc>("SELECT * FROM docs WHERE id = $1", [id]);
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
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category } = req.body;
  try {
    const result = await pool.query<Doc>(
      "UPDATE docs SET name = $1, category = $2 WHERE id = $3 RETURNING *",
      [name, category, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Document not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// D - Delete
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query<Doc>(
      "DELETE FROM docs WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Document not found");
    }
    res.status(200).send("Document deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;  
