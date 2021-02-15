export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      roleValue: DataTypes.INTEGER,
      roleName: DataTypes.STRING,
      roleDescription: DataTypes.STRING,
    },
    {}
  );

  Role.associate = (models) => {
    // associations can be defined here
  };
  return Role;
};
