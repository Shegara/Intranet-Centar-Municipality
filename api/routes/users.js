const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import pool from db.js

// C - CREATE A NEW USER
router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    phone_num,
    mail,
    rank,
    floor,
    office_num,
    image,
    service,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, phone_num, mail, rank, floor, office_num, image, service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        first_name,
        last_name,
        phone_num,
        mail,
        rank,
        floor,
        office_num,
        image,
        service,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// R - READ ALL USERS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// R - READ USER BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// U - UPDATE USER
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    phone_num,
    mail,
    rank,
    floor,
    office_num,
    image,
    service,
  } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, phone_num = $3, mail = $4, rank = $5, floor = $6, office_num = $7, image = $8, service = $9 WHERE id = $10 RETURNING *",
      [
        first_name,
        last_name,
        phone_num,
        mail,
        rank,
        floor,
        office_num,
        image,
        service,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// D - DELETE USER
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
