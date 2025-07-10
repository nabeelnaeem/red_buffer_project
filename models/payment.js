import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Payment extends Model {
    static associate(models) {

    }
  }
  Payment.init({
    payment_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments',
    timestamps: true,
    paranoid: true
  });
  return Payment;
}
