// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert(
//       'Colors',
//       [
//         {
//           title: 'Классический белый',
//           hex: '#FFFFFF',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Глубокий черный',
//           hex: '#000000',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Кирпично-красный',
//           hex: '#C0392B',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Лесной зеленый',
//           hex: '#27AE60',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Спокойный синий',
//           hex: '#2980B9',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {},
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Colors', null, {});
//   },
// };
