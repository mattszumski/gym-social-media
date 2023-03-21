import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

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
    profilePhotoId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "userProfile",
  }
);

export default UserProfile;
