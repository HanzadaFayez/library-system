'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('book_loans', 'due_date', {
      type: Sequelize.DATE,
      allowNull: true,  // allow null for old records
    });

    await queryInterface.sequelize.query(`
      UPDATE book_loans
      SET due_date = DATE_ADD(loan_date, INTERVAL 14 DAY)
      WHERE due_date IS NULL
    `);

    // Then make it NOT NULL
    await queryInterface.changeColumn('book_loans', 'due_date', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('book_loans', 'due_date');
  },
};
