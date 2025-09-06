// app.js
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

// Import routes
const bookRoutes = require("./routes/bookRoutes");
const borrowerRoutes = require("./routes/borrowerRoutes");
const bookLoanRoutes = require("./routes/bookLoanRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/books", bookRoutes);
app.use("/borrowers", borrowerRoutes);
app.use("/loans", bookLoanRoutes);

// Test DB connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");
    return sequelize.sync(); // create tables if they don’t exist
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ DB Error: ", err));
