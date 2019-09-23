export default (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    'Follower',
    {
      userId: DataTypes.INTEGER,
      followerId: DataTypes.INTEGER,
    },
    {},
  );
  Follower.associate = (models) => {
    // associations can be defined here
  };
  return Follower;
};
