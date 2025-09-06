'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Books: fast search
    await queryInterface.addIndex('books', ['title'], { name: 'idx_books_title' });
    await queryInterface.addIndex('books', ['author'], { name: 'idx_books_author' });
    await queryInterface.addIndex('books', ['isbn'], { name: 'idx_books_isbn' }); // unique already, index helps queries

    // Borrowers: quick lookup
    await queryInterface.addIndex('borrowers', ['email'], { name: 'idx_borrowers_email' });

    // Book loans: speed up overdue + "current loans for borrower"
    await queryInterface.addIndex('book_loans', ['borrower_id', 'return_date'], { name: 'idx_loans_borrower_open' });
    await queryInterface.addIndex('book_loans', ['due_date', 'return_date'], { name: 'idx_loans_overdue' });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('books', 'idx_books_title');
    await queryInterface.removeIndex('books', 'idx_books_author');
    await queryInterface.removeIndex('books', 'idx_books_isbn');
    await queryInterface.removeIndex('borrowers', 'idx_borrowers_email');
    await queryInterface.removeIndex('book_loans', 'idx_loans_borrower_open');
    await queryInterface.removeIndex('book_loans', 'idx_loans_overdue');
  },
};
