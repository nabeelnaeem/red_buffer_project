import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      OrderItem.hasOne(models.Review, { foreignKey: 'order_item_id', as: 'review' });
    }
  }
  OrderItem.init({
    order_item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_item',
    timestamps: true,
    paranoid: true
  });
  return OrderItem;
}
