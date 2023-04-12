import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class FriendRequest extends Model {}

FriendRequest.init(
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
    recipientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default FriendRequest;
