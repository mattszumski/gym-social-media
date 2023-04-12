import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class ReactionTypes extends Model {}

ReactionTypes.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default ReactionTypes;
