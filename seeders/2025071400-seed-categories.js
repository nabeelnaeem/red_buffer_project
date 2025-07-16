/** @type {import('sequelize-cli').Seed} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        category_id: 'a1bbfbb1-56a2-4432-b54b-7c0980cbfc18',
        name: 'Electronics',
        description: 'Electronic gadgets and devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '3cd3f4bc-8e5b-4d16-a7df-5a8343d82e77',
        name: 'Books',
        description: 'All kinds of books and novels',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'ec4c20a8-b246-4346-b0da-c7331c1e22d1',
        name: 'Clothing',
        description: 'Men and Women clothing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'c26ea8fe-7da9-49c4-904a-9689ac282033',
        name: 'Home Appliances',
        description: 'Appliances for home use',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '908fd655-7b28-418a-9fd8-9d38679f834a',
        name: 'Toys',
        description: 'Toys for kids of all ages',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'bad6c269-c1fb-4416-9796-ca3361fc9272',
        name: 'Sports',
        description: 'Sports equipment and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '49a564dd-673b-4746-8bfe-cb655b3b5ccf',
        name: 'Beauty',
        description: 'Beauty and personal care products',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'b25fe671-3437-4d6b-a29d-f95d5e329659',
        name: 'Furniture',
        description: 'Home and office furniture',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '27c5cefb-33eb-4a52-9242-b554010df167',
        name: 'Grocery',
        description: 'Everyday grocery items',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '84180371-7e3d-4145-afd5-278c74d93519',
        name: 'Stationery',
        description: 'Office and school supplies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'f2f8fa04-ab77-4b70-b1db-de18066ae4a7',
        name: 'Jewelry',
        description: 'Fine jewelry and watches',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: '1f67c8b4-4d05-49d5-a6ac-11e9da678cf0',
        name: 'Automotive',
        description: 'Car parts and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'be019812-3535-433f-a587-bcaa6ebfe5fd',
        name: 'Health',
        description: 'Health and wellness products',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'e752697d-b91e-45d4-b873-c6d7b8738d8c',
        name: 'Pet Supplies',
        description: 'Products for pets and animals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 'd8fdc4d3-af0b-4fe9-8f98-3dc730b9be22',
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
