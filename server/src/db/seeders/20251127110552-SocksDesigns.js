module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'SocksDesigns',
      [
        {
          user_id: 2,
          color_id: 1,
          image_id: 1,
          pattern_id: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          color_id: 5,
          image_id: 3,
          pattern_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          color_id: 3,
          image_id: 2,
          pattern_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          color_id: 1,
          image_id: 2,
          pattern_id: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SocksDesigns', null, {});
  },
};
