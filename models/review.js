import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Review.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      Review.belongsTo(models.OrderItem, { foreignKey: 'order_item_id', as: 'orderItem' });
    }
  }
  Review.init({
    review_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'Reviews',
    timestamps: true,
    paranoid: true
  });
  return Review;
}
