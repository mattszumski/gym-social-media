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
    owner_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(),
      allowNull: false,
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

export default PostComments;
