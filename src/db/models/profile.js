// @ts-nocheck
// eslint-disable-next-line no-unused-vars
import Sequelize from 'sequelize';
/**
 * @param {*} sequelize
 * @param {Sequelize.DataTypes} DataTypes
 *
 * @returns {Sequelize.Model} Model
 */
export default (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      middlename: DataTypes.STRING,
      image: DataTypes.STRING,
      bio: DataTypes.TEXT,
      storeName: DataTypes.STRING,
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
