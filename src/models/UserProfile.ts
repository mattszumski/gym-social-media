import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import { IUserProfile } from "../types/Interfaces/UserInterfaces.js";

class UserProfile extends Model implements IUserProfile {
  declare id?: number;
  declare city?: string;
  declare gym?: string;
  declare about?: string;
  declare profilePhotoId?: string | number;
}

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
