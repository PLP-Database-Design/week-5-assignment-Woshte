const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Initialize express and dotenv
dotenv.config();
const app = express();

// Set up the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the database connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Basic server setup
app.use(express.json());  // To parse JSON bodies

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving patients');
    }
    res.json(results);
  });
});


// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers');
    }
    res.json(results);
  });
});

// Question 3: Filter patients by first name
app.get('/patients/filter', (req, res) => {
  const { first_name } = req.query;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

  db.query(query, [first_name], (err, results) => {
    if (err) {
      return res.status(500).send('Error filtering patients by first name');
    }
    res.json(results);
  });
});

// Listen on a port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




