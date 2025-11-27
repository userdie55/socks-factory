module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Patterns', [
      {
        title: 'Горошек',
        url: 'https://www.pngkey.com/png/full/10-105184_polka-dots-pattern-png-dot-pattern-png-transparent.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Полоски',
        url: 'https://www.pngmart.com/files/23/Black-Stripes-Transparent-PNG.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Звезды',
        url: 'https://png.pngtree.com/png-vector/20240201/ourmid/pngtree-white-stars-seamless-pattern-png-png-image_11526997.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patterns', null, {});
  }
};