module.exports = (sequelize, DataTypes) => {
const Borrower = sequelize.define("Borrower", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false }
}, {
  tableName: "borrowers",
  underscored: true
});


  Borrower.associate = (models) => {
    Borrower.hasMany(models.BookLoan, { foreignKey: "borrower_id" });
  };

  return Borrower;
};
