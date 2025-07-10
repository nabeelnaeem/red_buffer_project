/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Products.category_id → Categories.category_id
    await queryInterface.addConstraint('Products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_products_category',
      references: {
        table: 'Categories',
        field: 'category_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Orders.user_id → Users.user_id
    await queryInterface.addConstraint('Orders', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_orders_user',
      references: {
        table: 'Users',
        field: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // OrderItems.order_id → Orders.order_id
    await queryInterface.addConstraint('Order_item', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_orderitems_order',
      references: {
        table: 'Orders',
        field: 'order_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // OrderItems.product_id → Products.product_id
    await queryInterface.addConstraint('Order_item', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_orderitems_product',
      references: {
        table: 'Products',
        field: 'product_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Payments.order_id → Orders.order_id
    await queryInterface.addConstraint('Payments', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_payments_order',
      references: {
        table: 'Orders',
        field: 'order_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Shippings.order_id → Orders.order_id
    await queryInterface.addConstraint('Shippings', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_shippings_order',
      references: {
        table: 'Orders',
        field: 'order_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Reviews.user_id → Users.user_id
    await queryInterface.addConstraint('Reviews', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_reviews_user',
      references: {
        table: 'Users',
        field: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Reviews.product_id → Products.product_id
    await queryInterface.addConstraint('Reviews', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_reviews_product',
      references: {
        table: 'Products',
        field: 'product_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Reviews.order_item_id → Order_item.order_item_id
    await queryInterface.addConstraint('Reviews', {
      fields: ['order_item_id'],
      type: 'foreign key',
      name: 'fk_reviews_order_item',
      references: {
        table: 'Order_item',
        field: 'order_item_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Products', 'fk_products_category');
    await queryInterface.removeConstraint('Orders', 'fk_orders_user');
    await queryInterface.removeConstraint('Order_item', 'fk_orderitems_order');
    await queryInterface.removeConstraint('Order_item', 'fk_orderitems_product');
    await queryInterface.removeConstraint('Payments', 'fk_payments_order');
    await queryInterface.removeConstraint('Shippings', 'fk_shippings_order');
    await queryInterface.removeConstraint('Reviews', 'fk_reviews_user');
    await queryInterface.removeConstraint('Reviews', 'fk_reviews_product');
    await queryInterface.removeConstraint('Reviews', 'fk_reviews_order_item');
  }
};
