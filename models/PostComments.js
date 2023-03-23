import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";
import Post from "./Post.js";

class PostComments extends Model {}

PostComments.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(),
      allowNull: false,
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

export default PostComments;
