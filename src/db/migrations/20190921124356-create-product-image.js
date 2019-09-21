module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProductImages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
    isMainImage: {
      type: Sequelize.BOOLEAN,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
        as: 'productId',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('ProductImages'),
};
