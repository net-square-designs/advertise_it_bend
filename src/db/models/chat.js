module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      chatId: {
        type: DataTypes.STRING,
        unique: true,
      },
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
    },
    {},
  );
  Chat.associate = (models) => {
    // associations can be defined here
    Chat.hasMany(models.Message, {
      foreignKey: 'chatId',
      as: 'Messages',
    });
  };
  return Chat;
};
