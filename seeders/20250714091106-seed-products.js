/** @type {import('sequelize-cli').Seed} */

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        product_id: '55ea145a-f505-4bc0-b8d7-60a5f689ea0e',
        category_id: '11111111-1111-1111-1111-111111111111',
        name: 'Smartphone X200',
        description: 'Latest 5G smartphone',
        stock: 50,
        price: 699.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '6e9f52b5-90ca-4e9f-9477-2aebe1641adb',
        category_id: '11111111-1111-1111-1111-111111111111',
        name: 'Bluetooth Earbuds',
        description: 'Noise-cancelling wireless earbuds',
        stock: 80,
        price: 129.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '191d40bd-e976-4ba7-b3ed-d297157eab66',
        category_id: '11111111-1111-1111-1111-111111111111',
        name: 'Smartwatch Pro',
        description: 'Fitness tracking smartwatch',
        stock: 60,
        price: 199.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Books
      {
        product_id: '976a84be-062a-4232-b502-c8400c915f80',
        category_id: '22222222-2222-2222-2222-222222222222',
        name: 'The Great Gatsby',
        description: 'Classic American novel',
        stock: 100,
        price: 9.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'a94b2798-947c-4321-be5f-3bf929fcd741',
        category_id: '22222222-2222-2222-2222-222222222222',
        name: 'Clean Code',
        description: 'Book on software craftsmanship',
        stock: 40,
        price: 34.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '98433389-eb81-4676-a00a-be44443652de',
        category_id: '22222222-2222-2222-2222-222222222222',
        name: 'Atomic Habits',
        description: 'Self-help book for behavior change',
        stock: 70,
        price: 14.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Clothing
      {
        product_id: 'e1348165-7c58-49aa-9480-4c9ab3f9116e',
        category_id: '33333333-3333-3333-3333-333333333333',
        name: 'Men’s T-Shirt',
        description: '100% cotton T-shirt',
        stock: 200,
        price: 12.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'd8bd8deb-a9b8-4aab-b24d-7b3482f2b00f',
        category_id: '33333333-3333-3333-3333-333333333333',
        name: 'Women’s Hoodie',
        description: 'Warm fleece hoodie',
        stock: 150,
        price: 29.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'ff13c98e-72b0-40b7-9ebe-7e42582d355c',
        category_id: '33333333-3333-3333-3333-333333333333',
        name: 'Kids’ Jeans',
        description: 'Denim jeans for kids',
        stock: 90,
        price: 19.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Home Appliances
      {
        product_id: '9e606198-9e51-4265-a2b6-7d73a203e838',
        category_id: '44444444-4444-4444-4444-444444444444',
        name: 'Microwave Oven',
        description: '1000W microwave oven',
        stock: 30,
        price: 99.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'ed981ab2-6674-4e15-b769-092414fd62a6',
        category_id: '44444444-4444-4444-4444-444444444444',
        name: 'Air Conditioner',
        description: 'Split AC 1.5 Ton',
        stock: 20,
        price: 499.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '12df0d0e-1196-4564-bfc8-05edd298d9c1',
        category_id: '44444444-4444-4444-4444-444444444444',
        name: 'Vacuum Cleaner',
        description: 'Portable vacuum cleaner',
        stock: 40,
        price: 89.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Toys
      {
        product_id: '3155f10a-657a-4ce1-adca-ad750341467d',
        category_id: '55555555-5555-5555-5555-555555555555',
        name: 'Lego Set',
        description: 'Creative Lego building blocks',
        stock: 100,
        price: 59.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '68aac87c-60d2-4dce-86b3-67b7386a9c00',
        category_id: '55555555-5555-5555-5555-555555555555',
        name: 'Remote Car',
        description: 'Rechargeable remote-controlled car',
        stock: 70,
        price: 39.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'faf5af8d-a71b-4f97-8926-6fb7048e0475',
        category_id: '55555555-5555-5555-5555-555555555555',
        name: 'Stuffed Bear',
        description: 'Soft teddy bear toy',
        stock: 120,
        price: 24.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Sports
      {
        product_id: '2cf3cf7e-8361-4481-8f39-16dcdb0bd89f',
        category_id: '66666666-6666-6666-6666-666666666666',
        name: 'Football',
        description: 'Professional size 5 football',
        stock: 60,
        price: 19.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'ccb6b7a8-5457-4428-b1ba-080d9f8d5af4',
        category_id: '66666666-6666-6666-6666-666666666666',
        name: 'Cricket Bat',
        description: 'Wooden cricket bat',
        stock: 40,
        price: 34.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '24a430bf-563a-49bd-a8da-b68e53bb00e3',
        category_id: '66666666-6666-6666-6666-666666666666',
        name: 'Tennis Racket',
        description: 'Lightweight racket for beginners',
        stock: 35,
        price: 59.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Beauty
      {
        product_id: 'aa0d11a3-9c69-4464-a504-fe030541e2a7',
        category_id: '77777777-7777-7777-7777-777777777777',
        name: 'Face Wash',
        description: 'Gentle foaming face wash',
        stock: 200,
        price: 6.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'e60864c3-b999-409f-9d31-16829d4dd747',
        category_id: '77777777-7777-7777-7777-777777777777',
        name: 'Hair Oil',
        description: 'Natural nourishing hair oil',
        stock: 100,
        price: 8.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '40c73547-3b1c-4e52-aef4-90dac08b952c',
        category_id: '77777777-7777-7777-7777-777777777777',
        name: 'Lipstick Set',
        description: 'Pack of 6 matte lipsticks',
        stock: 90,
        price: 14.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Furniture
      {
        product_id: 'a1ca98ff-210f-4f6d-a510-e27febcb93fc',
        category_id: '88888888-8888-8888-8888-888888888888',
        name: 'Office Chair',
        description: 'Ergonomic adjustable chair',
        stock: 25,
        price: 149.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '4b188542-2285-4505-b091-a92a525e7c23',
        category_id: '88888888-8888-8888-8888-888888888888',
        name: 'Wooden Table',
        description: 'Sturdy wooden dining table',
        stock: 10,
        price: 299.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'e22a9932-0724-405e-91e4-8a9d29f80b8d',
        category_id: '88888888-8888-8888-8888-888888888888',
        name: 'Sofa Set',
        description: '3-seater with cushions',
        stock: 8,
        price: 499.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Grocery
      {
        product_id: '8119eb8d-c1b5-4c23-a559-a7b31e790a45',
        category_id: '99999999-9999-9999-9999-999999999999',
        name: 'Organic Rice',
        description: '1kg long grain organic rice',
        stock: 100,
        price: 4.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '1d621242-4dbf-499c-9b79-d8e759320ff0',
        category_id: '99999999-9999-9999-9999-999999999999',
        name: 'Cooking Oil',
        description: 'Sunflower oil 1L',
        stock: 60,
        price: 5.99,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'a70df46d-a608-475c-9351-1c953310e3ea',
        category_id: '99999999-9999-9999-9999-999999999999',
        name: 'Flour Pack',
        description: '5kg whole wheat flour',
        stock: 50,
        price: 6.49,
        image_url: 'product.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
