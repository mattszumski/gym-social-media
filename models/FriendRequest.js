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
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default FriendRequest;
