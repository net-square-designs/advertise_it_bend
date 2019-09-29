module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      message: DataTypes.TEXT,
      media: DataTypes.STRING,
      mediaType: {
        type: DataTypes.STRING,
        defaultValue: 'Text',
      },
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      chatId: {
        type: DataTypes.STRING,
      },
      // messageHash: DataTypes.STRING,
    },
    {},
  );
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
    });
    Message.belongsTo(models.Chat, {
      foreignKey: 'chatId',
    });
  };
  return Message;
};
