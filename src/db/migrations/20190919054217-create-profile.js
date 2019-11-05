module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Profiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    middleName: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.TEXT,
    },
    storeName: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    dateOfBirth: {
      type: Sequelize.STRING,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    stateOfOrigin: {
      type: Sequelize.STRING,
    },
    stateOfResidence: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
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
  down: queryInterface => queryInterface.dropTable('Profiles'),
};
