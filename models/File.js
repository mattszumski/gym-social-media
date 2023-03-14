import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class File extends Model {}

File.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    originalName: {
      type: DataTypes.STRING,
    },
    storedName: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    mimetype: {
      type: DataTypes.STRING,
    },
    encoding: {
      type: DataTypes.STRING,
    },
    ownerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    privacy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    gallery: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    //If id is other than 0, photo belongs to the post
    postId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    path: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/media/${this.storedName}`;
      },
    },
  },
  {
    sequelize,
  }
);

export default File;
