import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class TokenBlacklist extends Model {
  declare id: number;
  declare token: string;
}

TokenBlacklist.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING(1024),
    },
  },
  {
    sequelize,
  }
);

export default TokenBlacklist;
