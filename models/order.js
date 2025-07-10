import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
      Order.hasOne(models.Shipping, { foreignKey: 'order_id', as: 'shipping' });
      Order.hasOne(models.Payment, { foreignKey: 'order_id', as: 'payment' });
    }
  }
  Order.init({
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    paranoid: true
  });
  return Order;
}
