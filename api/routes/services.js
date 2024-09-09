const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// C - Create
router.post("/", async (req, res) => {
  const { name, category } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO services (name, category) VALUES ($1, $2) RETURNING *",
      [name, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// R - READ ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// R - READ SERVICE BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Service not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// U - UPDATE SERVICE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  try {
    const result = await pool.query(
      "UPDATE services SET name = $1, category = $2 WHERE id = $3 RETURNING *",
      [name, category, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Service not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// D - DELETE SERVICE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM services WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Service not found");
    }
    res.status(200).send("Service deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
