import { setupDb, setupBasicUsers } from "./services/dbService.js";

//TODO: calling sync must know of all models to create all the required tables - check how it can be done
const basicSetup = async () => {
  // dev function for rebuilding (force sync) db after changes
  setupDb()
    .then(() => {
      //function used to create 2 basic users for testing - it requires data in .env file
      return setupBasicUsers();
    })
    .then(() => {
      console.log("Setup complete");
    });
};

export default basicSetup;
