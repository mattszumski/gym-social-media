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
  },
  {
    sequelize,
  }
);

User.hasOne(UserSettings);
UserSettings.belongsTo(User);

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

export default User;
