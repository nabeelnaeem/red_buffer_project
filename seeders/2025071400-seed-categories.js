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
      },
      {
        category_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Jewelry',
        description: 'Fine jewelry and watches',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        name: 'Automotive',
        description: 'Car parts and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        name: 'Health',
        description: 'Health and wellness products',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        name: 'Pet Supplies',
        description: 'Products for pets and animals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
        name: 'Baby',
        description: 'Baby care and essentials',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '01234567-89ab-cdef-0123-456789abcdef',
        name: 'Tools',
        description: 'Hardware and DIY tools',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '12345678-90ab-cdef-1234-567890abcdef',
        name: 'Outdoor',
        description: 'Camping and outdoor gear',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '23456789-01ab-cdef-2345-678901abcdef',
        name: 'Art',
        description: 'Art supplies and crafts',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '34567890-12ab-cdef-3456-789012abcdef',
        name: 'Music',
        description: 'Musical instruments and equipment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '45678901-23ab-cdef-4567-890123abcdef',
        name: 'Movies',
        description: 'DVDs and Blu-ray discs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '56789012-34ab-cdef-5678-901234abcdef',
        name: 'Gaming',
        description: 'Video games and consoles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '67890123-45ab-cdef-6789-012345abcdef',
        name: 'Computers',
        description: 'PCs, laptops and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '78901234-56ab-cdef-7890-123456abcdef',
        name: 'Phones',
        description: 'Smartphones and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '89012345-67ab-cdef-8901-234567abcdef',
        name: 'Photography',
        description: 'Cameras and photography gear',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '90123456-78ab-cdef-9012-345678abcdef',
        name: 'Luggage',
        description: 'Bags and travel accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d4',
        name: 'Fitness',
        description: 'Exercise and fitness equipment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'b2c3d4e5-f6a1-b2c3-d4e5-f6a1b2c3d4e5',
        name: 'Industrial',
        description: 'Industrial and scientific supplies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'c3d4e5f6-a1b2-c3d4-e5f6-a1b2c3d4e5f6',
        name: 'Collectibles',
        description: 'Collectible items and memorabilia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'd4e5f6a1-b2c3-d4e5-f6a1-b2c3d4e5f6a1',
        name: 'Software',
        description: 'Computer software and apps',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'e5f6a1b2-c3d4-e5f6-a1b2-c3d4e5f6a1b2',
        name: 'Party Supplies',
        description: 'Party decorations and supplies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'f6a1b2c3-d4e5-f6a1-b2c3-d4e5f6a1b2c3',
        name: 'Office Electronics',
        description: 'Printers, scanners and office tech',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
