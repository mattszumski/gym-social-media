import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import User from "./User.js";
import PostComments from "./PostComments.js";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please enter text" },
        notNull: { msg: "Please enter text" },
      },
    },
    //TODO: check how photos/videos will be stored and add proper data to retreive it
    media: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
  }
);

Post.hasMany(PostComments);
PostComments.belongsTo(Post);

export default Post;
