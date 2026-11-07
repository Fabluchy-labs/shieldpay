const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = new Pool({
    connectionString:
process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const createInvoicesTable = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS invoices (
          id VARCHAR(50) PRIMARY KEY,
          customer VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          amount NUMERIC(12, 2) NOT NULL,
          description TEXT,
          due_date DATE NOT NULL,
          status VARCHAR(20) DEFAULT 'Pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
  
      console.log("Invoices table is ready.");
    } catch (error) {
      console.error("Database setup failed:", error.message);
    }
  };
  
  createInvoicesTable();

  pool.query("SELECT NOW()")
  .then(() => console.log("Neon database connected successfully!"))
  .catch((error) => console.error("Database connection failed:", error.message));
let invoices = [];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ShieldPay API",
    status: "Server is running",
  });
});

app.get("/api/invoices", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM invoices ORDER BY created_at DESC"
      );
  
      res.json({
        success: true,
        invoices: result.rows,
      });
    } catch (error) {
      console.error("Error fetching invoices:", error.message);
  
      res.status(500).json({
        success: false,
        message: "Failed to fetch invoices",
      });
    }
  });
  
  app.post("/api/invoices", async (req, res) => {
    try {
      const {
        customer,
        email,
        amount,
        description,
        dueDate
      } = req.body;
  
      if (!customer || !email || !amount || !dueDate) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required invoice details."
        });
      }
  
      const id = `INV-${Date.now()}`;
  
      const result = await pool.query(
        `INSERT INTO invoices
         (id, customer, email, amount, description, due_date)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [id, customer, email, amount, description || "", dueDate]
      );
  
      res.status(201).json({
        success: true,
        message: "Invoice created successfully",
        invoice: result.rows[0]
      });
  
    } catch (error) {
      console.error("Error creating invoice:", error.message);
  
      res.status(500).json({
        success: false,
        message: "Failed to create invoice"
      });
    }
  });
  
    
app.listen(PORT, () => {
  console.log(`ShieldPay server running on port ${PORT}`);
});