module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SocksDesigns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
      },

      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Carts", key: "id" },
        onDelete: "SET NULL",
      },

      design_json: {
        type: Sequelize.JSONB,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("SocksDesigns");
  },
};
