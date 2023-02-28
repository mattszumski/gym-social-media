import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class Friend extends Model {}

Friend.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    friendId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default Friend;
