import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class UserProfile extends Model {}

UserProfile.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  about: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
  intrests: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
});
