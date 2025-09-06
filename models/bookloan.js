module.exports = (sequelize, DataTypes) => {
  const BookLoan = sequelize.define(
    "BookLoan",
    {
      loan_date: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      },
      due_date: { 
        type: DataTypes.DATE, 
        defaultValue: () => {
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 14); 
          return dueDate;
        }
      },
      return_date: { 
        type: DataTypes.DATE 
      }
    },
    {
      tableName: "book_loans",
      underscored: true,
    }
  );

  BookLoan.associate = (models) => {
    BookLoan.belongsTo(models.Book, { foreignKey: "book_id" });
    BookLoan.belongsTo(models.Borrower, { foreignKey: "borrower_id" });
  };

  return BookLoan;
};
