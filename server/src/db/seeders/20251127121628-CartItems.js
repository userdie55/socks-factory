module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'CartItems',
      [
        {
          cart_id: 2,
          design_id: 3,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cart_id: 1,
          design_id: 4,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cart_id: 1,
          design_id: 1,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CartItems', null, {});
  },
};
