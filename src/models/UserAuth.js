import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class UserAuth extends Model {}

UserAuth.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "No user id",
        },
      },
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password not entered",
        },
      },
    },
    salt: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: "No salt",
        },
      },
    },
  },
  {
    sequelize,
  }
);

export default UserAuth;
