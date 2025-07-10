import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Shipping extends Model {
    static associate(models) {

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
      type: DataTypes.ENUM,
      allowNull: false,
    },
    tracking_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Shipping',
    tableName: 'Shippings',
    timestamps: true,
    paranoid: true
  });
  return Shipping;
}
