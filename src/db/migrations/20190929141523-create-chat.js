module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Chats', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    chatId: {
      type: Sequelize.STRING,
      unique: true,
    },
    senderId: {
      type: Sequelize.INTEGER,
    },
    receiverId: {
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
  down: queryInterface => queryInterface.dropTable('Chats'),
};
