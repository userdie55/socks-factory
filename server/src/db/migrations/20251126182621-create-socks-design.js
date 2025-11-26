module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SocksDesigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' },
      },
      color_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Color', key: 'id' },
      },
      image_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Image', key: 'id' },
      },
      pattern_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Pattern', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SocksDesigns');
  },
};
