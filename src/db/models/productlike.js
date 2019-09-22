export default (sequelize, DataTypes) => {
  const ProductLike = sequelize.define(
    'ProductLike',
    {
      productId: DataTypes.INTEGER,
      likerId: DataTypes.INTEGER,
    },
    {},
  );
  ProductLike.associate = (models) => {
    // associations can be defined here
    ProductLike.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
  };
  return ProductLike;
};
