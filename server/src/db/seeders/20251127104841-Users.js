module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Иван Моков',
          email: 'ivanmok@mail.ru',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Гиорги Мокошвили',
          email: 'giomok@mail.ru',
          password: '456',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Елена Моковская',
          email: 'lenamok@mail.ru',
          password: '789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
