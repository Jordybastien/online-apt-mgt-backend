export default (sequelize, DataTypes) => {
  const Apartment = sequelize.define(
    'Apartment',
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {}
  );

  Apartment.associate = (models) => {
    // associations can be defined here
  };
  return Apartment;
};
