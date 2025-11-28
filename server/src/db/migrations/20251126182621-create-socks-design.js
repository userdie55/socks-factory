module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SocksDesigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      colorHex: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      patternName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      patternColorHex: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageX: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      imageY: {
        allowNull: false,
        type: Sequelize.INTEGER,   
      },
      preview: {
        allowNull: false,
        type: Sequelize.TEXT,
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
