export default (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      uniqueId: DataTypes.STRING,
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      level: DataTypes.STRING,
      secretKey: DataTypes.STRING,
    },
    {},
  );
  Admin.associate = (models) => {
    // associations can be defined here
  };
  return Admin;
};
