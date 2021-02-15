module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Roles',
      [
        {
          roleValue: 0,
          roleName: 'User',
          roleDescription: 'This is the low level user, apartment holder',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleValue: 1,
          roleName: 'Technician',
          roleDescription: 'This is the Technician',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleValue: 2,
          roleName: 'Admin',
          roleDescription: 'This is the Administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Roles', null, {}),
};
