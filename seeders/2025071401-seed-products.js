/** @type {import('sequelize-cli').Seed} */

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      // Clothing (ec4c20a8-b246-4346-b0da-c7331c1e22d1)
      {
        product_id: 'd8bd8deb-a9b8-4aab-b24d-7b3482f2b00f',
        category_id: 'ec4c20a8-b246-4346-b0da-c7331c1e22d1',
        name: "Women's Hoodie",
        description: "Warm fleece hoodie",
        stock: 150,
        price: 29.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'ff13c98e-72b0-40b7-9ebe-7e42582d355c',
        category_id: 'ec4c20a8-b246-4346-b0da-c7331c1e22d1',
        name: "Kids' Jeans",
        description: "Denim jeans for kids",
        stock: 90,
        price: 19.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890',
        category_id: 'ec4c20a8-b246-4346-b0da-c7331c1e22d1',
        name: "Men's T-Shirt",
        description: "Cotton crew neck t-shirt",
        stock: 200,
        price: 14.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Electronics (a1bbfbb1-56a2-4432-b54b-7c0980cbfc18)
      {
        product_id: 'b2c3d4e5-f6a1-4b2c-3d4e-5f6a1b2c3d4e',
        category_id: 'a1bbfbb1-56a2-4432-b54b-7c0980cbfc18',
        name: "Wireless Earbuds",
        description: "Bluetooth 5.0 noise-canceling",
        stock: 75,
        price: 79.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'c3d4e5f6-a1b2-4c3d-4e5f-6a1b2c3d4e5f',
        category_id: 'a1bbfbb1-56a2-4432-b54b-7c0980cbfc18',
        name: "Smart Watch",
        description: "Fitness tracker with heart rate monitor",
        stock: 50,
        price: 129.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Books (3cd3f4bc-8e5b-4d16-a7df-5a8343d82e77)
      {
        product_id: 'd4e5f6a1-b2c3-4d4e-5f6a-1b2c3d4e5f6a',
        category_id: '3cd3f4bc-8e5b-4d16-a7df-5a8343d82e77',
        name: "Science Fiction Novel",
        description: "Bestselling sci-fi paperback",
        stock: 120,
        price: 12.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Home Appliances (c26ea8fe-7da9-49c4-904a-9689ac282033)
      {
        product_id: 'e5f6a1b2-c3d4-4e5f-6a1b-2c3d4e5f6a1b',
        category_id: 'c26ea8fe-7da9-49c4-904a-9689ac282033',
        name: "Air Fryer",
        description: "5.5 qt digital air fryer",
        stock: 45,
        price: 89.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Toys (908fd655-7b28-418a-9fd8-9d38679f834a)
      {
        product_id: 'f6a1b2c3-d4e5-4f6a-1b2c-3d4e5f6a1b2c',
        category_id: '908fd655-7b28-418a-9fd8-9d38679f834a',
        name: "Building Blocks Set",
        description: "200-piece construction set",
        stock: 80,
        price: 24.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Sports (bad6c269-c1fb-4416-9796-ca3361fc9272)
      {
        product_id: '1a2b3c4d-5e6f-41a2-b3c4-d5e6f1a2b3c4',
        category_id: 'bad6c269-c1fb-4416-9796-ca3361fc9272',
        name: "Yoga Mat",
        description: "Eco-friendly non-slip mat",
        stock: 65,
        price: 29.95,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Beauty (49a564dd-673b-4746-8bfe-cb655b3b5ccf)
      {
        product_id: '2b3c4d5e-6f1a-42b3-c4d5-e6f1a2b3c4d5',
        category_id: '49a564dd-673b-4746-8bfe-cb655b3b5ccf',
        name: "Moisturizing Cream",
        description: "24-hour hydration face cream",
        stock: 110,
        price: 18.50,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Furniture (b25fe671-3437-4d6b-a29d-f95d5e329659)
      {
        product_id: '3c4d5e6f-1a2b-43c4-d5e6-f1a2b3c4d5e6',
        category_id: 'b25fe671-3437-4d6b-a29d-f95d5e329659',
        name: "Office Chair",
        description: "Ergonomic mesh back chair",
        stock: 30,
        price: 149.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Grocery (27c5cefb-33eb-4a52-9242-b554010df167)
      {
        product_id: '4d5e6f1a-2b3c-44d5-e6f1-a2b3c4d5e6f1',
        category_id: '27c5cefb-33eb-4a52-9242-b554010df167',
        name: "Organic Coffee",
        description: "Dark roast whole beans",
        stock: 200,
        price: 12.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Stationery (84180371-7e3d-4145-afd5-278c74d93519)
      {
        product_id: '5e6f1a2b-3c4d-45e6-f1a2-b3c4d5e6f1a2',
        category_id: '84180371-7e3d-4145-afd5-278c74d93519',
        name: "Ballpoint Pens",
        description: "12-pack assorted colors",
        stock: 300,
        price: 8.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Jewelry (f2f8fa04-ab77-4b70-b1db-de18066ae4a7)
      {
        product_id: '6f1a2b3c-4d5e-46f1-a2b3-c4d5e6f1a2b3',
        category_id: 'f2f8fa04-ab77-4b70-b1db-de18066ae4a7',
        name: "Silver Necklace",
        description: "925 sterling silver chain",
        stock: 40,
        price: 59.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Automotive (1f67c8b4-4d05-49d5-a6ac-11e9da678cf0)
      {
        product_id: '7a1b2c3d-4e5f-47a1-b2c3-d4e5f7a1b2c3',
        category_id: '1f67c8b4-4d05-49d5-a6ac-11e9da678cf0',
        name: "Car Phone Mount",
        description: "Dashboard smartphone holder",
        stock: 85,
        price: 15.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Health (be019812-3535-433f-a587-bcaa6ebfe5fd)
      {
        product_id: '8b2c3d4e-5f6a-48b2-c3d4-e5f6a8b2c3d4',
        category_id: 'be019812-3535-433f-a587-bcaa6ebfe5fd',
        name: "Digital Thermometer",
        description: "Fast reading oral thermometer",
        stock: 60,
        price: 9.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Pet Supplies (e752697d-b91e-45d4-b873-c6d7b8738d8c)
      {
        product_id: '9c3d4e5f-6a1b-49c3-d4e5-f6a1b9c3d4f5',
        category_id: 'e752697d-b91e-45d4-b873-c6d7b8738d8c',
        name: "Dog Leash",
        description: "6ft durable nylon leash",
        stock: 95,
        price: 12.49,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Baby (d8fdc4d3-af0b-4fe9-8f98-3dc730b9be22)
      {
        product_id: '0d4e5f6a-1b2c-40d4-e5f6-a1b2c0d4e5f7',
        category_id: 'd8fdc4d3-af0b-4fe9-8f98-3dc730b9be22',
        name: "Baby Bottle Set",
        description: "BPA-free 4-pack bottles",
        stock: 55,
        price: 16.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Tools (01234567-89ab-cdef-0123-456789abcdef)
      {
        product_id: '1e5f6a1b-2c3d-41e5-f6a1-b2c3d1e5f6c1',
        category_id: '01234567-89ab-cdef-0123-456789abcdef',
        name: "Cordless Drill",
        description: "20V lithium-ion drill/driver",
        stock: 35,
        price: 79.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Outdoor (12345678-90ab-cdef-1234-567890abcdef)
      {
        product_id: '2f6a1b2c-3d4e-42f6-a1b2-c3d4f2f6a1b2',
        category_id: '12345678-90ab-cdef-1234-567890abcdef',
        name: "Camping Tent",
        description: "4-person waterproof tent",
        stock: 25,
        price: 129.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Art (23456789-01ab-cdef-2345-678901abcdef)
      {
        product_id: 'b6d2178c-ec10-4892-9ec6-a0094c5b95e9',
        category_id: '23456789-01ab-cdef-2345-678901abcdef',
        name: "Acrylic Paint Set",
        description: "24-color premium paints",
        stock: 70,
        price: 22.50,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Music (34567890-12ab-cdef-3456-789012abcdef)
      {
        product_id: '4b2c3d4e-5f6a-44b2-c3d4-e5f6a4b2c3d3',
        category_id: '34567890-12ab-cdef-3456-789012abcdef',
        name: "Acoustic Guitar",
        description: "Beginner full-size guitar",
        stock: 20,
        price: 149.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Movies (45678901-23ab-cdef-4567-890123abcdef)
      {
        product_id: '5c3d4e5f-6a1b-45c3-d4e5-f6a1b5c3f4e5',
        category_id: '45678901-23ab-cdef-4567-890123abcdef',
        name: "Movie Collection Box Set",
        description: "10 classic films Blu-ray",
        stock: 40,
        price: 49.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Gaming (56789012-34ab-cdef-5678-901234abcdef)
      {
        product_id: '6d4e5f6a-1b2c-46d4-e5f6-a1b2c6d3e5f6',
        category_id: '56789012-34ab-cdef-5678-901234abcdef',
        name: "Wireless Gaming Controller",
        description: "Ergonomic design for PC/console",
        stock: 65,
        price: 44.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Computers (67890123-45ab-cdef-6789-012345abcdef)
      {
        product_id: '7e5f6a1b-2c3d-47e5-f6a1-b2c3d7e5f6a1',
        category_id: '67890123-45ab-cdef-6789-012345abcdef',
        name: "External SSD",
        description: "1TB portable solid state drive",
        stock: 50,
        price: 109.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Phones (78901234-56ab-cdef-7890-123456abcdef)
      {
        product_id: '8f6a1b2c-3d4e-48f6-a1b2-c3d4e8f6a1b2',
        category_id: '78901234-56ab-cdef-7890-123456abcdef',
        name: "Phone Case",
        description: "Shockproof protective case",
        stock: 180,
        price: 14.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Photography (89012345-67ab-cdef-8901-234567abcdef)
      {
        product_id: '9a1b2c3d-4e5f-49a1-b2c3-d4e5f9a1b2c3',
        category_id: '89012345-67ab-cdef-8901-234567abcdef',
        name: "Camera Tripod",
        description: "Lightweight aluminum tripod",
        stock: 45,
        price: 39.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Luggage (90123456-78ab-cdef-9012-345678abcdef)
      {
        product_id: '0b2c3d4e-5f6a-40b2-c3d4-e5f6a0b2c3d4',
        category_id: '90123456-78ab-cdef-9012-345678abcdef',
        name: "Carry-On Suitcase",
        description: "Hardshell spinner luggage",
        stock: 35,
        price: 89.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Fitness (a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d4)
      {
        product_id: '1c3d4e5f-6a1b-41c3-d4e5-f6a1b1c3d4e5',
        category_id: 'a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d4',
        name: "Resistance Bands Set",
        description: "5 varying resistance levels",
        stock: 90,
        price: 19.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Industrial (b2c3d4e5-f6a1-b2c3-d4e5-f6a1b2c3d4e5)
      {
        product_id: '2d4e5f6a-1b2c-42d4-e5f6-a1b2c2d4e5f6',
        category_id: 'b2c3d4e5-f6a1-b2c3-d4e5-f6a1b2c3d4e5',
        name: "Safety Glasses",
        description: "Anti-fog protective eyewear",
        stock: 150,
        price: 8.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Collectibles (c3d4e5f6-a1b2-c3d4-e5f6-a1b2c3d4e5f6)
      {
        product_id: '3e5f6a1b-2c3d-43e5-f6a1-b2c3d3e5f6a1',
        category_id: 'c3d4e5f6-a1b2-c3d4-e5f6-a1b2c3d4e5f6',
        name: "Limited Edition Figurine",
        description: "Collector's item in original box",
        stock: 15,
        price: 79.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Software (d4e5f6a1-b2c3-d4e5-f6a1-b2c3d4e5f6a1)
      {
        product_id: '4f6a1b2c-3d4e-44f6-a1b2-c3d4e4f6a1b2',
        category_id: 'd4e5f6a1-b2c3-d4e5-f6a1-b2c3d4e5f6a1',
        name: "Antivirus Software",
        description: "1-year subscription 3 devices",
        stock: 200,
        price: 39.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Party Supplies (e5f6a1b2-c3d4-e5f6-a1b2-c3d4e5f6a1b2)
      {
        product_id: '5a1b2c3d-4e5f-45a1-b2c3-d4e5f5a1b2c3',
        category_id: 'e5f6a1b2-c3d4-e5f6-a1b2-c3d4e5f6a1b2',
        name: "Balloon Arch Kit",
        description: "Everything for party decorations",
        stock: 60,
        price: 24.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Office Electronics (f6a1b2c3-d4e5-f6a1-b2c3-d4e5f6a1b2c3)
      {
        product_id: '6b2c3d4e-5f6a-46b2-c3d4-e5f6a6b2c3d4',
        category_id: 'f6a1b2c3-d4e5-f6a1-b2c3-d4e5f6a1b2c3',
        name: "Document Scanner",
        description: "High-speed duplex scanning",
        stock: 30,
        price: 199.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Additional products for popular categories
      // Electronics
      {
        product_id: '7c3d4e5f-6a1b-47c3-d4e5-f6a1b7c3d4e5',
        category_id: 'a1bbfbb1-56a2-4432-b54b-7c0980cbfc18',
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker",
        stock: 85,
        price: 49.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '8d4e5f6a-1b2c-48d4-e5f6-a1b2c8d4e5f6',
        category_id: 'a1bbfbb1-56a2-4432-b54b-7c0980cbfc18',
        name: "Tablet",
        description: "10-inch Android tablet",
        stock: 40,
        price: 179.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Clothing
      {
        product_id: '9e5f6a1b-2c3d-49e5-f6a1-b2c3d9e5f6a1',
        category_id: 'ec4c20a8-b246-4346-b0da-c7331c1e22d1',
        name: "Men's Dress Shirt",
        description: "Slim fit cotton shirt",
        stock: 120,
        price: 34.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '0f6a1b2c-3d4e-40f6-a1b2-c3d4e0f6a1b2',
        category_id: 'ec4c20a8-b246-4346-b0da-c7331c1e22d1',
        name: "Women's Yoga Pants",
        description: "High-waisted leggings",
        stock: 95,
        price: 27.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Books
      {
        product_id: '1a1b2c3d-4e5f-41a1-b2c3-d4e5f1a1b2c3',
        category_id: '3cd3f4bc-8e5b-4d16-a7df-5a8343d82e77',
        name: "Cookbook",
        description: "Healthy recipes collection",
        stock: 75,
        price: 18.95,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '2b2c3d4e-5f6a-42b2-c3d4-e5f6a2b2c3d4',
        category_id: '3cd3f4bc-8e5b-4d16-a7df-5a8343d82e77',
        name: "Children's Book",
        description: "Illustrated storybook",
        stock: 110,
        price: 9.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Home Appliances
      {
        product_id: '3c3d4e5f-6a1b-43c3-d4e5-f6a1b3c3d4e5',
        category_id: 'c26ea8fe-7da9-49c4-904a-9689ac282033',
        name: "Blender",
        description: "High-powered kitchen blender",
        stock: 55,
        price: 59.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '4d4e5f6a-1b2c-44d4-e5f6-a1b2c4d4e5f6',
        category_id: 'c26ea8fe-7da9-49c4-904a-9689ac282033',
        name: "Robot Vacuum",
        description: "Smart mapping vacuum cleaner",
        stock: 25,
        price: 249.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Toys
      {
        product_id: '5e5f6a1b-2c3d-45e5-f6a1-b2c3d5e5f6a1',
        category_id: '908fd655-7b28-418a-9fd8-9d38679f834a',
        name: "Remote Control Car",
        description: "2.4GHz RC stunt car",
        stock: 65,
        price: 34.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '6f6a1b2c-3d4e-46f6-a1b2-c3d4e6f6a1b2',
        category_id: '908fd655-7b28-418a-9fd8-9d38679f834a',
        name: "Board Game",
        description: "Family strategy game",
        stock: 80,
        price: 29.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Sports
      {
        product_id: '7a1b2c3d-4e5f-47a1-b2c3-d4e5f7a1b2c4',
        category_id: 'bad6c269-c1fb-4416-9796-ca3361fc9272',
        name: "Running Shoes",
        description: "Lightweight cushioned shoes",
        stock: 70,
        price: 79.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '8b2c3d4e-5f6a-48b2-c3d4-e5f6a8b2c3d3',
        category_id: 'bad6c269-c1fb-4416-9796-ca3361fc9272',
        name: "Basketball",
        description: "Official size and weight",
        stock: 90,
        price: 24.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Beauty
      {
        product_id: '9c3d4e5f-6a1b-49c3-d4e5-f6a1b9c3d4e5',
        category_id: '49a564dd-673b-4746-8bfe-cb655b3b5ccf',
        name: "Makeup Palette",
        description: "12-shade eyeshadow palette",
        stock: 60,
        price: 22.50,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '0d4e5f6a-1b2c-40d4-e5f6-a1b2c0d4e5f6',
        category_id: '49a564dd-673b-4746-8bfe-cb655b3b5ccf',
        name: "Hair Dryer",
        description: "Professional ionic dryer",
        stock: 45,
        price: 59.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Furniture
      {
        product_id: '1e5f6a1b-2c3d-41e5-f6a1-b2c3d1e5f6a1',
        category_id: 'b25fe671-3437-4d6b-a29d-f95d5e329659',
        name: "Bookshelf",
        description: "5-tier wooden shelf",
        stock: 25,
        price: 89.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '2f6a1b2c-3d4e-42f6-a1b2-c3d4e2f6a1b2',
        category_id: 'b25fe671-3437-4d6b-a29d-f95d5e329659',
        name: "Coffee Table",
        description: "Modern glass top table",
        stock: 15,
        price: 129.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Grocery
      {
        product_id: '3a1b2c3d-4e5f-43a1-b2c3-d4e5f3a1b2c3',
        category_id: '27c5cefb-33eb-4a52-9242-b554010df167',
        name: "Organic Tea",
        description: "Assorted herbal tea bags",
        stock: 150,
        price: 6.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '4b2c3d4e-5f6a-44b2-c3d4-e5f6a4b2c3d4',
        category_id: '27c5cefb-33eb-4a52-9242-b554010df167',
        name: "Granola Bars",
        description: "12-pack assorted flavors",
        stock: 200,
        price: 8.49,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Stationery
      {
        product_id: '5c3d4e5f-6a1b-45c3-d4e5-f6a1b5c3d4e5',
        category_id: '84180371-7e3d-4145-afd5-278c74d93519',
        name: "Notebook Set",
        description: "3-pack lined notebooks",
        stock: 120,
        price: 12.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: '6d4e5f6a-1b2c-46d4-e5f6-a1b2c6d4e5f6',
        category_id: '84180371-7e3d-4145-afd5-278c74d93519',
        name: "Sticky Notes",
        description: "6-color pack 100 sheets each",
        stock: 180,
        price: 5.99,
        image_url: "product.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
