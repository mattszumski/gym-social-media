export const uploadFilesRoute = (req, res) => {
  //TODO add logic - data regarding file should be saved to new model and it should have its own service
  console.log(req?.files);
  res.sendStatus(200);
};
