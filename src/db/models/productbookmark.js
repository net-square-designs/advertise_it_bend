export default (sequelize, DataTypes) => {
  const ProductBookmark = sequelize.define(
    'ProductBookmark',
    {
      productId: DataTypes.INTEGER,
      bookmarkerId: DataTypes.INTEGER,
    },
    {},
  );
  ProductBookmark.associate = (models) => {
    // associations can be defined here
    ProductBookmark.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
  };
  return ProductBookmark;
};
