module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Apartments',
      [
        {
          name: 'Appartment 1',
          address: 'Address 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Appartment 2',
          address: 'Address 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Appartment 3',
          address: 'Address 3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Appartment 4',
          address: 'Address 4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Appartment 5',
          address: 'Address 5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Apartments', null, {}),
};
