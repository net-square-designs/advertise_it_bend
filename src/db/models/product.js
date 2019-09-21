export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Product.associate = (models) => {
    // associations can be defined here
    Product.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      as: 'ProductImages',
    });
  };
  return Product;
};
