import sequelize from "../configs/dbConnection.js";
import { DataTypes, Model } from "sequelize";

class Reaction extends Model {}

Reaction.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    resource_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    resource_type: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default Reaction;
