export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uniqueId: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      secretKey: DataTypes.STRING,
      accountType: DataTypes.STRING,
    },
    {},
  );
  User.associate = (models) => {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'Profile',
    });
    User.hasMany(models.Follower, {
      foreignKey: 'userId',
      as: 'Followers',
    });
  };
  return User;
};
