const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;
app.use(express.static(__dirname));
const mysql = require('mysql2');

// Create the connection to MySQL Workbench
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // This is usually 'root'
  password: 'Evelyn21:)', // Replace with your actual MySQL password
  database: 'book_db'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('✅ MySQL Workbench Connected!');
  // This listens for when someone clicks "Order Now" on your website
app.post('/order', (req, res) => {
    const { title, author } = req.body; // Grabs the text from your form
    const sql = 'INSERT INTO orders (title, author) VALUES (?, ?)';
    
    connection.query(sql, [title, author], (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            res.status(500).send("Error saving to MySQL");
        } else {
            // This is the message you will see in your browser on success
            res.send('✅ Success: Book saved to MySQL Workbench!');
        }
    });
});
});