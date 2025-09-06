module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
    available_quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    shelf_location: { type: DataTypes.STRING }
  }, {
    tableName: "books",
    underscored: true
  });

  Book.associate = (models) => {
    Book.hasMany(models.BookLoan, { foreignKey: "book_id" });
  };

  return Book;
};
