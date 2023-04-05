import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import User from "./User.js";

class UserSettings extends Model {}

UserSettings.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    language: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "userSettings",
  }
);

export default UserSettings;
