export default (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      image: DataTypes.STRING,
      isMainImage: DataTypes.BOOLEAN,
      productId: DataTypes.INTEGER,
    },
    {},
  );
  ProductImage.associate = (models) => {
    // associations can be defined here
    ProductImage.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
  };
  return ProductImage;
};
