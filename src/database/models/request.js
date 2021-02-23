export default (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Request',
    {
      description: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      serialNo: DataTypes.STRING,
      modelNumber: DataTypes.STRING,
      technicianNote: DataTypes.STRING,
      clientNames: DataTypes.STRING,
      clientAddress: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
    }
  );

  Request.associate = (models) => {
    // associations can be defined here
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Request;
};
