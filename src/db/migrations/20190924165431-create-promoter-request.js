module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PromoterRequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    facebookUrl: {
      type: Sequelize.STRING,
    },
    twitterUrl: {
      type: Sequelize.STRING,
    },
    instagramUrl: {
      type: Sequelize.STRING,
    },
    approvedBy: {
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('PromoterRequests'),
};
