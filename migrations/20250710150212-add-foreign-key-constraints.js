/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Products.category_id → Categories.category_id
    await queryInterface.addConstraint('products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_products_category',
      references: {
        table: 'categories',
        field: 'category_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Orders.user_id → Users.user_id
    await queryInterface.addConstraint('orders', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_orders_user',
      references: {
        table: 'users',
        field: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // OrderItems.order_id → Orders.order_id
    await queryInterface.addConstraint('order_item', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_orderitems_order',
      references: {
        table: 'orders',
        field: 'order_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // OrderItems.product_id → Products.product_id
    await queryInterface.addConstraint('order_item', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_orderitems_product',
      references: {
        table: 'products',
        field: 'product_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Payments.order_id → Orders.order_id
    await queryInterface.addConstraint('payments', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_payments_order',
      references: {
        table: 'orders',
        field: 'order_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Shippings.order_id → Orders.order_id
    await queryInterface.addConstraint('shippings', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_shippings_order',
      references: {
        table: 'orders',
        field: 'order_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Reviews.user_id → Users.user_id
    await queryInterface.addConstraint('reviews', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_reviews_user',
      references: {
        table: 'users',
        field: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Reviews.product_id → Products.product_id
    await queryInterface.addConstraint('reviews', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_reviews_product',
      references: {
        table: 'products',
        field: 'product_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Reviews.order_item_id → Order_item.order_item_id
    await queryInterface.addConstraint('reviews', {
      fields: ['order_item_id'],
      type: 'foreign key',
      name: 'fk_reviews_order_item',
      references: {
        table: 'order_item',
        field: 'order_item_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'fk_products_category');
    await queryInterface.removeConstraint('orders', 'fk_orders_user');
    await queryInterface.removeConstraint('order_item', 'fk_orderitems_order');
    await queryInterface.removeConstraint('order_item', 'fk_orderitems_product');
    await queryInterface.removeConstraint('payments', 'fk_payments_order');
    await queryInterface.removeConstraint('shippings', 'fk_shippings_order');
    await queryInterface.removeConstraint('reviews', 'fk_reviews_user');
    await queryInterface.removeConstraint('reviews', 'fk_reviews_product');
    await queryInterface.removeConstraint('reviews', 'fk_reviews_order_item');
  }
};
