import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class UserSettings extends Model {}

UserSettings.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
});
