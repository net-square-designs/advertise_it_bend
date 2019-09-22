export default (sequelize, DataTypes) => {
  const ProductView = sequelize.define(
    'ProductView',
    {
      productId: DataTypes.STRING,
      viewerId: DataTypes.STRING,
    },
    {},
  );
  ProductView.associate = (models) => {
    // associations can be defined here
    ProductView.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
  };
  return ProductView;
};
