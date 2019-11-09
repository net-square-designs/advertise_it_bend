export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
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
    Product.hasMany(models.ProductBookmark, {
      foreignKey: 'productId',
      as: 'ProductBookmarks',
    });
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Product.belongsTo(models.Profile, {
      foreignKey: 'userId',
      as: 'Owner',
    });
  };
  return Product;
};
