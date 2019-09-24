export default (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      uniqueId: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      secretKey: DataTypes.STRING,
      level: DataTypes.STRING,
    },
    {},
  );
  Admin.associate = (models) => {
    // associations can be defined here
    // Admin.hasOne(models.Profile, {
    //   foreignKey: 'adminId',
    //   as: 'Profile',
    // });
  };
  return Admin;
};
