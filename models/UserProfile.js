import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import User from "./User.js";

class UserProfile extends Model {}

UserProfile.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    gym: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    //TODO: fix typo to - interests
    intrests: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "userProfile",
  }
);

export default UserProfile;
