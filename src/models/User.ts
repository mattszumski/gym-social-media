import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import UserSettings from "./UserSettings.js";
import UserProfile from "./UserProfile.js";
import Post from "./Post.js";
import { IUser } from "../types/Interfaces/UserInterfaces.js";

class User extends Model implements IUser {
  declare id?: number;
  declare email: string;
  declare username: string;
  declare firstname?: string;
  declare lastname?: string;
  declare fullname?: string;
}

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
        isEmail: {
          msg: "Email is not valid",
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
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstname} ${this.lastname}`;
      },
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export const settingsAssociation = User.hasOne(UserSettings);
UserSettings.belongsTo(User, { onDelete: "CASCADE" });

export const profileAssociation = User.hasOne(UserProfile);
UserProfile.belongsTo(User, { onDelete: "CASCADE" });

User.hasMany(Post);
Post.belongsTo(User);

export default User;
