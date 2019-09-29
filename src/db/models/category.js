module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {},
  );
  Category.associate = (models) => {
    // associations can be defined here
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'Products',
    });
  };
  return Category;
};
