import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import { IUserSettings } from "../types/Interfaces/UserInterfaces.js";

class UserSettings extends Model implements IUserSettings {
  declare id?: number;
  declare language?: string;
}

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
