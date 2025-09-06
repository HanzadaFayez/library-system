const db = require("../models");
const { Op } = require("sequelize");
const Book = db.Book;

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, available_quantity, shelf_location } = req.body;
    const book = await Book.create({ title, author, isbn, available_quantity, shelf_location });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update book details
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Book.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Book not found" });

    const updatedBook = await Book.findByPk(id);
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search for a book by title, author, or ISBN
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
          { isbn: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
