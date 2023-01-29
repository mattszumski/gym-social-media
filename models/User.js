import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import UserSettings from "./UserSettings.js";
import UserProfile from "./UserProfile.js";
import Post from "./Post.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your email address",
        },
      },
    },
    username: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter username",
        },
      },
    },
    firstname: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export const settingsAssociation = User.hasOne(UserSettings);
UserSettings.belongsTo(User);

export const profileAssociation = User.hasOne(UserProfile);
UserProfile.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

export default User;
