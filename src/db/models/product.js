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
    Product.hasMany(models.ProductView, {
      foreignKey: 'productId',
      as: 'ProductViews',
    });
    Product.hasMany(models.ProductLike, {
      foreignKey: 'productId',
      as: 'ProductLikes',
    });
  };
  return Product;
};
