export default (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      middlename: DataTypes.STRING,
      gender: DataTypes.STRING,
      dateOfBirth: DataTypes.STRING,
      nationality: DataTypes.STRING,
      stateOfOrigin: DataTypes.STRING,
      stateOfResidence: DataTypes.STRING,
      userType: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {},
  );
  Profile.associate = (models) => {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Profile;
};
