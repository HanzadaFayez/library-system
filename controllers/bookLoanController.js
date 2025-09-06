// controllers/bookLoanController.js
const { BookLoan, Book, Borrower } = require("../models");
const { Op } = require("sequelize");

// Checkout a book
exports.checkoutBook = async (req, res) => {
  try {
    const { book_id, borrower_id } = req.body;

    // Check book exists and available
    const book = await Book.findByPk(book_id);
    if (!book || book.available_quantity <= 0) {
      return res.status(400).json({ error: "Book not available" });
    }

    // Create loan
    const loan = await BookLoan.create({ book_id, borrower_id });

    // Decrease available quantity
    await book.update({ available_quantity: book.available_quantity - 1 });

    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const loan = await BookLoan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ error: "Loan not found" });

    if (loan.return_date) {
      return res.status(400).json({ error: "Book already returned" });
    }

    loan.return_date = new Date();
    await loan.save();

    // Increase available quantity
    const book = await Book.findByPk(loan.book_id);
    await book.update({ available_quantity: book.available_quantity + 1 });

    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Books currently borrowed by a borrower
exports.borrowerBooks = async (req, res) => {
  try {
    const loans = await BookLoan.findAll({
      where: { borrower_id: req.params.id, return_date: null },
      include: [Book]
    });
    res.json(loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Overdue books
exports.overdueBooks = async (req, res) => {
  try {
    const today = new Date();
    const overdue = await BookLoan.findAll({
      where: {
        due_date: { [Op.lt]: today },
        return_date: null
      },
      include: [Book, Borrower]
    });
    res.json(overdue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
