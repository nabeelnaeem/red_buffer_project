/** @type {import('sequelize-cli').Seed} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        category_id: '11111111-1111-1111-1111-111111111111',
        name: 'Electronics',
        description: 'Electronic gadgets and devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '22222222-2222-2222-2222-222222222222',
        name: 'Books',
        description: 'All kinds of books and novels',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '33333333-3333-3333-3333-333333333333',
        name: 'Clothing',
        description: 'Men and Women clothing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '44444444-4444-4444-4444-444444444444',
        name: 'Home Appliances',
        description: 'Appliances for home use',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '55555555-5555-5555-5555-555555555555',
        name: 'Toys',
        description: 'Toys for kids of all ages',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '66666666-6666-6666-6666-666666666666',
        name: 'Sports',
        description: 'Sports equipment and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '77777777-7777-7777-7777-777777777777',
        name: 'Beauty',
        description: 'Beauty and personal care products',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '88888888-8888-8888-8888-888888888888',
        name: 'Furniture',
        description: 'Home and office furniture',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '99999999-9999-9999-9999-999999999999',
        name: 'Grocery',
        description: 'Everyday grocery items',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Stationery',
        description: 'Office and school supplies',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
