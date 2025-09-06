// controllers/borrowerController.js
const { Borrower } = require("../models");

// Register a borrower
exports.createBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.create(req.body);
    res.json(borrower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update borrower
exports.updateBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByPk(req.params.id);
    if (!borrower) return res.status(404).json({ error: "Borrower not found" });
    await borrower.update(req.body);
    res.json(borrower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete borrower
exports.deleteBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByPk(req.params.id);
    if (!borrower) return res.status(404).json({ error: "Borrower not found" });
    await borrower.destroy();
    res.json({ message: "Borrower deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List all borrowers
exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    res.json(borrowers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
