module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Patterns', [
      {
        title: 'Горошек',
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Полоски',
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Клетка',
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patterns', null, {});
  }
};