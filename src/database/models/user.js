export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      names: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      apartmentId: DataTypes.INTEGER,
    },
    {}
  );

  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
    });
    User.belongsTo(models.Apartment, {
      foreignKey: 'apartmentId',
    });
  };
  return User;
};
