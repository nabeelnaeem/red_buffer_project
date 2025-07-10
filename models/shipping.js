import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Shipping extends Model {
    static associate(models) {
      Shipping.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    }
  }
  Shipping.init({
    shipping_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM('standard', 'express', 'overnight', 'pickup'),
      allowNull: false,
    },
    tracking_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'shipped', 'in_transit', 'delivered', 'returned', 'cancelled'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Shipping',
    tableName: 'shippings',
    timestamps: true,
    paranoid: true
  });
  return Shipping;
}
