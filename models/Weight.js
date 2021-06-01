const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Weight extends Model {}

Weight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_reported: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "weight",
  }
);

module.exports = Weight;
