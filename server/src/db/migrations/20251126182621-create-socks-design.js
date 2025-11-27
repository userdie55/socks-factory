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
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      color_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Colors', key: 'id' },
        onDelete: 'CASCADE'
      },
      image_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Images', key: 'id' },
        onDelete: 'CASCADE'
      },
      pattern_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Patterns', key: 'id' },
        onDelete: 'CASCADE'
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
