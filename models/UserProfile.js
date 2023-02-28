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
    interests: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    //TODO: check how photos/videos will be stored and add proper data to retreive it
    // profilePhoto: {
    //   type: DataTypes.STRING(1024),
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    modelName: "userProfile",
  }
);

export default UserProfile;
