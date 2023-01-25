import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class User extends Model {}

User.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  about: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
});
