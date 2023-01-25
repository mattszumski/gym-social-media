import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
export default new Sequelize("gym-social-media", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

export const dbSync = (dbConnection) => {
  dbConnection
    .sync()
    .then(() => {
      console.log("Sync done successfully!");
    })
    .catch((error) => {
      console.error(`Unable to sync. Error: ${error}`);
    });
};
