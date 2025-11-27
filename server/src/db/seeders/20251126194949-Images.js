module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        title: 'Пицца',
        url: 'https://vectorjungal.com/files/preview/960x960/11721161243fyyregooyx8xnt383dcdprnoozccrmgsvpjszoulhwpkwq5rxgu4fbyntettsrl1ujgnjtrfrzyqi0retegr56svj0f0yw0xegno.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Кошачья мордочка',
        url: 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f431.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Утка',
        url: 'https://pngimg.com/d/rubber_duck_PNG52.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};