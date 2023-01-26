import dbConnection from "../configs/dbConnection.js";

export const setupDb = async () => {
  dbConnection
    .sync({
      force: true,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
