export default (sequelize, DataTypes) => {
  const PromoterRequest = sequelize.define(
    'PromoterRequest',
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      facebookUrl: DataTypes.STRING,
      twitterUrl: DataTypes.STRING,
      instagramUrl: DataTypes.STRING,
      approvedBy: DataTypes.INTEGER,
    },
    {},
  );
  PromoterRequest.associate = (models) => {
    // associations can be defined here
  };
  return PromoterRequest;
};
